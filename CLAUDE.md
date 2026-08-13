# CLAUDE.md

Guidance for AI agents working in this repo. Follow these conventions so changes stay consistent with the existing codebase.

## What this is

`@alexandermann/ui-toolkit` — a React 19 + Tailwind CSS design system published to npm. Components are documented in Storybook and consumed as a library (`dist/` is the published output, built from `src/` via `tsc`). There is no runtime bundler; TypeScript compiles the source and `tscpaths` rewrites the `@*` path aliases.

## Commands

Package manager is **pnpm** (do not use npm/yarn for installs). Node comes from `.nvmrc` (22); `engines` in `package.json` declares the supported floor (`>=20`), which pnpm only warns about.

`.storybook/main.ts` must keep `const require = createRequire(import.meta.url)`. Node 23+ type-strips that file as ESM, where the CJS `require` does not exist, so a bare `require.resolve` breaks `pnpm storybook` and `pnpm build-storybook` outright. That file is invisible to both local gates — it sits in neither `pnpm test` project (the `.storybook/` gap in issue #36, below), and ESLint ignores `.storybook/` — so neither `pnpm test` nor `pnpm lint` will catch mistakes in it. Verify changes with an actual `pnpm build-storybook`; the `storybook` CI job builds it across a Node matrix to keep this from regressing.

| Task                   | Command                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Typecheck (the "test") | `pnpm test` — typechecks `src/` (`tsconfig.json`) then the VRT harness (`tsconfig.tests.json`) |
| Lint                   | `pnpm lint` (autofix: `pnpm lint:fix`)                                                         |
| Format                 | `pnpm prettier`                                                                                |
| Build library          | `pnpm build`                                                                                   |
| Run Storybook          | `pnpm storybook` (port 6006)                                                                   |
| Scaffold a component   | `pnpm generate:component`                                                                      |
| Color-contrast gate    | `pnpm contrast` (WCAG AA — see Accessibility below)                                            |
| Tailwind preset gate   | `pnpm preset` (see Theming below)                                                              |
| Agent harness gate     | `pnpm agents` (see Agent harness below)                                                        |
| Build Storybook        | `pnpm build-storybook` — required before `pnpm vrt`                                            |
| Visual regression      | `pnpm vrt` (compare) / `pnpm vrt:update` (refresh baselines)                                   |

There is **no unit-test framework**. "Tests" = a clean `tsc` typecheck, over two projects: `tsconfig.json` for `src/`, then `tsconfig.tests.json` (`noEmit`) for the VRT harness — `tests/**` and `playwright.config.ts`. They can't be merged; `tsconfig.tests.json`'s header comment explains why. Coverage is still partial: `.storybook/`, `scripts/`, and the other root configs sit in neither project (issue #36), so a new file outside `src/` and `tests/` is typechecked by nothing until it's added to one of them. Before finishing any change, run `pnpm test` and `pnpm lint` and make sure both pass.

## Code style

Enforced by ESLint (`typescript-eslint` strict + stylistic) and Prettier. Key rules:

- **No semicolons**, single quotes, 2-space indent, print width 80.
- Use `===`/`!==` (`eqeqeq`), prefer `const`, no `var`, prefer template literals over concatenation, object shorthand, `curly` braces always.
- Imports are auto-sorted: `react` first, then third-party, then relative — separated by blank lines. Don't hand-order; let Prettier do it.
- A Husky pre-commit hook runs `pretty-quick --staged`, so staged files are auto-formatted on commit — except those in `.prettierignore`, which excludes `*.mdx` and `plop-templates/`. Component MDX docs are formatted by nothing and linted by nothing; they need reading.

## Path aliases

`tsconfig.json` maps `@*` → `./src/*`. Import shared helpers via aliases, e.g. `import { cn } from '@utils'`. The `cn` helper (`clsx` + `tailwind-merge`) is the standard way to compose class names — always use it rather than string concatenation.

## Component conventions

Each component lives in `src/components/<kebab-name>/` with at least these four files (larger ones add the optional siblings described below):

- `<name>.tsx` — the component
- `index.ts` — `export * from './<name>'`
- `<name>.stories.tsx` — Storybook stories (`title: 'Components/<PascalName>'`)
- `<name>.mdx` — Storybook docs page

The component's public exports are re-exported from `src/components/index.ts` (one `export * from './<name>'` line per component), which flows up through `src/index.ts`.

### Writing the component

Follow the pattern in `src/components/button/button.tsx`:

- Style variants use **`class-variance-authority` (`cva`)**. Define variant/size option maps as plain exported `const` objects (e.g. `ButtonVariant`, `ButtonSize`) and key the `cva` variants off them so consumers can reference named values. **End each map with `as const`.** Without it the values widen to `string`, `cva` infers `variant?: string`, and every invalid value compiles — the defect #42 tracks across 11 of 12 components, invisible to every gate.
- Props interface extends the relevant native HTML attributes **and** `VariantProps<typeof xVariants>`.
- Render with `className={cn(xVariants({ variant, size, className }))}` so consumer-supplied `className` merges/overrides correctly.
- Use named exports (`export { Button }`), not default exports.
- Colors come from theme CSS variables via Tailwind tokens (`bg-primary`, `text-primary-foreground`, `bg-destructive`, etc.) — never hardcode hex values. The token set is defined in `src/styles/theme.ts` and `palette.ts`.

### Splitting up a large component

Four files is the default and fits almost every component. Once a component's `.tsx` passes roughly **200 lines**, move the declarations that don't touch React state into siblings rather than letting the component file absorb them:

- `<name>.constants.ts` — the exported option maps (`PopoverPosition`) and their derived value types
- `<name>.variants.ts` — `cva` definitions and plain class-name lookup maps
- `<name>.utils.ts` — pure helpers with no React state (geometry, DOM selectors, formatting)

Re-export the public pieces from `<name>.tsx` (`export * from './<name>.constants'`) so `index.ts`, the stories, and consumer imports stay unchanged. `src/components/popover` is the reference example. Don't split preemptively — a 77-line component like `button` is better off in one file.

### Centralize on the second use

A constant, type, or helper needed by a **second** component moves to a shared home: `src/utils` for helpers, `src/types` for internal types, `src/styles` for tokens. `src/utils/floating.ts` is the reference example — the shared anchoring geometry behind `tooltip` and `popover`. Don't promote on the first use: an abstraction derived from a single caller usually guesses the wrong shape, and the second caller is what reveals the real one. Types that are part of the public API stay with the code that exports them — `src/index.ts` re-exports `components`, `styles`, and `utils`, but not `types`. The one bridge is `Theme`/`ThemeColors`: they are defined in `src/types/theme.ts` but re-exported from `src/styles/theme.ts` (`export type { Theme, ThemeColors } from '../types'`), because consumers need them to type a custom theme. Treat them as public API — a change to either is a breaking change for consumers.

### Scaffolding

Prefer `pnpm generate:component` (plop) to create a new component — it generates all four files and appends the barrel export. Then flesh out the `.tsx` following the `cva` pattern above (the template stub is intentionally minimal). The generator only ever makes the four base files; the extra files above are added by hand when a component earns them.

## Theming

Theme tokens live in `src/styles/` (`palette.ts` → raw colors, `theme.ts` → semantic light/dark mappings, `theme-preset.ts` / `theme-plugin.ts` → Tailwind integration). When adding a semantic color, add it to both `light` and `dark` in `theme.ts` and to the `ThemeColors` type in `src/types/theme.ts`.

A token is public API, so adding or renaming one also means updating: the variable maps in `theme-plugin.ts` (both modes) and its `colors` extension, the swatch list in `src/docs/themes.mdx`, the token table in `src/docs/custom-theme.mdx`, the token count quoted in `src/docs/custom-theme.mdx` and `README.md`, and the `checks` array in `scripts/check-contrast.mjs`.

`themePreset` is the fragile half of that integration, because every way of breaking it is silent: Tailwind accepts a malformed preset or an unrecognized `darkMode` value and just emits a build with the utilities missing. `pnpm preset` (`scripts/check-preset.mjs`) guards it by running a real Tailwind build over `tailwind.config.js` and asserting the `dark:` variant and both plugins actually come out — **run it after any change to `theme-preset.ts`, the `src/styles` barrel, or `tailwind.config.js`**, and add a check whenever the preset takes on another responsibility. Two things to know about the guards:

- Keep the `satisfies Partial<Config>` annotation on `themePreset`. `pnpm preset` does catch a `darkMode` value Tailwind would ignore — such a value emits no `dark:` utilities at all — but the annotation rejects it at typecheck time instead. Note it only guards the _types of known keys_: `Config` carries an index signature, so a misspelled key like `darkModee` still compiles. `tailwind.config.js` gets no static check at all (outside tsconfig's `include`, ESLint-ignored, `@type` JSDoc unenforced), so `pnpm preset` is its only guard.
- Keep `themePreset` a **named** export re-exported with a plain `export *`. This is the one regression `pnpm preset` **cannot** see: `export * as themePreset` hands consumers a namespace (`{ default: … }`), but Tailwind's config loader unwraps that via jiti's default interop, so the repo's own build looks fine while plain-ESM consumers get a preset that applies nothing. The ESLint `no-restricted-syntax` rule in `eslint.config.mjs` bans the syntax for this reason.

## Accessibility — color contrast (WCAG 2.1 AA)

This library must stay **WCAG 2.1 AA** compliant for color contrast, in both light and dark themes:

- **Normal text** ≥ 4.5:1, **large text** ≥ 3:1 (1.4.3).
- **UI components & meaningful icons** (input/error borders, status icons) ≥ 3:1 (1.4.11).

`pnpm contrast` (`scripts/check-contrast.mjs`) enforces this — it parses `palette.ts` + `theme.ts` and checks every foreground/background pairing the components render, exiting non-zero on any failure. **Run it after any change to `theme.ts`, `palette.ts`, or a component's color classes**, and add a new pairing to the `checks` array whenever a component introduces a new token combination. Prefer fixing contrast by picking a compliant shade **within the same hue family** so the design language is preserved.

## Visual regression testing

Playwright snapshots every Storybook story (light + dark) and diffs against committed baselines in `tests/vrt/__screenshots__/`. Config: `playwright.config.ts`. `pnpm vrt` reads the story list from the built Storybook index — so new components are covered automatically, and you must run `pnpm build-storybook` first. Three specs live in `tests/vrt/`: `stories.spec.ts` takes the snapshots, and `open-state.spec.ts` + `tolerance.spec.ts` guard the coverage itself (see the last bullet).

- Runs on every PR via `.github/workflows/vrt.yml`, inside the pinned `mcr.microsoft.com/playwright` container so rendering is stable. On a diff it fails and uploads an HTML report (expected/actual/diff) as a run artifact.
- Baselines are generated **only in CI** (rendering is environment-sensitive) — do not commit locally-generated snapshots. After an **intentional** visual change, seed/refresh them by running the **Visual Regression** workflow with `update_baselines = true`; it regenerates and commits the PNGs. Keep the container tag in `vrt.yml` in sync with the `@playwright/test` version.
- Tolerance is split across the two knobs Playwright gives you: `threshold` absorbs sub-pixel AA noise per pixel, `maxDiffPixels` stays a small structural budget. Don't quiet a failing diff by raising `maxDiffPixels`, or by swapping it back out for `maxDiffPixelRatio` — a budget in the thousands lets a whole light-on-light component appear or disappear unnoticed. Raising `threshold` spends the same headroom less visibly, since it shrinks every diff at once. `tests/vrt/tolerance.spec.ts` fails if the budget grows loose enough to swallow a vanishing popover; `tests/vrt/open-state.spec.ts` asserts the play-function stories are actually open at capture time.

## Publishing

Version bumps and `npm publish` are done via `pnpm npm-publish` (builds then publishes with public access). Do **not** publish or bump the version unless explicitly asked.

## Agent harness

`.claude/` holds the Claude Code harness. The roster lives in one place — the agent and command tables in `README.md` — so don't restate it here; this section is the conventions behind it.

**Agents and commands are not interchangeable.** `.claude/agents/*.md` are scoped, mostly read-only reviewers; `.claude/commands/*.md` are orchestrators. A subagent cannot spawn another subagent, so a workflow whose job is to coordinate other agents **must** be a command — as an agent definition it would silently skip its own gates or perform them itself, losing the independent read that made them separate agents. That is why `/release` and `/version` are commands and not the `release-manager` / `version-manager` agents they used to be (issue #62). An agent may name another agent to describe a boundary; it may not instruct delegation.

Writing a definition:

- **Frontmatter is required.** A file without it is not registered at all, and nothing announces that — six agents in this directory shipped that way and none of them ever ran.
- An agent's `name` must match its filename stem. This is a repo convention rather than a platform rule, and `pnpm agents` enforces it.
- `description` drives automatic selection, so write it to say _when_ to use the agent, not just what it does.
- Keep `tools` as tight as the workflow allows, so a read-only agent is read-only by construction rather than by promise. Commands use `allowed-tools`; a `tools` key in a command restricts nothing.
- Never write `@agent-name`. `@` is a file reference, not a dispatch — it makes Claude read the definition instead of running it. Name the agent in plain language ("use the code-reviewer agent to …").

`.claude/` sits outside every static gate — it is in neither tsc project and ESLint doesn't see it, the same class of gap as `.storybook/` and the root configs (issue #36). `pnpm agents` (`scripts/check-agents.mjs`) is the one thing that checks it: frontmatter validity, `name`-matches-stem, every cited `pnpm` script / file path / agent name / slash command resolving, no `@agent-name` syntax, no agent delegating to an agent, and the README tables matching the files on disk. Run it after any change under `.claude/`. It cannot check whether a workflow step is _sensible_ — that is `docs-reviewer`'s remit, which covers `.claude/` for this reason.

Two things about `.claude/settings.json`, which is JSON and so can hold no comments of its own — the schema sets `additionalProperties: false` on both objects below, so a `"//"` pseudo-comment inside either one draws an editor warning:

- **`permissions`.** Commands that write to the repo or to GitHub — `git commit`, `git push`, `git checkout`, and every mutating `gh` command — are intentionally absent from `allow` so they keep prompting for approval, per the working agreements below. Read-only `gh issue` queries are allowlisted because `repo-auditor` opens every audit with them. `git add` is allowlisted but the whole-tree forms are denied, since `/release` requires staging only relevant files.
- **`attribution`.** Empty strings suppress Claude's attribution: `commit` drops the `Co-Authored-By` trailer, `pr` drops the "Generated with Claude Code" footer from PR bodies. The two are independent — set only one to `""` to keep the other. Preferred over the deprecated `includeCoAuthoredBy`, which forces both together. Don't add either back by hand in a commit message or PR body.

The `PostToolUse` hook (`.claude/hooks/warn-ungated-files.sh`) fires on `Edit|Write` to `.storybook/` or `tailwind.config.js` and prints a reminder that neither is covered by `pnpm test` or `pnpm lint`, so each needs a real build to verify. It exits 2 because that is the only code that reliably puts stderr in front of the model, so a successful edit is followed by what the transcript renders as an error — expected, not a failure. Its matcher is `Edit|Write`, so a write performed through Bash (heredoc, `sed -i`, `cp`) bypasses it entirely.

## Working agreements

- Don't commit, push, or bump versions unless asked.
- Match the surrounding style; keep comment density low (the codebase is largely comment-free).
- After edits, verify with `pnpm test` + `pnpm lint` before reporting done.
