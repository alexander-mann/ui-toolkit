import React, { HTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const CardVariant = {
  default: 'default',
  outline: 'outline',
}

const cardVariants = cva('rounded-lg p-4 border-2 border-card', {
  variants: {
    variant: {
      [CardVariant.default]: 'bg-card text-card-foreground',
      [CardVariant.outline]: '',
    },
  },
  defaultVariants: {
    variant: CardVariant.default,
  },
})

export const Card = ({
  variant,
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) => {
  return (
    <div className={cn(cardVariants({ variant, className }))} {...props}>
      {children}
    </div>
  )
}
