import React, { InputHTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const RadioGroupVariant = {
  default: 'default',
  lg: 'lg',
}

const radioGroupVariants = cva('flex flex-col gap-2', {
  variants: {
    variant: {
      [RadioGroupVariant.default]: '[&_label]:text-sm [&_legend]:text-sm',
      [RadioGroupVariant.lg]: '[&_label]:text-md [&_legend]:text-md',
    },
  },
  defaultVariants: {
    variant: RadioGroupVariant.default,
  },
})

interface RadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof radioGroupVariants> {
  label: string
  name: string
  options: { label: string; value: string }[]
  hasError?: boolean
  errorMessage?: string
  required?: boolean
}

const RadioGroup = ({
  variant,
  label,
  name,
  options,
  hasError,
  errorMessage,
  required,
  className,
  ...props
}: RadioGroupProps) => {
  return (
    <fieldset className={cn(radioGroupVariants({ variant }))}>
      <legend className="mb-1 font-medium">
        {label}
        {required && <span className="text-primary">*</span>}
      </legend>
      {options.map((option) => {
        const optionId = `${name}-${option.value}`
        return (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              required={required}
              className={cn(
                'accent-primary focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50',
                hasError && 'border-destructive',
                className,
              )}
              {...props}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </div>
        )
      })}
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </fieldset>
  )
}

export { RadioGroup }
