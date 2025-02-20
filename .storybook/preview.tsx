import React from 'react'

import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react'

import { Toaster } from '../src/components/toast'

import './global.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Documentation', 'Styles', 'Components', 'Hooks', 'Utilities'],
      },
    },
  },
}

export const decorators = [
  function ToasterDecorator(Story) {
    return (
      <>
        <Toaster usePortal />
        <Story />
      </>
    )
  },
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
    attributeName: 'data-mode',
  }),
]

export default preview
