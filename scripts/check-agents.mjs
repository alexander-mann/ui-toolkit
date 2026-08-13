import {
  accessSync,
  constants,
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Agent harness gate for `.claude/`.
 *
 * `.claude/` is documentation that executes, and it was the one part of the repo
 * no gate touched: outside both tsc projects, outside ESLint's scope, and named
 * by no CI job. Everything in it was verified by hand, and the two things that
 * actually broke were both mechanical — six agents shipped with no frontmatter
 * and so were never registered at all, and every invocation was written as
 * `@agent-name`, which is a file reference rather than a dispatch. Neither is
 * visible until you notice an agent never ran. See issue #62.
 *
 * So this checks the two properties that make the harness load and mean what it
 * says:
 *
 *   Validity     — every definition has the frontmatter its kind requires, and
 *                  an agent's `name` matches its filename stem.
 *   Referential  — every `pnpm <script>`, file path, agent name, and slash
 *                  accuracy      command cited in a definition resolves to
 *                  something that exists.
 *
 * Plus the two structural rules that hold the split between the directories:
 * an `agents/` definition must not instruct delegation (a subagent cannot spawn
 * a subagent, which is why the orchestrators are commands), and the README
 * roster must match the files on disk in both directions.
 *
 * Scope limits, deliberate: path citations are checked only for tokens that
 * name a *file* (contain a `/` and end in an extension). Bare filenames are
 * ambiguous — `dialog.tsx` is a real file at a path the prose doesn't give —
 * and directory tokens are mostly ephemeral build output (`dist/`,
 * `storybook-static/`) that would fail on a clean checkout. Placeholders
 * (`feat/<name>`, a glob over the component MDX) are skipped on `<>` and `*`.
 *
 * Run with `pnpm agents`. Exits non-zero on any failure so it can gate CI.
 * No dependencies — plain Node, like `check-contrast.mjs`.
 */

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const failures = []
const results = []

const check = (pass, label, details = []) => {
  results.push({ pass, label })
  if (!pass) {
    failures.push({ label, details })
  }
}

// --- Load the definitions ---

const parse = (src) => {
  const lines = src.split('\n')
  if (lines[0].trim() !== '---') {
    return null
  }
  const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---')
  if (end === -1) {
    return null
  }
  const fields = {}
  for (const line of lines.slice(1, end)) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/)
    if (field) {
      fields[field[1]] = field[2].trim()
    }
  }
  return { fields, body: lines.slice(end + 1).join('\n') }
}

const load = (kind) => {
  const dir = resolve(root, '.claude', kind)
  if (!existsSync(dir)) {
    return []
  }
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const src = readFileSync(resolve(dir, file), 'utf8')
      return {
        kind,
        file,
        rel: `.claude/${kind}/${file}`,
        stem: file.replace(/\.md$/, ''),
        src,
        parsed: parse(src),
      }
    })
}

const agents = load('agents')
const commands = load('commands')
const defs = [...agents, ...commands]

check(agents.length > 0, `.claude/agents/ holds ${agents.length} definition(s)`)
check(
  commands.length > 0,
  `.claude/commands/ holds ${commands.length} definition(s)`,
)

const agentStems = new Set(agents.map((a) => a.stem))
const commandStems = new Set(commands.map((c) => c.stem))

// --- Frontmatter validity ---
//
// A file with no frontmatter is not registered at all, so it fails silently and
// completely. `name` is what an agent is addressed by; commands take their name
// from the filename and have no `name` field, but they do have `allowed-tools`
// where an agent has `tools` — a copied `tools:` key in a command silently
// restricts nothing.

