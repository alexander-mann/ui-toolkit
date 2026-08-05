import React, { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Info } from 'lucide-react'

import { Button } from '../button'
import { Tooltip, TooltipPosition, TooltipVariant } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      description: 'Tooltip content',
      table: {
        type: { summary: 'ReactNode' },
      },
      control: 'text',
    },
    position: {
      description: 'Position relative to trigger',
      options: Object.values(TooltipPosition),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
      },
      control: 'select',
    },
    variant: {
      description: 'Visual variant',
      options: Object.values(TooltipVariant),
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: 'select',
    },
    delay: {
      description: 'Delay in ms before showing',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
      control: 'number',
    },
    arrow: {
      description: 'Show arrow pointing to trigger',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
    usePortal: {
      description: 'Render via portal to document.body',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const BasicUsage: Story = {
  args: {
    content: 'Helpful tip',
  },
  render: (props) => (
    <div className="flex items-center justify-center p-20">
      <Tooltip {...props}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8 p-20">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const LightVariant: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8 p-20">
      <Tooltip content="Light tooltip" variant="light" position="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light" position="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light" position="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light" position="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const NoArrow: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="No arrow" arrow={false}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="flex items-center justify-center gap-4 p-20">
        <Button
          onClick={() => {
            setIsOpen(!isOpen)
          }}
          variant="outline"
        >
          {isOpen ? 'Hide' : 'Show'} tooltip
        </Button>
        <Tooltip
          content="Controlled tooltip"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <Button>Target</Button>
        </Tooltip>
      </div>
    )
  },
}

export const OnIcon: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <Tooltip content="More information">
        <span tabIndex={0} className="cursor-pointer">
          <Info className="size-5" />
        </span>
      </Tooltip>
    </div>
  ),
}
