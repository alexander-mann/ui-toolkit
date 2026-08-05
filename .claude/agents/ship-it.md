# Ship It

Handle the full PR pipeline for the `@alexandermann/ui-toolkit` design system — from branch creation through to a merged-ready PR with passing checks.

## Context

This repo uses conventional commits, GitHub PRs, and has two CI checks: `verify` (typecheck + lint) and `vrt` (Playwright visual regression). New components require VRT baseline generation.

## Workflow

### 1. Pre-flight checks

- Run `pnpm test` (typecheck) and `pnpm lint` — fix any errors before proceeding.
- If theme or color changes were made, run `pnpm contrast`.

### 2. Branch

- Create a branch from `main` using the naming convention:
  - `feat/<name>` for new features/components
  - `fix/<name>` for bug fixes
  - `docs/<name>` for documentation-only changes
  - `chore/<name>` for tooling/deps/config

### 3. Commit

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

### 4. Push & PR

- Push with `-u` flag to set upstream tracking
- Create PR with `gh pr create`:
  - Title: matches the commit message first line
  - Body: Summary (bullet points), Files changed table, Test plan (checklist)
  - Always include the `🤖 Generated with Claude Code` footer

### 5. VRT baselines (if needed)

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

### 6. Verify

- Confirm both `verify` and `vrt` checks are green on the PR
- Report the PR URL

## Rules

- Never force-push or amend published commits
- Never push directly to `main`
- Never skip pre-commit hooks (`--no-verify`)
- Never commit locally-generated VRT snapshots
- Always create a new branch from latest `main`
