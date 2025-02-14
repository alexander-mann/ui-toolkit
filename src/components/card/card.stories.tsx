import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Card, CardVariant } from '.'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      description: 'Variant of card',
      options: Object.values(CardVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: CardVariant.default },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const BasicUsage: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl font-bold">Total Value</h2>
      <Card {...args}>
        <p className="text-2xl font-semibold">$10,000</p>
      </Card>
    </div>
  ),
}

export const Outline: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-2">
      <h2 className="text-xl font-bold">Total Value</h2>
      <Card variant="outline">
        <p className="text-2xl font-semibold">$10,000</p>
      </Card>
    </div>
  ),
}
