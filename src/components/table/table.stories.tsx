import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { SortDirection, Table } from '..'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

export const BasicUsage: Story = {
  args: {
    headers: [
      { label: 'Name', sortable: false },
      { label: 'Role', sortable: false },
      { label: 'Department', sortable: false },
      { label: 'Location', sortable: false },
    ],
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

export const Sortable: Story = {
  args: {
    ...BasicUsage.args,
    headers: [
      { label: 'Name', sortable: true },
      { label: 'Role', sortable: true },
      { label: 'Department', sortable: true },
      { label: 'Location', sortable: true },
    ],
    defaultSort: { label: 'Name', direction: SortDirection.Desc },
  },
  render: (props) => (
    <div className="w-[800px]">
      <Table {...props} />
    </div>
  ),
}
