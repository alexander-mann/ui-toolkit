import React, { InputHTMLAttributes } from 'react'

import { Label } from '@components/label'
import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const SwitchVariant = {
  default: 'default',
  lg: 'lg',
}

export const switchVariants = cva('flex flex-col gap-1', {
  variants: {
    variant: {
      [SwitchVariant.default]: '[&_label]:text-sm',
      [SwitchVariant.lg]: '[&_label]:text-base',
    },
  },
  defaultVariants: {
    variant: SwitchVariant.default,
  },
})

interface SwitchProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof switchVariants> {
  label: string
  id: string
  hasError?: boolean
  errorMessage?: string
  required?: boolean
}

const Switch = ({
  variant,
  label,
  id,
  hasError,
  errorMessage,
  required,
  className,
  disabled,
  ...props
}: SwitchProps) => {
  return (
    <div className={cn(switchVariants({ variant }))}>
      <Label
        htmlFor={id}
        required={required}
        className={cn(
          'flex items-center gap-2',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        )}
      >
        <span className="relative inline-flex shrink-0">
          <input
            type="checkbox"
            id={id}
            required={required}
            disabled={disabled}
            className={cn('peer sr-only', className)}
            {...props}
          />
          <span className="h-6 w-11 rounded-full border border-border bg-muted transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2" />
          <span className="absolute left-0.5 top-0.5 size-5 rounded-full border border-border bg-background transition-transform peer-checked:translate-x-5" />
        </span>
        <span>{label}</span>
      </Label>
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  )
}

export { Switch }
