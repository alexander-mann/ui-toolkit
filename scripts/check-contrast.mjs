import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * WCAG 2.1 AA color-contrast gate.
 *
 * Parses the theme tokens straight out of `src/styles/palette.ts` and
 * `src/styles/theme.ts` (so it can never drift from the real values) and
 * verifies every foreground/background pairing the components render meets:
 *   - normal text            4.5:1  (WCAG 1.4.3)
 *   - UI components / icons  3.0:1  (WCAG 1.4.11 non-text contrast)
 *
 * Run with `pnpm contrast`. Exits non-zero on any failure so it can gate CI.
 * No dependencies — plain Node so it runs anywhere without a TS loader.
 */

const here = dirname(fileURLToPath(import.meta.url))
const stylesDir = resolve(here, '../src/styles')

// --- Parse palette.ts into { colorName: hex | { shade: hex } } ---
const parsePalette = () => {
  const src = readFileSync(resolve(stylesDir, 'palette.ts'), 'utf8')
  const palette = {}
  let group = null
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    const flat = line.match(/^(\w+):\s*'(#[0-9A-Fa-f]{6})'/)
    const openGroup = line.match(/^(\w+):\s*\{$/)
    const shade = line.match(/^(\d+):\s*'(#[0-9A-Fa-f]{6})'/)
    if (openGroup) {
      group = openGroup[1]
      palette[group] = {}
    } else if (shade && group) {
      palette[group][shade[1]] = shade[2]
    } else if (flat && !group) {
      palette[flat[1]] = flat[2]
    } else if (line === '},') {
      group = null
    }
  }
  return palette
}

// --- Parse theme.ts into { light: { token: hex }, dark: { token: hex } } ---
const parseTheme = (palette) => {
  const src = readFileSync(resolve(stylesDir, 'theme.ts'), 'utf8')
  const theme = { light: {}, dark: {} }
  let mode = null
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    const openMode = line.match(/^(light|dark):\s*\{$/)
    if (openMode) {
      mode = openMode[1]
      continue
    }
    if (!mode) {
      continue
    }
    const ref = line.match(/^(\w+):\s*palette\.(\w+)(?:\[(\d+)\])?/)
    if (ref) {
      const [, token, color, shadeNum] = ref
      const hex = shadeNum ? palette[color]?.[shadeNum] : palette[color]
      if (!hex) {
        throw new Error(
          `Could not resolve palette.${color}${shadeNum ? `[${shadeNum}]` : ''} for ${mode}.${token}`,
        )
      }
      theme[mode][token] = hex
    } else if (line === '},') {
      mode = null
    }
  }
  return theme
}

const relativeLuminance = (hex) => {
  const h = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

const contrast = (fg, bg) => {
  const l1 = relativeLuminance(fg)
  const l2 = relativeLuminance(bg)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

const TEXT = 4.5
const NON_TEXT = 3.0

// Every pairing the components actually render. Keep in sync with usage.
const checks = [
  // Semantic foreground-on-fill text pairings (normal text)
  ['foreground / background', 'foreground', 'background', TEXT],
  // Toast text and Table header/zebra set no text color, so they inherit
  // `foreground` on `muted` — no *Foreground token marks the pairing.
  ['foreground / muted', 'foreground', 'muted', TEXT],
  ['primaryForeground / primary', 'primaryForeground', 'primary', TEXT],
  ['secondaryForeground / secondary', 'secondaryForeground', 'secondary', TEXT],
  ['mutedForeground / muted', 'mutedForeground', 'muted', TEXT],
  ['mutedForeground / background', 'mutedForeground', 'background', TEXT],
  ['cardForeground / card', 'cardForeground', 'card', TEXT],
  ['accentForeground / accent', 'accentForeground', 'accent', TEXT],
  ['destructiveForeground / destructive', 'destructiveForeground', 'destructive', TEXT], // prettier-ignore
  ['successForeground / success', 'successForeground', 'success', TEXT],
  ['warningForeground / warning', 'warningForeground', 'warning', TEXT],
  ['infoForeground / info', 'infoForeground', 'info', TEXT],

  // Colored text on surfaces (error messages, required markers) — normal text
  ['text-destructive / background', 'destructive', 'background', TEXT],
  ['text-destructive / card', 'destructive', 'card', TEXT],
  ['text-primary / background', 'primary', 'background', TEXT],

  // Non-text: input/error borders and status icons on surfaces
  ['border / background', 'border', 'background', NON_TEXT],
  ['success icon+border / muted (toast)', 'success', 'muted', NON_TEXT],
  ['destructive icon+border / muted (toast)', 'destructive', 'muted', NON_TEXT],
  ['info icon+border / muted (toast)', 'info', 'muted', NON_TEXT],
  ['warning icon+border / muted (toast)', 'warning', 'muted', NON_TEXT],
  // Switch: thumb outline (border) vs the off-track (muted), and the thumb
  // fill (background) vs the on-track (primary) — both must stay distinct.
  ['switch thumb border / off-track', 'border', 'muted', NON_TEXT],
  ['switch thumb fill / on-track', 'background', 'primary', NON_TEXT],
]

const palette = parsePalette()
const theme = parseTheme(palette)
let failures = 0

for (const mode of ['light', 'dark']) {
  console.log(`\n${mode.toUpperCase()}`)
  for (const [label, fg, bg, min] of checks) {
    const fgHex = theme[mode][fg]
    const bgHex = theme[mode][bg]
    if (!fgHex || !bgHex) {
      throw new Error(`Missing token in ${mode}: ${fg} or ${bg}`)
    }
    const ratio = contrast(fgHex, bgHex)
    const pass = ratio >= min
    if (!pass) {
      failures++
    }
    console.log(
      `  [${pass ? 'PASS' : 'FAIL'}] ${ratio.toFixed(2)}:1 (need ${min.toFixed(1)})  ${label}`,
    )
  }
}

if (failures > 0) {
  console.error(`\n✗ ${failures} contrast check(s) failed WCAG AA.`)
  process.exit(1)
}

console.log('\n✓ All pairings meet WCAG AA.')
