import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Table } from '..'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

export const BasicUsage: Story = {
  args: {
    headers: ['Name', 'Role', 'Department', 'Location'],
    rows: [
      ['John Doe', 'Senior Developer', 'Engineering', 'New York'],
      ['Jane Smith', 'Product Manager', 'Product', 'San Francisco'],
      ['Mike Johnson', 'UX Designer', 'Design', 'London'],
      ['Sarah Williams', 'Data Analyst', 'Analytics', 'Toronto'],
    ],
    caption: 'Employee Table',
  },
  render: (props) => (
    <div className="w-[800px]">
      <Table {...props} />
    </div>
  ),
}
