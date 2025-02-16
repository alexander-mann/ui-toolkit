import React from 'react'

import { cn } from '@utils'

interface TableProps {
  caption?: string
  headers: string[]
  rows: string[][]
}

const Table = ({ caption, headers, rows }: TableProps) => {
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
              key={header}
              className={cn(
                'text-left p-3 font-medium',
                index === 0 && 'pl-4',
                index === headers.length - 1 && 'pr-4',
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
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