for (const def of defs) {
  const problems = []
  if (!def.parsed) {
    problems.push(
      'no YAML frontmatter — the file is not registered, and nothing else about it can be checked',
    )
  } else {
    const { fields } = def.parsed
    if (!fields.description) {
      problems.push('missing `description`')
    }
    if (def.kind === 'agents') {
      if (!fields.name) {
        problems.push('missing `name`')
      } else if (fields.name !== def.stem) {
        problems.push(
          `\`name: ${fields.name}\` does not match the filename stem \`${def.stem}\``,
        )
      }
      if ('tools' in fields && !fields.tools.trim()) {
        problems.push('`tools` is present but empty — omit it to allow all')
      }
    } else if ('tools' in fields) {
      problems.push(
        'commands use `allowed-tools`, not `tools` — a `tools` key here restricts nothing',
      )
    }
  }
  check(problems.length === 0, `${def.rel} — frontmatter`, problems)
}

// --- Referential accuracy: `pnpm <script>` citations ---

const scripts = new Set(
  Object.keys(
    JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).scripts,
  ),
)

// pnpm's own subcommands, which are not package scripts.
const pnpmBuiltins = new Set(
  `add audit bin config create dedupe deploy dlx doctor env exec fetch import
   init install licenses link list ls outdated pack patch patch-commit prune
   publish rebuild remove root run server setup store unlink update why`
    .split(/\s+/)
    .filter(Boolean),
)

const badScripts = []
let scriptCitations = 0
for (const def of defs) {
  for (const [, name] of def.src.matchAll(/\bpnpm ([a-z][a-z0-9:._-]*)/g)) {
    if (pnpmBuiltins.has(name)) {
      continue
    }
    scriptCitations++
    if (!scripts.has(name)) {
      badScripts.push(
        `${def.rel} — cites \`pnpm ${name}\`, which is not a script in package.json`,
      )
    }
  }
}
check(
  badScripts.length === 0,
  `${scriptCitations} \`pnpm <script>\` citation(s) resolve`,
  badScripts,
)

// --- Referential accuracy: file path citations ---

const spans = (src) =>
  [...src.matchAll(/`([^`\n]+)`/g)]
    .map((m) => m[1])
    .filter((token) => /^\S+$/.test(token))

const isFilePath = (token) =>
  token.includes('/') &&
  /\.[A-Za-z][A-Za-z0-9]*$/.test(token) &&
  !/[<>*?|$]/.test(token) &&
  !token.includes('://') &&
  !token.startsWith('@') &&
  !token.startsWith('/') &&
  !token.startsWith('-')

const badPaths = []
let pathCitations = 0
for (const def of defs) {
  for (const token of spans(def.src)) {
    if (!isFilePath(token)) {
      continue
    }
    pathCitations++
    if (!existsSync(resolve(root, token))) {
      badPaths.push(`${def.rel} — cites \`${token}\`, which does not exist`)
    }
  }
}
check(
  badPaths.length === 0,
  `${pathCitations} file path citation(s) exist`,
  badPaths,
)

// --- Referential accuracy: agent and slash-command cross-references ---

const namedAgent = /`([a-z][a-z0-9-]*)`\s+(?:sub)?agent\b/g
const badRefs = []
let agentRefs = 0
for (const def of defs) {
  for (const [, name] of def.src.matchAll(namedAgent)) {
    agentRefs++
    if (!agentStems.has(name)) {
      badRefs.push(
        `${def.rel} — refers to a \`${name}\` agent, but .claude/agents/${name}.md does not exist`,
      )
    }
  }
  for (const [, name] of def.src.matchAll(/`\/([a-z][a-z0-9-]*)`/g)) {
    agentRefs++
    if (!commandStems.has(name)) {
      badRefs.push(
        `${def.rel} — refers to \`/${name}\`, but .claude/commands/${name}.md does not exist`,
      )
    }
  }
}
check(
  badRefs.length === 0,
  `${agentRefs} agent/command cross-reference(s) resolve`,
  badRefs,
)

// --- `@agent-name` is not an invocation ---
//
// `@` is a file reference in Claude Code, so `@code-reviewer` asks the model to
// read a file rather than dispatch the agent. Every invocation in this directory
// was written that way before #63.

