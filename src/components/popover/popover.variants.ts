import { cva } from 'class-variance-authority'

import { PopoverAlign, PopoverPosition, PopoverSize } from './popover.constants'

export const popoverVariants = cva(
  'relative rounded-md border border-border bg-background p-4 text-sm text-foreground shadow-md ring-offset-background animate-in fade-in-0 zoom-in-95 motion-reduce:animate-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        [PopoverSize.sm]: 'w-48',
        [PopoverSize.default]: 'w-72',
        [PopoverSize.lg]: 'w-96',
        [PopoverSize.auto]: 'w-max max-w-xs',
      },
    },
    defaultVariants: {
      size: PopoverSize.default,
    },
  },
)

export const popoverPlacementVariants = cva('absolute z-50', {
  variants: {
    position: {
      [PopoverPosition.top]: 'bottom-full',
      [PopoverPosition.right]: 'left-full',
      [PopoverPosition.bottom]: 'top-full',
      [PopoverPosition.left]: 'right-full',
    },
    align: {
      [PopoverAlign.start]: '',
      [PopoverAlign.center]: '',
      [PopoverAlign.end]: '',
    },
  },
  compoundVariants: [
    {
      position: [PopoverPosition.top, PopoverPosition.bottom],
      align: PopoverAlign.start,
      class: 'left-0',
    },
    {
      position: [PopoverPosition.top, PopoverPosition.bottom],
      align: PopoverAlign.center,
      class: 'left-1/2 -translate-x-1/2',
    },
    {
      position: [PopoverPosition.top, PopoverPosition.bottom],
      align: PopoverAlign.end,
      class: 'right-0',
    },
    {
      position: [PopoverPosition.left, PopoverPosition.right],
      align: PopoverAlign.start,
      class: 'top-0',
    },
    {
      position: [PopoverPosition.left, PopoverPosition.right],
      align: PopoverAlign.center,
      class: 'top-1/2 -translate-y-1/2',
    },
    {
      position: [PopoverPosition.left, PopoverPosition.right],
      align: PopoverAlign.end,
      class: 'bottom-0',
    },
  ],
})

export const enterAnimationClasses = {
  [PopoverPosition.top]: 'slide-in-from-bottom-1',
  [PopoverPosition.right]: 'slide-in-from-left-1',
  [PopoverPosition.bottom]: 'slide-in-from-top-1',
  [PopoverPosition.left]: 'slide-in-from-right-1',
} as const

export const arrowPositionClasses = {
  [PopoverPosition.top]: '-bottom-1 border-l-0 border-t-0',
  [PopoverPosition.right]: '-left-1 border-r-0 border-t-0',
  [PopoverPosition.bottom]: '-top-1 border-b-0 border-r-0',
  [PopoverPosition.left]: '-right-1 border-b-0 border-l-0',
} as const

export const arrowAlignClasses = {
  vertical: {
    [PopoverAlign.start]: 'left-3',
    [PopoverAlign.center]: 'left-1/2 -translate-x-1/2',
    [PopoverAlign.end]: 'right-3',
  },
  horizontal: {
    [PopoverAlign.start]: 'top-3',
    [PopoverAlign.center]: 'top-1/2 -translate-y-1/2',
    [PopoverAlign.end]: 'bottom-3',
  },
} as const
