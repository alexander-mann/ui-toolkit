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
  render: (props) => {
    const [rows, setRows] = React.useState<(string | React.ReactNode)[][]>([])

    React.useEffect(() => {
      if (props.defaultSort && props.rows) {
        handleSort(props.defaultSort.label, props.defaultSort.direction)
      } else {
        setRows(props.rows || [])
      }
    }, [props.rows, props.defaultSort])

    const handleSort = (label: string, direction: SortDirection) => {
      const columnIndex =
        props.headers?.findIndex((header) => header.label === label) ?? 0

      const sortedRows = [...(props.rows || [])].sort((a, b) => {
        const aValue = String(a[columnIndex])
        const bValue = String(b[columnIndex])

        return direction === SortDirection.Asc
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      })

      setRows(sortedRows as (string | React.ReactNode)[][])
    }

    return (
      <div className="w-[800px]">
        <Table {...props} rows={rows} onSort={handleSort} />
      </div>
    )
  },
}

export const LargeDataSet: Story = {
  args: {
    headers: [
      { label: 'Name', sortable: false },
      { label: 'Role', sortable: false },
      { label: 'Department', sortable: false },
      { label: 'Location', sortable: false },
    ],
    rows: Array.from({ length: 100 }, (_, index) => [
      `Employee ${index + 1}`,
      `Role ${index + 1}`,
      `Department ${index + 1}`,
      `Location ${index + 1}`,
    ]),
  },
  render: (props) => (
    <div
      className="w-[800px] h-[500px] overflow-y-auto"
      tabIndex={0}
      role="region"
      aria-labelledby="table-title"
    >
      <h2 id="table-title" className="sr-only">
        Scrollable Table Data
      </h2>
      <Table {...props} />
    </div>
  ),
}
