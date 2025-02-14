import React from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const BadgeVariant = {
  default: 'default',
  secondary: 'secondary',
  outline: 'outline',
  destructive: 'destructive',
  success: 'success',
  accent: 'accent',
}

export const BadgeSize = {
  default: 'default',
  lg: 'lg',
}

const badgeVariants = cva(
  'inline-flex gap-1 items-center border w-fit rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        [BadgeVariant.default]:
          'bg-primary text-primary-foreground border-primary',
        [BadgeVariant.secondary]:
          'bg-secondary text-secondary-foreground border-secondary',
        [BadgeVariant.outline]: 'border-input text-input',
        [BadgeVariant.destructive]:
          'bg-destructive text-destructive-foreground border-destructive',
        [BadgeVariant.success]:
          'bg-success text-success-foreground border-success',
        [BadgeVariant.accent]: 'bg-accent text-accent-foreground border-accent',
      },
      size: {
        [BadgeSize.default]: 'text-xs [&>svg]:size-3 ',
        [BadgeSize.lg]: 'text-sm [&>svg]:size-4 ',
      },
    },
    defaultVariants: {
      variant: BadgeVariant.default,
      size: BadgeSize.default,
    },
  },
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({
  variant,
  size,
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
