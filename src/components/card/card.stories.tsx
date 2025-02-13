import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

export const BasicUsage: Story = {
  render: () => (
    <Card>
      <p>Card content</p>
    </Card>
  ),
}
