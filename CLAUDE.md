# CLAUDE.md

Guidance for AI agents working in this repo. Follow these conventions so changes stay consistent with the existing codebase.

## What this is

`@alexandermann/ui-toolkit` — a React 19 + Tailwind CSS design system published to npm. Components are documented in Storybook and consumed as a library (`dist/` is the published output, built from `src/` via `tsc`). There is no runtime bundler; TypeScript compiles the source and `tscpaths` rewrites the `@*` path aliases.

## Commands

Package manager is **pnpm** (do not use npm/yarn for installs).

| Task                   | Command                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| Typecheck (the "test") | `pnpm test` — runs `tsc --project tsconfig.json`, no emit failures allowed |
| Lint                   | `pnpm lint` (autofix: `pnpm lint:fix`)                                     |
| Format                 | `pnpm prettier`                                                            |
| Build library          | `pnpm build`                                                               |
| Run Storybook          | `pnpm storybook` (port 6006)                                               |
| Scaffold a component   | `pnpm generate:component`                                                  |

There is **no unit-test framework**. "Tests" = a clean `tsc` typecheck. Before finishing any change, run `pnpm test` and `pnpm lint` and make sure both pass.

## Code style

Enforced by ESLint (`typescript-eslint` strict + stylistic) and Prettier. Key rules:

- **No semicolons**, single quotes, 2-space indent, print width 80.
- Use `===`/`!==` (`eqeqeq`), prefer `const`, no `var`, prefer template literals over concatenation, object shorthand, `curly` braces always.
- Imports are auto-sorted: `react` first, then third-party, then relative — separated by blank lines. Don't hand-order; let Prettier do it.
- A Husky pre-commit hook runs `pretty-quick --staged`, so staged files are auto-formatted on commit.

## Path aliases

`tsconfig.json` maps `@*` → `./src/*`. Import shared helpers via aliases, e.g. `import { cn } from '@utils'`. The `cn` helper (`clsx` + `tailwind-merge`) is the standard way to compose class names — always use it rather than string concatenation.

## Component conventions

Each component lives in `src/components/<kebab-name>/` with four files:

- `<name>.tsx` — the component
- `index.ts` — `export * from './<name>'`
- `<name>.stories.tsx` — Storybook stories (`title: 'Components/<PascalName>'`)
- `<name>.mdx` — Storybook docs page

The component's public exports are re-exported from `src/components/index.ts` (one `export * from './<name>'` line per component), which flows up through `src/index.ts`.

### Writing the component

Follow the pattern in `src/components/button/button.tsx`:

- Style variants use **`class-variance-authority` (`cva`)**. Define variant/size option maps as plain exported `const` objects (e.g. `ButtonVariant`, `ButtonSize`) and key the `cva` variants off them so consumers can reference named values.
- Props interface extends the relevant native HTML attributes **and** `VariantProps<typeof xVariants>`.
- Render with `className={cn(xVariants({ variant, size, className }))}` so consumer-supplied `className` merges/overrides correctly.
- Use named exports (`export { Button }`), not default exports.
- Colors come from theme CSS variables via Tailwind tokens (`bg-primary`, `text-primary-foreground`, `bg-destructive`, etc.) — never hardcode hex values. The token set is defined in `src/styles/theme.ts` and `palette.ts`.

### Scaffolding

Prefer `pnpm generate:component` (plop) to create a new component — it generates all four files and appends the barrel export. Then flesh out the `.tsx` following the `cva` pattern above (the template stub is intentionally minimal).

## Theming

Theme tokens live in `src/styles/` (`palette.ts` → raw colors, `theme.ts` → semantic light/dark mappings, `theme-preset.ts` / `theme-plugin.ts` → Tailwind integration). When adding a semantic color, add it to both `light` and `dark` in `theme.ts` and to the `Theme` type in `src/types/theme.ts`.

## Publishing

Version bumps and `npm publish` are done via `pnpm npm-publish` (builds then publishes with public access). Do **not** publish or bump the version unless explicitly asked.

## Working agreements

- Don't commit, push, or bump versions unless asked.
- Match the surrounding style; keep comment density low (the codebase is largely comment-free).
- After edits, verify with `pnpm test` + `pnpm lint` before reporting done.
