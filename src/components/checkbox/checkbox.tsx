import React, { InputHTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const CheckboxVariant = {
  default: 'default',
  lg: 'lg',
}

const checkboxVariants = cva('flex flex-col gap-1', {
  variants: {
    variant: {
      [CheckboxVariant.default]: '[&_label]:text-sm [&_input]:size-4',
      [CheckboxVariant.lg]: '[&_label]:text-md [&_input]:size-5',
    },
  },
  defaultVariants: {
    variant: CheckboxVariant.default,
  },
})

interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariants> {
  label: string
  id: string
  hasError?: boolean
  errorMessage?: string
  required?: boolean
}

const Checkbox = ({
  variant,
  label,
  id,
  hasError,
  errorMessage,
  required,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <div className={cn(checkboxVariants({ variant }))}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          required={required}
          className={cn(
            'rounded border accent-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50',
            hasError && 'border-destructive',
            className,
          )}
          {...props}
        />
        <label htmlFor={id}>
          {label}
          {required && <span className="text-primary">*</span>}
        </label>
      </div>
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  )
}

export { Checkbox }
