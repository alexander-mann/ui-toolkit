import React, { SelectHTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const SelectVariant = {
  default: 'default',
  lg: 'lg',
}

const selectVariants = cva('flex flex-col gap-1', {
  variants: {
    variant: {
      [SelectVariant.default]: '[&>label]:text-sm [&>select]:text-sm',
      [SelectVariant.lg]: '[&>label]:text-md [&>select]:text-md',
    },
  },
  defaultVariants: {
    variant: SelectVariant.default,
  },
})

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  label: string
  id: string
  name: string
  hasError?: boolean
  errorMessage?: string
  options: { label: string; value: string }[]
  required?: boolean
}

const Select = ({
  label,
  id,
  name,
  hasError,
  errorMessage,
  options,
  variant,
  required,
  ...props
}: SelectProps) => {
  return (
    <div className={cn(selectVariants({ variant }))}>
      <label htmlFor={id}>
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        className={cn(
          'w-full rounded-md border px-3 py-2 bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 appearance-none',
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
