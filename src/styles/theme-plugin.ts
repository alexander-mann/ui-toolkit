import plugin from 'tailwindcss/plugin'

import { Theme } from '../types'
import { colorMix } from '../utils'

export const themePlugin = (theme: Theme) =>
  plugin(
    ({ addBase }) => {
      // Add light theme
      addBase({
        ':root': {
          '--background': theme.light.background,
          '--foreground': theme.light.foreground,
          '--primary': theme.light.primary,
          '--primary-foreground': theme.light.primaryForeground,
          '--secondary': theme.light.secondary,
          '--secondary-foreground': theme.light.secondaryForeground,
          '--muted': theme.light.muted,
          '--muted-foreground': theme.light.mutedForeground,
          '--accent': theme.light.accent,
          '--accent-foreground': theme.light.accentForeground,
          '--destructive': theme.light.destructive,
          '--destructive-foreground': theme.light.destructiveForeground,
          '--border': theme.light.border,
          '--success': theme.light.success,
          '--success-foreground': theme.light.successForeground,
          '--brand': theme.light.brand,
          '--brand-foreground': theme.light.brandForeground,
        },
      })
      // Add dark theme
      addBase({
        '[data-mode="dark"]': {
          '--background': theme.dark.background,
          '--foreground': theme.dark.foreground,
          '--primary': theme.dark.primary,
          '--primary-foreground': theme.dark.primaryForeground,
          '--secondary': theme.dark.secondary,
          '--secondary-foreground': theme.dark.secondaryForeground,
          '--muted': theme.dark.muted,
          '--muted-foreground': theme.dark.mutedForeground,
          '--accent': theme.dark.accent,
          '--accent-foreground': theme.dark.accentForeground,
          '--destructive': theme.dark.destructive,
          '--destructive-foreground': theme.dark.destructiveForeground,
          '--border': theme.dark.border,
          '--success': theme.dark.success,
          '--success-foreground': theme.dark.successForeground,
          '--brand': theme.dark.brand,
          '--brand-foreground': theme.dark.brandForeground,
        },
      })
      // Add html base styles
      addBase({
        html: {
          color: 'var(--foreground)',
          backgroundColor: 'var(--background)',
        },
      })
    },
    // Add theme extension
    {
      theme: {
        extend: {
          borderColor: {
            DEFAULT: colorMix('border'),
          },
          colors: {
            border: colorMix('border'),
            background: colorMix('background'),
            foreground: colorMix('foreground'),
            primary: {
              DEFAULT: colorMix('primary'),
              foreground: colorMix('primary-foreground'),
            },
            secondary: {
              DEFAULT: colorMix('secondary'),
              foreground: colorMix('secondary-foreground'),
            },
            destructive: {
              DEFAULT: colorMix('destructive'),
              foreground: colorMix('destructive-foreground'),
            },
            muted: {
              DEFAULT: colorMix('muted'),
              foreground: colorMix('muted-foreground'),
            },
            accent: {
              DEFAULT: colorMix('accent'),
              foreground: colorMix('accent-foreground'),
            },
            brand: {
              DEFAULT: colorMix('brand'),
              foreground: colorMix('brand-foreground'),
            },
            success: {
              DEFAULT: colorMix('success'),
              foreground: colorMix('success-foreground'),
            },
          },
        },
      },
    },
  )
