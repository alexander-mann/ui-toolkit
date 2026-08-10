import React from 'react'

import { PopoverPosition, PopoverPositionValue } from './popover.constants'

export const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export const nativelyActivatableTags: readonly string[] = [
  'A',
  'BUTTON',
  'INPUT',
  'SUMMARY',
]

export const getOffsetStyle = (
  position: PopoverPositionValue,
  offset: number,
): React.CSSProperties => {
  if (position === PopoverPosition.top) {
    return { marginBottom: offset }
  }
  if (position === PopoverPosition.bottom) {
    return { marginTop: offset }
  }
  if (position === PopoverPosition.left) {
    return { marginRight: offset }
  }
  return { marginLeft: offset }
}
