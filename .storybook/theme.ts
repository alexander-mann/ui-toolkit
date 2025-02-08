import { create } from '@storybook/theming/create'

// @ts-ignore
import logo from './logo.svg'

export const theme = create({
  base: 'dark',
  brandTitle: 'UI Toolkit',
  brandUrl: 'https://github.com/alexander-mann/ui-toolkit',
  brandImage: logo,
  brandTarget: '_blank',
})
