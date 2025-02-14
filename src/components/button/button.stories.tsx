import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Lightbulb } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from './button'

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
        defaultValue: { summary: ButtonVariant.default },
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

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="default" size="sm">
        Small
      </Button>
      <Button variant="default">Default</Button>
      <Button variant="default" disabled>
        Disabled
      </Button>
      <Button variant="default" size="lg">
        Large
      </Button>
      <Button variant="default" size="icon">
        <Lightbulb className="size-5" />
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
      <Button variant="secondary" size="icon">
        <Lightbulb className="size-5" />
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
      <Button variant="outline" size="icon">
        <Lightbulb className="size-5" />
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
      <Button variant="destructive" size="icon">
        <Lightbulb className="size-5" />
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
      <Button variant="success" size="icon">
        <Lightbulb className="size-5" />
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
      <Button variant="accent" size="icon">
        <Lightbulb className="size-5" />
      </Button>
    </div>
  ),
}

export const Ghost: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm">
        Small
      </Button>
      <Button variant="ghost">Default</Button>
      <Button variant="ghost" disabled>
        Disabled
      </Button>
      <Button variant="ghost" size="lg">
        Large
      </Button>
      <Button variant="ghost" size="icon">
        <Lightbulb className="size-5" />
      </Button>
    </div>
  ),
}
