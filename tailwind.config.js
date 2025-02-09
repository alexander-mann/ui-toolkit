import { baseTheme, themePlugin, themePreset } from './src/styles'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [themePreset],
  plugins: [themePlugin(baseTheme)],
}
