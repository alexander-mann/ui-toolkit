import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Divider, DividerOrientation } from '..'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      description: 'Orientation of divider',
      options: Object.values(DividerOrientation),
      table: {
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: DividerOrientation.Horizontal },
      },
      control: false,
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Divider>

export const BasicUsage: Story = {
  render: (args) => (
    <div className="w-[600px]">
      <p>Default divider</p>
      <Divider {...args} />
      <p>Content below</p>
    </div>
  ),
}

export const CustomSpacing: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[600px]">
      <p>With custom spacing</p>
      <Divider className="my-8" />
      <p>More content</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center">
      <span>Left</span>
      <Divider orientation="vertical" className="mx-4 h-6" />
      <span>Right</span>
    </div>
  ),
}
