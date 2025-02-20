import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '..'
import { toast } from './toast'

const meta: Meta<typeof toast> = {
  title: 'Components/Toast',
}

export default meta

type Story = StoryObj<typeof toast>

export const BasicUsage: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        onClick={() => {
          toast.info('This is an info message')
        }}
      >
        Info Toast
      </Button>
      <Button
        onClick={() => {
          toast.success('This is a success message')
        }}
      >
        Success Toast
      </Button>
      <Button
        onClick={() => {
          toast.warning('This is a warning message')
        }}
      >
        Warning Toast
      </Button>
      <Button
        onClick={() => {
          toast.error('This is an error message')
        }}
      >
        Error Toast
      </Button>
    </div>
  ),
}
