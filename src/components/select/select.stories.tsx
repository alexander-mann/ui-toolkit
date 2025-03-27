import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Select, SelectVariant } from '..'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    variant: {
      description: 'Variant of select',
      options: Object.values(SelectVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: SelectVariant.default },
      },
      control: 'select',
    },
    label: {
      description: 'The label to display',
      control: 'text',
    },
    name: {
      description: 'The name attribute for the select element',
      control: 'text',
    },
    id: {
      description: 'The id to use for the select element',
      control: 'text',
    },
    hasError: {
      description: 'Whether the select has an error',
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
      description: 'Whether the select is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const BasicUsage: Story = {
  args: {
    label: 'Select a Country',
    name: 'country',
    id: 'country-select',
    hasError: false,
    errorMessage: 'Please select a country',
    disabled: false,
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'Australia', value: 'au' },
      { label: 'Japan', value: 'jp' },
    ],
  },
  render: (props) => (
    <div className="w-[300px]">
      <Select {...props} />
    </div>
  ),
}
