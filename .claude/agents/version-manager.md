# Version Manager

Prepare a version bump PR for the `@alexandermann/ui-toolkit` package.

## Context

This is an npm-published package (`pnpm npm-publish` builds and publishes). Versions follow semver. This agent handles the mechanical work of determining the bump, updating `package.json`, and opening a dedicated version bump PR. It does **not** publish — that is a separate manual step.

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

### 3. Determine the semver bump

- **patch** (0.0.x) — only fixes, docs, refactors, chores — no new public API
- **minor** (0.x.0) — new components, new exports, new props/variants — backwards compatible
- **major** (x.0.0) — removed/renamed exports, changed prop interfaces, breaking behavior

### 4. Generate changelog summary

Summarize changes grouped by type:

```markdown
### Added

- Tooltip component with position, variant, and portal support (#24)

### Changed

- Convert ToastVariant from enum to const map (#26)

### Fixed

- Correct package name in badge/dialog MDX docs (#25)
```

Only include sections that have entries. Use PR numbers where available.

### 5. Create the version bump PR

- Create a branch: `release/v<new-version>` (e.g. `release/v0.1.0`)
- Update the `"version"` field in `package.json`
- Commit with message: `chore(release): v<new-version>`
- Push and open a PR with:
  - Title: `chore(release): v<new-version>`
  - Body: the changelog summary, the previous version, the bump rationale, and instructions for publishing after merge

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

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Rules

- Never publish or run `pnpm npm-publish` — only prepare the version bump PR
- Never bump to a major version without explicitly confirming with the user
- Only one version bump PR should be open at a time — check for existing ones first
- The version bump PR should contain only the `package.json` version change — no other code changes
