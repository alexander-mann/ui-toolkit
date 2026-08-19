import React, { InputHTMLAttributes } from 'react'

import { Label } from '@components/label'
import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const InputVariant = {
  default: 'default',
  lg: 'lg',
}

export const inputVariants = cva('flex flex-col gap-1', {
  variants: {
    variant: {
      [InputVariant.default]: '[&>label]:text-sm [&>input]:text-sm',
      [InputVariant.lg]: '[&>label]:text-base [&>input]:text-base',
    },
  },
  defaultVariants: {
    variant: InputVariant.default,
  },
})

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string
  id: string
  hasError?: boolean
  required?: boolean
  errorMessage?: string
}

const Input = ({
  variant,
  label,
  id,
  hasError,
  errorMessage,
  required,
  ...props
}: InputProps) => {
  return (
    <div className={cn(inputVariants({ variant }))}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        className={cn(
          'w-full rounded-md border px-3 py-2 bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 read-only:cursor-not-allowed read-only:opacity-75',
          hasError && 'border-destructive',
        )}
        required={required}
        {...props}
      />
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  )
}

export { Input }
