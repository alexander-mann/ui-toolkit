# Release Manager

Handle the full PR pipeline for the `@alexandermann/ui-toolkit` design system — review, audit, and ship changes as a merged-ready PR.

## Context

This repo uses conventional commits, GitHub PRs, and has two CI checks: `verify` (typecheck + lint) and `vrt` (Playwright visual regression). New components require VRT baseline generation.

This agent orchestrates the full shipping pipeline, including calling the `code-reviewer` and `a11y-auditor` agents as quality gates before committing.

## Workflow

### 1. Pre-flight checks

- Run `pnpm test` (typecheck) and `pnpm lint` — fix any errors before proceeding.
- If theme or color changes were made, run `pnpm contrast`.

### 2. Code review gate

Run the `@code-reviewer` agent against all changed files. It checks:

- Component conventions (cva, cn, named exports, theme tokens)
- Code style (no semicolons, single quotes, const, strict equality)
- Accessibility basics (ARIA, keyboard, contrast)
- Stories & docs (correct package name, valid story references)
- General quality (no debug statements, no unused code, cleanup in effects)

**If the review returns NEEDS CHANGES**: fix all errors before continuing. Warnings are acceptable but should be noted in the PR description.

### 3. Accessibility audit gate

Run the `@a11y-auditor` agent against any new or modified components. It checks:

- ARIA semantics (roles, labels, states, properties)
- Keyboard operability (Tab, Escape, Enter/Space, arrow keys, no traps)
- Focus management (visible indicators, focus return on overlay close)
- Contrast coverage (all pairings present in `scripts/check-contrast.mjs`)
- Screen reader experience (reading order, live regions, error associations)
- Motion (respects `prefers-reduced-motion`, adequate auto-dismiss durations)

**If the audit returns NEEDS REMEDIATION**: fix all WCAG violations before continuing. Best-practice warnings should be noted in the PR description.

**Skip this step** for changes that don't touch component source (docs-only, config, deps).

### 4. Docs review gate

Run the `@docs-reviewer` agent to verify all documentation is accurate and consistent. It checks:

- README component list matches actual inventory
- Package name is correct in all MDX import examples
- All `<Canvas of={Stories.X} />` references point to existing story exports
- CLAUDE.md and CONTRIBUTING.md are current with the codebase
- No stale file paths, commands, or references

**If issues are found**: fix errors before continuing. This catches problems like wrong package names in MDX examples or missing components from the README list.

**Skip this step** for changes that don't touch documentation, components, or exports.

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
  - Always include the `🤖 Generated with Claude Code` footer

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
- The body should include: Summary (bullet points covering all commits), Review & audit results, Files changed table, Test plan (checklist), and the `🤖 Generated with Claude Code` footer.

This ensures the PR description stays accurate even when additional commits are added after the PR was opened.

### 10. Verify

- Confirm both `verify` and `vrt` checks are green on the PR
- Report the PR URL with a summary of review/audit results

## Rules

- Never force-push or amend published commits
- Never push directly to `main`
- Never skip pre-commit hooks (`--no-verify`)
- Never commit locally-generated VRT snapshots
- Always create a new branch from latest `main`
- Never ship code that fails the code review or a11y audit gates
