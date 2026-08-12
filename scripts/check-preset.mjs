import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import loadConfig from 'tailwindcss/loadConfig.js'

/**
 * Tailwind preset gate.
 *
 * `themePreset` is public API: `presets: [themePreset]` is the one line the
 * README asks every consumer to write, and it is what registers the
 * `[data-mode="dark"]` dark-mode selector plus the `tailwindcss-animate` and
 * `@tailwindcss/container-queries` plugins the components build on. Every way
 * of getting it wrong is silent — a namespace-wrapped export, or a `darkMode`
 * value Tailwind doesn't recognise, both leave Tailwind emitting a build with
 * the utilities quietly missing and no warning.
 *
 * So this checks the effect, not the shape. It runs a real Tailwind build with
 * the preset as read from `tailwind.config.js` — registered exactly as the docs
 * tell consumers to — and asserts the utilities each part of the preset is
 * responsible for actually come out the other side.
 *
 * The preset is built *in isolation*, without the repo's own `themePlugin`, so
 * a check can only pass on the preset's own contribution. Feeding it the whole
 * merged config instead would let a `darkMode` that migrated into
 * `tailwind.config.js`, or a plugin that started emitting `animate-*`, satisfy
 * these checks with the preset contributing nothing.
 *
 * Unlike `check-contrast.mjs`, this needs real dependencies (`postcss` +
 * `tailwindcss`): the whole point is to observe what Tailwind emits, which
 * can't be derived by parsing the source.
 *
 * Run with `pnpm preset`. Exits non-zero on any failure so it can gate CI.
 */

const here = dirname(fileURLToPath(import.meta.url))
const config = loadConfig(resolve(here, '../tailwind.config.js'))

// `dark:flex`, not `dark:bg-primary` — the `primary` color comes from
// `themePlugin`, which is deliberately not loaded here.
const probe = '<div class="dark:flex animate-in @container @lg:flex"></div>'

const { css } = await postcss([
  tailwindcss({
    content: [{ raw: probe, extension: 'html' }],
    presets: config.presets,
  }),
]).process('@tailwind utilities;', { from: undefined })

const checks = [
  [
    'dark: variant is keyed off [data-mode="dark"]',
    css.includes('.dark\\:flex:where([data-mode="dark"]'),
  ],
  ['tailwindcss-animate is loaded', css.includes('.animate-in')],
  [
    '@tailwindcss/container-queries is loaded',
    css.includes('.\\@container') && css.includes('.\\@lg\\:flex'),
  ],
]

let failures = 0
for (const [label, pass] of checks) {
  if (!pass) {
    failures++
  }
  console.log(`  [${pass ? 'PASS' : 'FAIL'}] ${label}`)
}

if (failures > 0) {
  console.error(
    `\n✗ ${failures} preset check(s) failed — themePreset is not reaching Tailwind.`,
  )
  process.exit(1)
}

console.log('\n✓ themePreset applies its dark-mode selector and its plugins.')
