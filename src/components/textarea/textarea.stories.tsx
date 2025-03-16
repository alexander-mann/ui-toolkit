import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from '..'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    label: {
      description: 'The label to display',
      control: 'text',
    },
    id: {
      description: 'The id to use for the textarea',
      control: 'text',
    },
    placeholder: {
      description: 'The placeholder to display',
      control: 'text',
    },
    hasError: {
      description: 'Whether the textarea has an error',
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
      description: 'Whether the textarea is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    readOnly: {
      description: 'Whether the textarea is read only',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const BasicUsage: Story = {
  args: {
    label: 'Textarea',
    id: 'textarea',
    name: 'textarea',
    placeholder: 'Enter your text here...',
    errorMessage: 'Please enter valid text.',
  },
  render: (props) => (
    <div className="w-[300px]">
      <Textarea {...props} />
    </div>
  ),
}
