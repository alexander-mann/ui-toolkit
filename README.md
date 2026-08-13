![SVG Logo](.storybook/logo.svg)

A modern design system built with React 19 and Tailwind CSS, providing reusable components and consistent, themeable styling.

Browse the full component library in the [Storybook documentation](https://alexander-mann.github.io/ui-toolkit/).

## Features

- 🎨 Built with React & Tailwind CSS
- 📦 Ready-to-use components
- 🌗 Light & dark themes out of the box
- 🎯 Fully customizable via CSS variables
- ♿ WCAG 2.1 AA — color contrast enforced in CI

## Installation

```bash
npm install @alexandermann/ui-toolkit
# or
pnpm add @alexandermann/ui-toolkit
# or
yarn add @alexandermann/ui-toolkit
```

### Peer dependencies

This package expects the following to be installed in your app:

```bash
npm install react react-dom tailwindcss
```

| Peer          | Supported range        |
| ------------- | ---------------------- |
| `react`       | `^18.0.0 \|\| ^19.0.0` |
| `react-dom`   | `^18.0.0 \|\| ^19.0.0` |
| `tailwindcss` | `^3.4.1`               |

## Setup

The components are styled with Tailwind utility classes that map to the design
system's theme tokens (`bg-primary`, `text-card-foreground`, …). To make those
tokens resolve, wire the toolkit's Tailwind **preset** and **theme plugin** into
your `tailwind.config.js`:

```js
import {
  baseTheme,
  themePlugin,
  themePreset,
} from '@alexandermann/ui-toolkit/styles'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Scan the toolkit so its class names survive Tailwind's purge:
    './node_modules/@alexandermann/ui-toolkit/dist/**/*.js',
  ],
  presets: [themePreset],
  plugins: [themePlugin(baseTheme)],
}
```

`themePlugin` injects the theme's CSS variables and base styles. Pass
`baseTheme` for the defaults, or your own object matching the `Theme` type to
re-skin every component.

## Custom theme

Components only ever reference semantic tokens (`bg-primary`,
`text-card-foreground`, …), so replacing the theme object re-skins the whole
library. A theme is plain data: a `light` and a `dark` set with the same 21
tokens, typed by the exported `Theme` interface.

```ts
// theme.ts
import { baseTheme, type Theme } from '@alexandermann/ui-toolkit/styles'

export const brandTheme: Theme = {
  light: {
    ...baseTheme.light,
    primary: '#3B2F8F',
    primaryForeground: '#FFFFFF',
  },
  dark: {
    ...baseTheme.dark,
    primary: '#BFB4FF',
    primaryForeground: '#14103A',
  },
}
```

Then hand it to the plugin in place of `baseTheme`:

```js
plugins: [themePlugin(brandTheme)]
```

A custom theme is your palette, so its contrast is yours to verify — the WCAG AA
guarantee travels with the color values, not the components.

The full walkthrough — every token and what renders it, color-value rules,
runtime theme switching, and the contrast pairings to check — is in
[**Styles → Custom Theme**](https://alexander-mann.github.io/ui-toolkit/?path=/docs/styles-custom-theme--docs).

## Basic usage

```jsx
import { Button, Card } from '@alexandermann/ui-toolkit'

function App() {
  return (
    <Card>
      <h2>Card Title</h2>
      <p>Card content goes here</p>
      <Button variant="default" size="lg">
        Click me
      </Button>
    </Card>
  )
}
```

## Dark mode

The theme ships light and dark palettes. Dark mode is activated by setting
`data-mode="dark"` on the element or any ancestor (typically `<html>`):

```html
<html data-mode="dark">
  ...
</html>
```

Toggle the attribute at runtime to switch themes.

## Components

Accordion · Badge · Button · Card · Checkbox · Dialog · Divider · Input ·
Label · Popover · RadioGroup · Select · Switch · Table · Tabs · Textarea ·
Toast · Tooltip

## AI agent harness

This repo ships a custom [Claude Code](https://claude.com/claude-code) harness in
`.claude/` that encodes the toolkit's conventions and automates common workflows.
It comes in two halves, and the split is deliberate: **agents** are scoped,
mostly read-only reviewers that answer a question, and **commands** are
orchestrators that drive a multi-step pipeline, dispatching those agents where a
step calls for one. A subagent cannot spawn another subagent, so anything that
may need to coordinate other agents — or to reach a tool only the main session
has — has to be a command — see
[issue #62](https://github.com/alexander-mann/ui-toolkit/issues/62).

### Agents

Claude picks an agent automatically when a task matches its `description`; to
request a specific one, ask for it by name in plain language ("use the
code-reviewer agent to review my changes"). `/agents` lists and manages the
agents available in a session.

| Agent               | What it does                                                                                                                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `component-planner` | Plans a new component — researches existing patterns, designs the API (CVA variants, props, a11y), and outputs a structured implementation plan       |
| `code-reviewer`     | Reviews changes against component conventions, the conventions no gate enforces, accessibility basics, and stories/docs quality                       |
| `a11y-auditor`      | Deep WCAG 2.1 AA accessibility audit — ARIA semantics, keyboard operability, focus management, contrast coverage, and screen reader experience        |
| `docs-reviewer`     | Audits all documentation (MDX, README, CLAUDE.md, CONTRIBUTING.md, `.claude/`) for accuracy, stale references, and cross-file consistency             |
| `repo-auditor`      | Whole-repo audit for latent defects with no issue filed yet — sweeps the code, gates, package shape, CI, and docs, proving each finding by running it |

### Commands

Commands are invoked by name at the prompt. Both of these end in a commit, a
push, and a `gh` call, which `.claude/settings.json` deliberately leaves off the
allowlist so each one surfaces for approval.

| Command    | What it does                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/release` | Runs the full PR pipeline: pre-flight gates, then the code review, a11y audit, and docs review gates, then branch, commit, push, PR, VRT baselines, CI |
| `/version` | Prepares a version bump PR — analyzes commits since the last release, determines the semver bump, generates a changelog, and opens a release PR        |

### Example usage

Each of these is typed at the Claude Code prompt:

```
Use the component-planner agent to plan a Breadcrumbs component
Use the code-reviewer agent to review my changes
Use the a11y-auditor agent to audit the dialog component
Use the docs-reviewer agent to audit all documentation
Use the repo-auditor agent to find problems that aren't filed yet
/release
/version
```

### The rest of the harness

[`.claude/settings.json`](.claude/settings.json) allowlists the project's gate
commands and denies publishing, and
[`.claude/hooks/warn-ungated-files.sh`](.claude/hooks/warn-ungated-files.sh)
prints a reminder when anything in `.storybook/` or `tailwind.config.js` is
edited — neither is covered by `pnpm test` or `pnpm lint`, so each needs a build
to verify it. `pnpm agents` ([`scripts/check-agents.mjs`](scripts/check-agents.mjs))
is the gate over the directory itself: it checks that every definition has valid
frontmatter, that every command, path, and agent name cited in one resolves, and
that the two tables above match the files on disk.

### Writing your own

Both kinds are Markdown files — agents in `.claude/agents/`, commands in
`.claude/commands/` — with YAML frontmatter followed by a body defining the
purpose, workflow steps, and output format. **Without frontmatter the file is not
registered at all**, which fails silently.

An agent's frontmatter carries `name` (matching the filename stem, which is this
repo's convention rather than a platform rule — `pnpm agents` enforces it),
`description`, and an optional `tools` list limiting what it may use. Keep that
list as tight as the workflow allows: a planner or reviewer that never runs
anything should not carry `Bash`, so its read-only property is enforced rather
than promised. `description` is what Claude matches a task against when selecting
an agent automatically, so it should say _when_ to use the agent, not just what it
does.

A command's frontmatter carries `description`, and its name comes from the
filename — `.claude/commands/release.md` is `/release`. Note it uses
`allowed-tools`, not `tools`; a `tools` key in a command restricts nothing.

See the existing definitions for the pattern, or refer to the Claude Code docs on
[subagents](https://code.claude.com/docs/en/sub-agents) and
[slash commands](https://code.claude.com/docs/en/slash-commands).

## Documentation

Visit the [documentation site](https://alexander-mann.github.io/ui-toolkit/) for
component APIs, theming, and live examples.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for architecture, local development, and
the checks a change must pass.

## License

MIT © [Alexander Mann](https://github.com/alexander-mann)
