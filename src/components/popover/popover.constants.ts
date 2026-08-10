export const PopoverPosition = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
} as const

export const PopoverAlign = {
  start: 'start',
  center: 'center',
  end: 'end',
} as const

export const PopoverSize = {
  sm: 'sm',
  default: 'default',
  lg: 'lg',
  auto: 'auto',
} as const

export type PopoverPositionValue =
  (typeof PopoverPosition)[keyof typeof PopoverPosition]

export type PopoverAlignValue = (typeof PopoverAlign)[keyof typeof PopoverAlign]
