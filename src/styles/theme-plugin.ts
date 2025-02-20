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
          '--card': theme.light.card,
          '--card-foreground': theme.light.cardForeground,
          '--accent': theme.light.accent,
          '--accent-foreground': theme.light.accentForeground,
          '--destructive': theme.light.destructive,
          '--destructive-foreground': theme.light.destructiveForeground,
          '--border': theme.light.border,
          '--success': theme.light.success,
          '--success-foreground': theme.light.successForeground,
          '--warning': theme.light.warning,
          '--warning-foreground': theme.light.warningForeground,
          '--info': theme.light.info,
          '--info-foreground': theme.light.infoForeground,
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
          '--card': theme.dark.card,
          '--card-foreground': theme.dark.cardForeground,
          '--accent': theme.dark.accent,
          '--accent-foreground': theme.dark.accentForeground,
          '--destructive': theme.dark.destructive,
          '--destructive-foreground': theme.dark.destructiveForeground,
          '--border': theme.dark.border,
          '--success': theme.dark.success,
          '--success-foreground': theme.dark.successForeground,
          '--warning': theme.dark.warning,
          '--warning-foreground': theme.dark.warningForeground,
          '--info': theme.dark.info,
          '--info-foreground': theme.dark.infoForeground,
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
            card: {
              DEFAULT: colorMix('card'),
              foreground: colorMix('card-foreground'),
            },
            accent: {
              DEFAULT: colorMix('accent'),
              foreground: colorMix('accent-foreground'),
            },
            success: {
              DEFAULT: colorMix('success'),
              foreground: colorMix('success-foreground'),
            },
            warning: {
              DEFAULT: colorMix('warning'),
              foreground: colorMix('warning-foreground'),
            },
            info: {
              DEFAULT: colorMix('info'),
              foreground: colorMix('info-foreground'),
            },
          },
          keyframes: {
            'toast-in': {
              '0%': { transform: 'translateY(100%)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
          },
          animation: {
            'toast-in': 'toast-in 0.3s ease-out forwards',
          },
        },
      },
    },
  )
