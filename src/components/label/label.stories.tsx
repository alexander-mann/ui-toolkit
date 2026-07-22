import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Label, LabelVariant } from '..'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  argTypes: {
    variant: {
      description: 'Variant of label',
      options: Object.values(LabelVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: LabelVariant.default },
      },
      control: 'select',
    },
    htmlFor: {
      description: 'The id of the form control this label is bound to',
      control: 'text',
    },
    required: {
      description: 'Whether to show a required indicator',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    children: {
      description: 'The label content',
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const BasicUsage: Story = {
  args: {
    htmlFor: 'email',
    required: true,
    children: 'Email address',
  },
  render: (props) => <Label {...props} />,
}
