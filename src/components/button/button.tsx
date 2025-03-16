import React, { ButtonHTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const ButtonVariant = {
  default: 'default',
  secondary: 'secondary',
  outline: 'outline',
  destructive: 'destructive',
  success: 'success',
  accent: 'accent',
  ghost: 'ghost',
}

export const ButtonSize = {
  sm: 'sm',
  default: 'default',
  lg: 'lg',
  icon: 'icon',
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit w-fit',
  {
    variants: {
      variant: {
        [ButtonVariant.default]:
          'bg-primary text-primary-foreground hover:bg-primary/80',
        [ButtonVariant.secondary]:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        [ButtonVariant.outline]:
          'bg-transparent border border-primary text-primary hover:bg-primary/10',
        [ButtonVariant.destructive]:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        [ButtonVariant.success]:
          'bg-success text-success-foreground hover:bg-success/80',
        [ButtonVariant.accent]:
          'bg-accent text-accent-foreground hover:bg-accent/80',
        [ButtonVariant.ghost]: 'hover:bg-primary/10',
      },
      size: {
        [ButtonSize.sm]: 'px-3 py-2 text-xs',
        [ButtonSize.default]: 'px-4 py-3',
        [ButtonSize.lg]: 'px-8 py-3 text-lg',
        [ButtonSize.icon]: 'p-1.5 rounded-full',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.default,
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
