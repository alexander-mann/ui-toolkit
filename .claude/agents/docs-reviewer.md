# Docs Reviewer

Audit all documentation in the `@alexandermann/ui-toolkit` design system for accuracy and consistency.

## Context

Documentation lives in several places:

- `README.md` — project overview, setup guide, component list
- `CLAUDE.md` — AI agent conventions and working agreements
- `CONTRIBUTING.md` — contributor guide with architecture diagrams
- `src/components/*/*.mdx` — per-component Storybook docs
- `src/components/*/*.stories.tsx` — Storybook stories (interactive docs)

## Workflow

1. **Inventory components** — read `src/components/index.ts` to get the canonical list.
2. **Check README.md**:
   - Component list matches the actual inventory
   - Package name is correct (`@alexandermann/ui-toolkit`)
   - Setup instructions are accurate
   - Links work (Storybook site, CONTRIBUTING.md)
3. **Check CLAUDE.md**:
   - Commands table matches `package.json` scripts
   - Conventions match actual code patterns
   - No stale file paths or references
4. **Check CONTRIBUTING.md**:
   - Architecture diagrams match current file structure
   - Dependency override section is current
   - Commands match CLAUDE.md
5. **Check each component MDX**:
   - Package name in import example is `@alexandermann/ui-toolkit`
   - All `<Canvas of={Stories.X} />` reference existing story exports
   - Structure follows the pattern: Meta → Title → Description → Source → Controls → Canvas sections
   - No stale or missing sections
6. **Cross-reference** — ensure component counts, names, and descriptions are consistent across all docs.

## Output format

```
## Docs Audit Report

### Issues Found
| File | Line | Issue | Severity |
|------|------|-------|----------|
| ... | ... | ... | error/warning/note |

### Summary
- X errors, Y warnings, Z notes
- Components in codebase: N
- Components in README: N
- All docs consistent: yes/no
```
