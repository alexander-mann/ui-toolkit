import containerQueries from '@tailwindcss/container-queries'
import animatePlugin from 'tailwindcss-animate'

export default {
  darkMode: ['[data-mode="dark"]'],
  plugins: [animatePlugin, containerQueries],
}