const badInvocations = []
for (const def of defs) {
  for (const [, name] of def.src.matchAll(/@([a-z][a-z0-9-]*)/g)) {
    if (agentStems.has(name) || commandStems.has(name)) {
      badInvocations.push(
        `${def.rel} — writes \`@${name}\`, which is a file reference, not a dispatch. Name the agent in plain language.`,
      )
    }
  }
}
check(
  badInvocations.length === 0,
  'no `@agent-name` invocation syntax',
  badInvocations,
)

// --- An agent definition must not delegate ---
//
// A subagent cannot spawn another subagent, so a workflow step that says to is
// a step that cannot run: the agent either skips the gate or performs it itself,
// losing the independent read that made it a separate agent. Orchestration lives
// in `.claude/commands/`, which runs in the main session. This is issue #62's
// item 1, and this check is what keeps it from coming back.
//
// Backticks around the agent name are optional, because the invocation style
// CLAUDE.md and the README both prescribe is un-backticked plain language ("use
// the code-reviewer agent to …") — keying on the backticked form alone would
// miss exactly the phrasing the docs teach. That means the verbs have to carry
// the precision instead, in two shapes: an unambiguous dispatch verb, or the
// specific "use/run the X agent to" construction.
//
// Boundary prose has to keep passing, and does: "the `a11y-auditor` agent owns
// the deep pass" has no dispatch verb, and "Run the checks the `a11y-auditor`
// agent covers" fails the second shape because the word after "the" is not the
// agent name. The requirement that the captured name resolve to a real agent is
// the backstop for anything looser — "spawn a subagent" captures `a`, not an
// agent, and is ignored.

const delegationShapes = [
  /(?:[Dd]elegate|[Dd]ispatch|[Ii]nvoke|[Ss]pawn|[Hh]and off)[^\n]{0,40}?`?([a-z][a-z0-9-]*)`?\s+(?:sub)?agents?\b/g,
  /(?:[Uu]se|[Rr]un)\s+the\s+`?([a-z][a-z0-9-]*)`?\s+(?:sub)?agents?\s+to\b/g,
]

const badDelegations = []
for (const agent of agents) {
  for (const shape of delegationShapes) {
    for (const [match, name] of agent.src.matchAll(shape)) {
      if (agentStems.has(name)) {
        badDelegations.push(
          `${agent.rel} — "${match.trim()}": a subagent cannot dispatch a subagent. Move this orchestration to .claude/commands/.`,
        )
      }
    }
  }
}
check(
  badDelegations.length === 0,
  'no agent definition delegates to another agent',
  badDelegations,
)

// --- An agent definition must not run a slash command ---
//
// The same constraint in a second costume: a subagent has no more access to
// `/release` than it does to another subagent, so an agent told to run one is an
// agent that silently skips the step. Telling the *user* to run it is fine and
// is how `/release` hands off to `/version`, so a mention with "user" in the
// preceding clause is exempt.

const badSlashRuns = []
for (const agent of agents) {
  for (const match of agent.src.matchAll(
    /(?:[Rr]un|[Uu]se|[Ii]nvoke)\s+`\/([a-z][a-z0-9-]*)`/g,
  )) {
    const lead = agent.src.slice(Math.max(0, match.index - 40), match.index)
    if (/\buser\b/.test(lead)) {
      continue
    }
    badSlashRuns.push(
      `${agent.rel} — "${match[0].trim()}": a subagent cannot run a slash command. Move this to .claude/commands/, or tell the user to run it.`,
    )
  }
}
check(
  badSlashRuns.length === 0,
  'no agent definition runs a slash command',
  badSlashRuns,
)

// --- The README roster matches the files on disk ---
//
// Both directions: a new definition that never reached the README, and a README
// row left behind by a deleted one.

const readme = readFileSync(resolve(root, 'README.md'), 'utf8')

