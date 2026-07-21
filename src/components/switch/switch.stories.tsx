import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Switch, SwitchVariant } from '..'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    variant: {
      description: 'Variant of switch',
      options: Object.values(SwitchVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: SwitchVariant.default },
      },
      control: 'select',
    },
    label: {
      description: 'The label to display',
      control: 'text',
    },
    id: {
      description: 'The id to use for the switch',
      control: 'text',
    },
    hasError: {
      description: 'Whether the switch has an error',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    errorMessage: {
      description: 'The error message to display',
      control: 'text',
    },
    disabled: {
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const BasicUsage: Story = {
  args: {
    label: 'Enable notifications',
    id: 'notifications',
    hasError: false,
    disabled: false,
  },
  render: (props) => (
    <div className="w-[300px]">
      <Switch {...props} />
    </div>
  ),
}
