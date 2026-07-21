import React, { LabelHTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const LabelVariant = {
  default: 'default',
  lg: 'lg',
}

const labelVariants = cva('font-medium', {
  variants: {
    variant: {
      [LabelVariant.default]: 'text-sm',
      [LabelVariant.lg]: 'text-md',
    },
  },
  defaultVariants: {
    variant: LabelVariant.default,
  },
})

interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean
}

const Label = ({
  variant,
  required,
  children,
  className,
  ...props
}: LabelProps) => {
  return (
    <label className={cn(labelVariants({ variant, className }))} {...props}>
      {children}
      {required && <span className="text-primary">*</span>}
    </label>
  )
}

export { Label }
