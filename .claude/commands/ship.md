---
description: Ship the current work as a PR — pre-flight gates, the code review / a11y / docs review gates, branch, commit, push, PR creation, VRT baselines, and CI verification.
---

# Ship

Handle the full PR pipeline for the `@alexandermann/ui-toolkit` design system — review, audit, and ship the current work as a merge-ready PR.

## Context

This repo uses conventional commits, GitHub PRs, and has three CI checks: `verify` (typecheck, lint, `pnpm contrast`, `pnpm preset`, `pnpm agents`, and the library build — note CI runs the contrast, preset, and agent gates unconditionally on every PR, even when the pre-flight below skips them), `storybook` (builds Storybook across a Node version matrix, so it reports one leg per version), and `vrt` (Playwright visual regression). `verify` and `storybook` are both jobs in `ci.yml`; `storybook.yml` is the GitHub Pages deploy and does not run on PRs. New components require VRT baseline generation.

**This is a command, not an agent, and that is the point.** Steps 2–4 dispatch the `code-reviewer`, `a11y-auditor`, and `docs-reviewer` subagents. A subagent cannot spawn another subagent, so as an agent definition this pipeline could not run its own quality gates — it would either skip them or quietly perform them itself, losing the independent perspective that made them separate agents. A command runs in the main session, where dispatching subagents works, and where the commit/push/`gh` steps still surface for human approval because `.claude/settings.json` deliberately leaves them off the allowlist. See issue #62.

Each gate is an independent read of the work. Do not pre-empt a gate by reviewing the diff yourself first and dispatching a subagent to confirm your conclusion — dispatch it cold and let it find what it finds.

## Workflow

### 1. Pre-flight checks

- Run `pnpm test` (typecheck) and `pnpm lint` — fix any errors before proceeding.
- If theme or color changes were made, run `pnpm contrast`.
- If `src/styles/theme-preset.ts`, `src/styles/index.ts`, or `tailwind.config.js` changed, run `pnpm preset` — a broken Tailwind preset fails silently.
- If anything under `.storybook/` changed, run `pnpm build-storybook` — it is in neither tsc project and is ESLint-ignored, so a real build is the only thing that checks it.
- If anything under `.claude/` changed, run `pnpm agents`.
- If a component MDX or a plop template changed, read it. `.prettierignore` excludes `*.mdx` and `plop-templates/`, so no gate reaches either.

### 2. Code review gate

Use the `code-reviewer` agent to review all changed files. It checks component conventions (cva, `cn`, named exports, theme tokens), the conventions no gate enforces, accessibility basics, stories and docs, and general quality. Style is not in its remit — `pnpm lint` already owns that, and step 1 has run it.

**If the review returns NEEDS CHANGES**: fix all errors before continuing. Warnings are acceptable but should be noted in the PR description.

### 3. Accessibility audit gate

Use the `a11y-auditor` agent to audit any new or modified components. It checks:

- ARIA semantics (roles, labels, states, properties)
- Keyboard operability (Tab, Escape, Enter/Space, arrow keys, no traps)
- Focus management (visible indicators, focus return on overlay close)
- Contrast coverage (all pairings present in `scripts/check-contrast.mjs`)
- Screen reader experience (reading order, live regions, error associations)
- Motion (respects `prefers-reduced-motion`, adequate auto-dismiss durations)

**If the audit returns NEEDS REMEDIATION**: fix all WCAG violations before continuing. Best-practice warnings should be noted in the PR description.

**Skip this step** for changes that don't touch component source (docs-only, config, deps).

### 4. Docs review gate

Use the `docs-reviewer` agent to verify all documentation is accurate and consistent. It checks:

- README component list matches actual inventory
- Package name is correct in all MDX import examples
- All `<Canvas of={Stories.X} />` references point to existing story exports
- CLAUDE.md and CONTRIBUTING.md are current with the codebase
- `.claude/` — agent and command definitions match the harness they describe
- No stale file paths, commands, or references

**If issues are found**: fix errors before continuing. This catches problems like wrong package names in MDX examples or missing components from the README list.

**Skip this step** for changes that don't touch documentation, components, exports, or `.claude/`.

### 5. Branch

- Create a branch from `main` using the naming convention:
  - `feat/<name>` for new features/components
  - `fix/<name>` for bug fixes
  - `docs/<name>` for documentation-only changes
  - `chore/<name>` for tooling/deps/config

### 6. Commit

- Stage only relevant files (never `git add -A`)
- Do not commit `.env`, `node_modules/`, or locally-generated VRT snapshots
- Use conventional commit format:

  ```
  <type>(<scope>): <short description>

  [optional body — what and why]
  ```

- Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `style`
- Scope: short noun for the area (e.g. `tooltip`, `docs`, `deps`)
- Description: lowercase, imperative, no period, max 72 chars

### 7. Push & PR

- Push with `-u` flag to set upstream tracking
- Create PR with `gh pr create`:
  - Title: matches the commit message first line
  - Body: Summary (bullet points), Review & audit results, Files changed table, Test plan (checklist)
  - Include any warnings from the code review or a11y audit in the PR description
  - Do **not** add a "Generated with Claude Code" footer or a `Co-Authored-By` trailer. `attribution` in `.claude/settings.json` sets both to `""` deliberately; adding one by hand puts back what that setting removes.

### 8. VRT baselines (if needed)

If the change adds or modifies components:

- Wait for the initial VRT check to fail (expected — no baselines yet)
- Trigger the Visual Regression workflow with `update_baselines=true`:
  ```
  gh workflow run "Visual Regression" --ref <branch> -f update_baselines=true
  ```
- Wait for that run to complete (it commits baselines with `[skip ci]`)
- Push an empty commit to trigger a fresh VRT comparison:
  ```
  git pull origin <branch>
  git commit --allow-empty -m "chore: trigger VRT re-check with updated baselines"
  git push
  ```
- Watch the new VRT run to confirm it passes

### 9. Update PR description

After all commits are pushed (including any VRT baseline or fix-up commits), update the PR title and body to reflect the **final** state of all changes on the branch — not just the initial commit:

- Run `git log main..HEAD --oneline` and `git diff main...HEAD --stat` to see everything included.
- Update via `gh pr edit <number> --title "..." --body "..."`.
- The title should summarize the overall change, not just the first commit.
- The body should include: Summary (bullet points covering all commits), Review & audit results, Files changed table, and Test plan (checklist). No attribution footer — see step 7.

This ensures the PR description stays accurate even when additional commits are added after the PR was opened.

### 10. Verify

- Confirm the `verify`, `storybook`, and `vrt` checks are green on the PR. The `storybook` job reports one leg per Node version; its floating `current` leg is `continue-on-error`, so a failure there is advisory — investigate it, but it does not block the merge.
- Report the PR URL with a summary of review/audit results
- Remind the user to run `/release` when they're ready to cut a release

## Rules

- Never force-push or amend published commits
- Never push directly to `main`
- Never skip pre-commit hooks (`--no-verify`)
- Never commit locally-generated VRT snapshots
- Always create a new branch from latest `main`
- Never ship code that fails the code review or a11y audit gates
