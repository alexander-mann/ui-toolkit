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
| Color-contrast gate    | `pnpm contrast` (WCAG AA — see Accessibility below)                        |
| Visual regression      | `pnpm vrt` (compare) / `pnpm vrt:update` (refresh baselines)               |

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

Each component lives in `src/components/<kebab-name>/` with at least these four files (larger ones add the optional siblings described below):

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

## Accessibility — color contrast (WCAG 2.1 AA)

This library must stay **WCAG 2.1 AA** compliant for color contrast, in both light and dark themes:

- **Normal text** ≥ 4.5:1, **large text** ≥ 3:1 (1.4.3).
- **UI components & meaningful icons** (input/error borders, status icons) ≥ 3:1 (1.4.11).

`pnpm contrast` (`scripts/check-contrast.mjs`) enforces this — it parses `palette.ts` + `theme.ts` and checks every foreground/background pairing the components render, exiting non-zero on any failure. **Run it after any change to `theme.ts`, `palette.ts`, or a component's color classes**, and add a new pairing to the `checks` array whenever a component introduces a new token combination. Prefer fixing contrast by picking a compliant shade **within the same hue family** so the design language is preserved.

## Visual regression testing

Playwright snapshots every Storybook story (light + dark) and diffs against committed baselines in `tests/vrt/__screenshots__/`. Config: `playwright.config.ts`; test: `tests/vrt/stories.spec.ts` (the story list is read from the built Storybook index, so new components are covered automatically).

- Runs on every PR via `.github/workflows/vrt.yml`, inside the pinned `mcr.microsoft.com/playwright` container so rendering is stable. On a diff it fails and uploads an HTML report (expected/actual/diff) as a run artifact.
- Baselines are generated **only in CI** (rendering is environment-sensitive) — do not commit locally-generated snapshots. After an **intentional** visual change, seed/refresh them by running the **Visual Regression** workflow with `update_baselines = true`; it regenerates and commits the PNGs. Keep the container tag in `vrt.yml` in sync with the `@playwright/test` version.

## Publishing

Version bumps and `npm publish` are done via `pnpm npm-publish` (builds then publishes with public access). Do **not** publish or bump the version unless explicitly asked.

## Working agreements

- Don't commit, push, or bump versions unless asked.
- Match the surrounding style; keep comment density low (the codebase is largely comment-free).
- After edits, verify with `pnpm test` + `pnpm lint` before reporting done.
