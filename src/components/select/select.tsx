import React from 'react'

import { cn } from '@utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  id: string
  name: string
  hasError?: boolean
  errorMessage?: string
  options: { label: string; value: string }[]
}

const Select = ({
  label,
  id,
  name,
  hasError,
  errorMessage,
  options,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 appearance-none',
          hasError && 'border-destructive',
        )}
        {...props}
      >
        <option value="">Select an option</option>
        <hr />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  )
}

export { Select }
