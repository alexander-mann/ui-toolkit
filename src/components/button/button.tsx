import React, { ButtonHTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const ButtonVariant = {
  primary: 'primary',
  secondary: 'secondary',
  destructive: 'destructive',
  success: 'success',
  brand: 'brand',
}

export const ButtonSize = {
  sm: 'sm',
  default: 'default',
  lg: 'lg',
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        [ButtonVariant.primary]: 'bg-primary text-primary-foreground',
        [ButtonVariant.secondary]: 'bg-secondary text-secondary-foreground',
        [ButtonVariant.destructive]:
          'bg-destructive text-destructive-foreground',
        [ButtonVariant.success]: 'bg-success text-success-foreground',
        [ButtonVariant.brand]: 'bg-brand text-brand-foreground',
      },
      size: {
        [ButtonSize.sm]: 'h-9 px-4 py-2',
        [ButtonSize.default]: 'h-10 px-4 py-2',
        [ButtonSize.lg]: 'h-11 px-8 py-3',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.primary,
      size: ButtonSize.default,
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
