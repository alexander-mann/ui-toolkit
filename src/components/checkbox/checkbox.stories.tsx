import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox, CheckboxVariant } from '..'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      description: 'Variant of checkbox',
      options: Object.values(CheckboxVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: CheckboxVariant.default },
      },
      control: 'select',
    },
    label: {
      description: 'The label to display',
      control: 'text',
    },
    id: {
      description: 'The id to use for the checkbox',
      control: 'text',
    },
    hasError: {
      description: 'Whether the checkbox has an error',
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
      description: 'Whether the checkbox is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const BasicUsage: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    id: 'terms',
    hasError: false,
    errorMessage: 'You must accept the terms to continue.',
  },
  render: (props) => (
    <div className="w-[300px]">
      <Checkbox {...props} />
    </div>
  ),
}
