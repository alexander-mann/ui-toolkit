import React, { HTMLAttributes } from 'react'

import { cn } from '@utils'

export const Card = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-card bg-card text-card-foreground shadow-sm p-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
