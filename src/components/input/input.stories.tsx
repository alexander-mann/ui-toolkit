import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '..'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: {
      description: 'The label to display',
      control: 'text',
    },
    id: {
      description: 'The id to use for the input',
      control: 'text',
    },
    placeholder: {
      description: 'The placeholder to display',
      control: 'text',
    },
    hasError: {
      description: 'Whether the input has an error',
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
      description: 'Whether the input is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    readOnly: {
      description: 'Whether the input is read only',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const BasicUsage: Story = {
  args: {
    label: 'Email address',
    id: 'email',
    placeholder: 'example@example.com',
    errorMessage: 'Please enter a valid email address.',
  },
  render: (props) => (
    <div className="w-[300px]">
      <Input {...props} />
    </div>
  ),
}
