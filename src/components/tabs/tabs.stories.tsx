import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from '..'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    data: {
      description: 'Array of tab data',
      table: {
        type: { summary: 'Array<{ label: string; content: React.ReactNode }>' },
      },
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const BasicUsage: Story = {
  args: {
    data: [
      {
        label: 'Tab 1',
        content: (
          <div className="p-4">
            <h3 className="text-lg font-medium">First Tab Content</h3>
            <p className="mt-2">This is the content for the first tab.</p>
          </div>
        ),
      },
      {
        label: 'Tab 2',
        content: (
          <div className="p-4">
            <h3 className="text-lg font-medium">Second Tab Content</h3>
            <p className="mt-2">This is the content for the second tab.</p>
          </div>
        ),
      },
      {
        label: 'Tab 3',
        content: (
          <div className="p-4">
            <h3 className="text-lg font-medium">Third Tab Content</h3>
            <p className="mt-2">This is the content for the third tab.</p>
          </div>
        ),
      },
    ],
  },
  render: (props) => (
    <div className="w-96">
      <Tabs {...props} />
    </div>
  ),
}
