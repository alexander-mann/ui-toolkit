import containerQueries from '@tailwindcss/container-queries'
import { Config } from 'tailwindcss'
import animatePlugin from 'tailwindcss-animate'

/**
 * Tailwind preset consumers register with `presets: [themePreset]`. Named
 * export on purpose: a default export can only reach the package barrel as
 * `export * as`, which hands consumers a namespace (`{ default: … }`) that
 * Tailwind accepts and silently applies none of.
 */
export const themePreset = {
  darkMode: ['selector', '[data-mode="dark"]'],
  plugins: [animatePlugin, containerQueries],
} satisfies Partial<Config>