const tableNames = (heading) => {
  const lines = readme.split('\n')
  const start = lines.findIndex((line) => line.startsWith(`| ${heading}`))
  if (start === -1) {
    return null
  }
  const names = []
  for (const line of lines.slice(start + 2)) {
    if (!line.startsWith('|')) {
      break
    }
    const cell = line
      .split('|')[1]
      .trim()
      .match(/^`\/?([a-z][a-z0-9-]*)`$/)
    if (cell) {
      names.push(cell[1])
    }
  }
  return names
}

for (const [heading, stems, dir] of [
  ['Agent', agentStems, '.claude/agents'],
  ['Command', commandStems, '.claude/commands'],
]) {
  const listed = tableNames(heading)
  if (listed === null) {
    check(false, `README.md has a \`| ${heading}\` table`, [
      `no table with a \`| ${heading}\` header row — the ${dir} roster is undocumented`,
    ])
    continue
  }
  const problems = [
    ...[...stems]
      .filter((stem) => !listed.includes(stem))
      .map(
        (stem) => `${dir}/${stem}.md is not in the README's ${heading} table`,
      ),
    ...listed
      .filter((name) => !stems.has(name))
      .map(
        (name) =>
          `the README's ${heading} table lists \`${name}\`, but ${dir}/${name}.md does not exist`,
      ),
  ]
  check(
    problems.length === 0,
    `README ${heading} table matches ${dir}/ (${listed.length} row(s))`,
    problems,
  )
}

// --- This gate is actually wired into CI ---

// Matched as a `run:` step rather than anywhere in the file, so a comment or a
// commented-out step cannot satisfy it.

const ci = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf8')
check(/^\s*run: pnpm agents\s*$/m.test(ci), 'ci.yml runs `pnpm agents`', [
  'no `run: pnpm agents` step in ci.yml, so nothing here runs on a PR',
])

// --- Hook commands exist and are executable ---
//
// `settings.json` names its hook scripts by path, and nothing else in the repo
// imports them, so a rename leaves a dead `command` plus stale prose in CLAUDE.md
// and the README with nothing to catch it. A hook that is present but not
// executable fails just as silently. `warn-ungated-files.sh` is the file CLAUDE.md
// itself singles out as reached by no gate — this is that gate.

const settings = JSON.parse(
  readFileSync(resolve(root, '.claude/settings.json'), 'utf8'),
)

const hookProblems = []
let hookCommands = 0
for (const matchers of Object.values(settings.hooks ?? {})) {
  for (const matcher of matchers) {
    for (const hook of matcher.hooks ?? []) {
      if (hook.type !== 'command' || !hook.command) {
        continue
      }
      hookCommands++
      const script = hook.command
        .split(/\s+/)[0]
        .replace(/"\$CLAUDE_PROJECT_DIR"\/?/, '')
        .replace(/^['"]|['"]$/g, '')
      const abs = resolve(root, script)
      if (!existsSync(abs)) {
        hookProblems.push(`hook command \`${script}\` does not exist`)
      } else {
        try {
          accessSync(abs, constants.X_OK)
        } catch {
          hookProblems.push(
            `hook command \`${script}\` is not executable — it will fail silently`,
          )
        }
      }
    }
  }
}
check(
  hookProblems.length === 0,
  `${hookCommands} hook command(s) exist and are executable`,
  hookProblems,
)

// --- Report ---

for (const { pass, label } of results) {
  console.log(`  [${pass ? 'PASS' : 'FAIL'}] ${label}`)
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} harness check(s) failed.\n`)
  for (const { label, details } of failures) {
    console.error(`  ${label}`)
    for (const detail of details) {
      console.error(`    - ${detail}`)
    }
  }
  process.exit(1)
}

console.log(
  `\n✓ ${agents.length} agent(s) and ${commands.length} command(s) load and every reference resolves.`,
)
