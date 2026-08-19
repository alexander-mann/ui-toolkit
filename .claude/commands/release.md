---
description: Prepare a version bump PR — analyse commits since the last release, determine the semver bump, generate a changelog, update package.json, and open a release PR. Never publishes.
---

# Release

Prepare a version bump PR for the `@alexandermann/ui-toolkit` package.

## Context

This is an npm-published package (`pnpm npm-publish` builds and publishes). Versions follow semver. This command handles the mechanical work of determining the bump, updating `package.json`, and opening a dedicated version bump PR. It does **not** publish — that is a separate manual step.

It is a command rather than an agent for the same reason `/ship` is: the commit, push, and `gh pr create` steps are deliberately left off the allowlist in `.claude/settings.json` so they surface for human approval, which only happens in the main session. See issue #62.

## Workflow

### 1. Determine the last release

- Read the current version from `package.json`
- Find the commit that last changed the version: `git log --oneline -1 -- package.json` or check `git log --all --oneline` for version bump commits

### 2. Analyze changes since last release

- Run `git log <last-version-commit>..HEAD --oneline` to list all commits since the last bump
- Categorize each commit by its conventional commit type:
  - `feat` → new functionality
  - `fix` → bug fix
  - `refactor` → internal change
  - `docs` / `chore` / `style` / `test` → non-functional
- Check for breaking changes:
  - Removed or renamed exports (search `git diff <last-version-commit>..HEAD -- src/components/index.ts src/index.ts`)
  - Changed prop interfaces
  - Changed component behavior
  - A change to `Theme` or `ThemeColors` in `src/types/theme.ts` — they are re-exported from `src/styles/theme.ts`, so they are public API

### 3. Determine the semver bump

- **patch** (0.0.x) — only fixes, docs, refactors, chores — no new public API
- **minor** (0.x.0) — new components, new exports, new props/variants, new theme tokens — backwards compatible
- **major** (x.0.0) — removed/renamed exports, changed prop interfaces, breaking behavior

### 4. Close out the changelog

`CHANGELOG.md` is the source of truth — entries are written as each change lands, not reconstructed here. Your job is to release the `## [Unreleased]` section, not to author it:

- Rename `## [Unreleased]` to `## [<new-version>] — <YYYY-MM-DD>`
- Open a fresh empty `## [Unreleased]` above it
- Update the link references at the bottom of the file

Then reconcile it against step 2 before continuing. If the commit log contains a public-API change with no changelog entry, **add the missing entry** rather than releasing an incomplete file — a contributor forgetting one is the expected failure mode. If `Unreleased` is empty but there are shippable commits, stop and report that rather than cutting an empty release.

The `Unreleased` section also overrides the commit log for the bump decision in step 3: an entry marked **Breaking** means a breaking bump even if no commit message said so.

Format (Keep a Changelog — Added / Changed / Deprecated / Removed / Fixed / Security, only the sections with entries):

```markdown
## [0.1.0] — 2026-08-13

### Added

- Tooltip component with position, variant, and portal support (#24)

### Changed

- **Breaking** `ToastVariant` keys are lowercase: `ToastVariant.Success` → `ToastVariant.success` (#26)

### Fixed

- Correct package name in badge/dialog MDX docs (#25)
```

### 5. Create the version bump PR

- Create a branch: `release/v<new-version>` (e.g. `release/v0.1.0`)
- Update the `"version"` field in `package.json`
- Commit `package.json` and `CHANGELOG.md` together with message: `chore(release): v<new-version>`
- Push and open a PR with:
  - Title: `chore(release): v<new-version>`
  - Body: the changelog summary, the previous version, the bump rationale, and instructions for publishing after merge
  - No attribution footer — `attribution` in `.claude/settings.json` sets both the commit trailer and the PR footer to `""` deliberately

Example PR body:

```markdown
## Release v0.1.0

**Bump**: 0.0.16 → 0.1.0 (minor — new component exports)

### Changelog

#### Added

- Tooltip component (#24)

#### Changed

- Toast: enum → const map (#26)

#### Fixed

- Package name in badge/dialog MDX (#25)

### Publishing

After merging this PR, publish by running:

\`\`\`
pnpm npm-publish
\`\`\`
```

## Rules

- Never publish or run `pnpm npm-publish` — only prepare the version bump PR
- Never bump to a major version without explicitly confirming with the user
- Only one version bump PR should be open at a time — check for existing ones first
- The version bump PR should contain only the `package.json` version change and the `CHANGELOG.md` release rollover — no other code changes
