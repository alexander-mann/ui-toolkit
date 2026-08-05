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
| `tailwindcss` | `^3.4.0`               |

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
`data-mode="dark"` on any ancestor element (typically `<html>`):

```html
<html data-mode="dark">
  ...
</html>
```

Toggle the attribute at runtime to switch themes.

## Components

Accordion · Badge · Button · Card · Checkbox · Dialog · Divider · Input ·
Label · RadioGroup · Select · Switch · Table · Tabs · Textarea · Toast ·
Tooltip

## AI agents

This repo ships custom [Claude Code](https://claude.com/claude-code) agents in
`.claude/agents/` that encode the toolkit's conventions and automate common
workflows. Invoke them from the Claude Code CLI with `@agent-name`:

| Agent               | What it does                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `component-planner` | Plans a new component — researches existing patterns, designs the API (CVA variants, props, a11y), and outputs a structured implementation plan |
| `code-reviewer`     | Reviews changes against a comprehensive checklist: component conventions, code style, WCAG AA accessibility, stories/docs quality               |
| `docs-reviewer`     | Audits all documentation (MDX, README, CLAUDE.md, CONTRIBUTING.md) for accuracy, stale references, and cross-file consistency                   |
| `ship-it`           | Handles the full PR pipeline: pre-flight checks, branch, conventional commit, push, PR creation, VRT baseline generation, and CI verification   |

### Example usage

```
# Plan a new popover component
@component-planner Plan a Popover component

# Review current changes before committing
@code-reviewer Review my changes

# Check all docs are up to date
@docs-reviewer Audit all documentation

# Ship the current work as a PR
@ship-it Ship these changes
```

### Writing your own agents

Agent definitions are Markdown files in `.claude/agents/`. Each file defines the
agent's purpose, workflow steps, and output format. See the existing agents for
the pattern, or refer to the
[Claude Code docs](https://docs.anthropic.com/en/docs/claude-code/agents).

## Documentation

Visit the [documentation site](https://alexander-mann.github.io/ui-toolkit/) for
component APIs, theming, and live examples.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for architecture, local development, and
the checks a change must pass.

## License

MIT © [Alexander Mann](https://github.com/alexander-mann)
