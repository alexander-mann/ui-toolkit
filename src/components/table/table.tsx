import React, { useState } from 'react'

import { cn } from '@utils'
import { ChevronDown } from 'lucide-react'

export enum SortDirection {
  Asc = 'ascending',
  Desc = 'descending',
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
  rows: (string | React.ReactNode)[][]
  defaultSort?: DefaultSort
  onSort?: (label: string, direction: SortDirection) => void
}

const Table = ({ caption, headers, rows, defaultSort, onSort }: TableProps) => {
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
      <thead className="sticky top-0">
        <tr className="bg-muted">
          {headers.map((header, index) => (
            <th
              key={header.label}
              className={cn(
                'text-left p-3 font-medium',
                index === 0 && 'pl-4',
                index === headers.length - 1 && 'pr-4',
              )}
              aria-sort={
                sortedColumn === headers[index].label
                  ? sortDirection
                  : undefined
              }
            >
              {header.sortable ? (
                <button
                  className="flex items-center gap-2 hover:opacity-50"
                  onClick={() => {
                    setSortedColumn(header.label)
                    const updatedSortDirection =
                      sortDirection === SortDirection.Desc &&
                      header.label === sortedColumn
                        ? SortDirection.Asc
                        : SortDirection.Desc
                    setSortDirection(updatedSortDirection)
                    onSort?.(header.label, updatedSortDirection)
                  }}
                >
                  {header.label}
                  {sortedColumn === header.label ? (
                    <ChevronDown
                      aria-hidden={true}
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
      <tbody className="max-h-[500px] overflow-y-auto">
        {rows.map((row, index) => (
          <tr key={index} className={cn(index % 2 !== 0 && 'bg-muted/50')}>
            {row.map((cell, index) => (
              <td
                key={`${cell}-${index}`}
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
