import React, { HTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const FormFieldVariant = {
  default: 'default',
  lg: 'lg',
}

const formFieldVariants = cva('flex flex-col gap-1', {
  variants: {
    variant: {
      [FormFieldVariant.default]: '[&>label]:text-sm',
      [FormFieldVariant.lg]: '[&>label]:text-md',
    },
  },
  defaultVariants: {
    variant: FormFieldVariant.default,
  },
})

interface FormFieldProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label: string
  htmlFor: string
  hasError?: boolean
  errorMessage?: string
  required?: boolean
}

const FormField = ({
  variant,
  label,
  htmlFor,
  hasError,
  errorMessage,
  required,
  children,
  className,
  ...props
}: FormFieldProps) => {
  return (
    <div className={cn(formFieldVariants({ variant, className }))} {...props}>
      <label htmlFor={htmlFor} className="font-medium">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      {children}
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  )
}

export { FormField }
