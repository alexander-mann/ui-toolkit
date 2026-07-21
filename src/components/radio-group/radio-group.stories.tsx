import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioGroupVariant } from '..'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    variant: {
      description: 'Variant of radio group',
      options: Object.values(RadioGroupVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: RadioGroupVariant.default },
      },
      control: 'select',
    },
    label: {
      description: 'The label to display for the group',
      control: 'text',
    },
    name: {
      description: 'The name attribute shared by the radio inputs',
      control: 'text',
    },
    hasError: {
      description: 'Whether the radio group has an error',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    errorMessage: {
      description: 'The error message to display',
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const BasicUsage: Story = {
  args: {
    label: 'Preferred contact method',
    name: 'contact',
    hasError: false,
    errorMessage: 'Please choose a contact method.',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Text message', value: 'sms' },
    ],
  },
  render: (props) => (
    <div className="w-[300px]">
      <RadioGroup {...props} />
    </div>
  ),
}
