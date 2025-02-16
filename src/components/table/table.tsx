import React, { useState } from 'react'

import { cn } from '@utils'
import { ChevronDown } from 'lucide-react'

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

interface TableHeader {
  label: string
  sortable?: boolean
}

interface DefaultSort {
  label: string
  direction: SortDirection
}

interface TableProps {
  caption?: string
  headers: TableHeader[]
  rows: string[][]
  defaultSort?: DefaultSort
}

const Table = ({ caption, headers, rows, defaultSort }: TableProps) => {
  const [sortedColumn, setSortedColumn] = useState(
    defaultSort?.label || headers[0].label,
  )
  const [sortDirection, setSortDirection] = useState(
    defaultSort?.direction || SortDirection.Desc,
  )
  return (
    <table className="table-auto w-full mx-auto">
      {caption && (
        <caption className="text-lg font-medium text-left mb-2">
          {caption}
        </caption>
      )}
      <thead>
        <tr className="bg-muted">
          {headers.map((header, index) => (
            <th
              key={header.label}
              className={cn(
                'text-left p-3 font-medium',
                index === 0 && 'pl-4',
                index === headers.length - 1 && 'pr-4',
              )}
            >
              {header.sortable ? (
                <button
                  className="flex items-center gap-2 hover:opacity-50"
                  onClick={() => {
                    setSortedColumn(header.label)
                    setSortDirection(
                      sortDirection === SortDirection.Desc &&
                        header.label === sortedColumn
                        ? SortDirection.Asc
                        : SortDirection.Desc,
                    )
                  }}
                >
                  {header.label}
                  {sortedColumn === header.label ? (
                    <ChevronDown
                      className={cn(
                        'size-4',
                        sortDirection === SortDirection.Asc && 'rotate-180',
                      )}
                    />
                  ) : (
                    <span className="size-4" />
                  )}
                </button>
              ) : (
                header.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows
          .sort((a, b) => {
            const index = headers.findIndex(
              (header) => header.label === sortedColumn,
            )
            return sortDirection === SortDirection.Asc
              ? a[index].localeCompare(b[index])
              : b[index].localeCompare(a[index])
          })
          .map((row, index) => (
            <tr key={index} className={cn(index % 2 !== 0 && 'bg-muted/50')}>
              {row.map((cell, index) => (
                <td
                  key={cell}
                  className={cn(
                    'p-3',
                    index === 0 && 'pl-4',
                    index === row.length - 1 && 'pr-4',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export { Table }
