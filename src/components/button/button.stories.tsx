import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button, ButtonSize, ButtonVariant } from '.'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: {
      description: 'Button label',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    variant: {
      description: 'Variant of button',
      options: Object.values(ButtonVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ButtonVariant.primary },
      },
      control: 'select',
    },
    size: {
      description: 'Size of button',
      options: Object.values(ButtonSize),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ButtonSize.default },
      },
      control: 'select',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const BasicUsage: Story = {
  args: {
    children: 'Label',
  },
  render: (props) => <Button {...props} />,
}

export const Primary: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary">Default</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Secondary: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="secondary" size="sm">
        Small
      </Button>
      <Button variant="secondary">Default</Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="secondary" size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Outline: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm">
        Small
      </Button>
      <Button variant="outline">Default</Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button variant="outline" size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Destructive: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="destructive" size="sm">
        Small
      </Button>
      <Button variant="destructive">Default</Button>
      <Button variant="destructive" disabled>
        Disabled
      </Button>
      <Button variant="destructive" size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Success: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="success" size="sm">
        Small
      </Button>
      <Button variant="success">Default</Button>
      <Button variant="success" disabled>
        Disabled
      </Button>
      <Button variant="success" size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Accent: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="accent" size="sm">
        Small
      </Button>
      <Button variant="accent">Default</Button>
      <Button variant="accent" disabled>
        Disabled
      </Button>
      <Button variant="accent" size="lg">
        Large
      </Button>
    </div>
  ),
}
