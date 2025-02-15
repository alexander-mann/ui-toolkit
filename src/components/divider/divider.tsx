import React, { ButtonHTMLAttributes } from 'react'

import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'

export const DividerOrientation = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
}

const dividerVariants = cva('opacity-30', {
  variants: {
    orientation: {
      [DividerOrientation.Horizontal]: 'border-b w-full',
      [DividerOrientation.Vertical]: 'h-full border-l w-fit',
    },
  },
  defaultVariants: {
    orientation: DividerOrientation.Horizontal,
  },
})

interface DividerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dividerVariants> {
  className?: string
}

const Divider = ({ className, orientation = 'horizontal' }: DividerProps) => {
  return <div className={cn(dividerVariants({ orientation, className }))} />
}

export { Divider }
