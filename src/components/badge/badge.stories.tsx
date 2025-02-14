import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { PawPrint } from 'lucide-react'

import { Badge, BadgeSize, BadgeVariant } from '..'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      description: 'Variant of badge',
      options: Object.values(BadgeVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: BadgeVariant.default },
      },
      control: 'select',
    },
    size: {
      description: 'Size of badge',
      options: Object.values(BadgeSize),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: BadgeSize.default },
      },
      control: 'select',
    },
    children: {
      description: 'The content to display inside the badge',
      table: {
        type: { summary: 'string | ReactNode' },
      },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const BasicUsage: Story = {
  args: {
    children: 'Label',
  },
  render: (props) => <Badge {...props} />,
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(BadgeVariant).map((variant) => (
        <div key={variant} className="flex flex-col gap-2 items-center">
          <Badge variant={variant}>
            <PawPrint /> Label
          </Badge>
          <Badge variant={variant} size={BadgeSize.lg}>
            <PawPrint /> Label
          </Badge>
        </div>
      ))}
    </div>
  ),
}
