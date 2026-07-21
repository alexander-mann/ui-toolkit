import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { FormField, FormFieldVariant } from '..'

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  argTypes: {
    variant: {
      description: 'Variant of form field',
      options: Object.values(FormFieldVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: FormFieldVariant.default },
      },
      control: 'select',
    },
    label: {
      description: 'The label to display',
      control: 'text',
    },
    htmlFor: {
      description: 'The id of the control this field wraps',
      control: 'text',
    },
    hasError: {
      description: 'Whether the field has an error',
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

type Story = StoryObj<typeof FormField>

export const BasicUsage: Story = {
  args: {
    label: 'Username',
    htmlFor: 'username',
    required: true,
    hasError: false,
    errorMessage: 'Username is already taken.',
  },
  render: (props) => (
    <div className="w-[300px]">
      <FormField {...props}>
        <input
          id="username"
          className="w-full rounded-md border bg-foreground/10 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Choose a username"
        />
      </FormField>
    </div>
  ),
}
