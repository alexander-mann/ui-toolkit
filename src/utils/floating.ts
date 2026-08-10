import React from 'react'

export type FloatingPosition = 'top' | 'right' | 'bottom' | 'left'

export type FloatingAlign = 'start' | 'center' | 'end'

export const isVerticalPosition = (position: FloatingPosition) =>
  position === 'top' || position === 'bottom'

/**
 * Fixed-position styles that anchor a floating element to a trigger rect.
 * Belongs on a wrapper element, not on the animated surface itself — a
 * class-based transform on the surface would be overridden by the enter
 * keyframes.
 */
export const getFloatingStyle = (
  rect: DOMRect,
  position: FloatingPosition,
  align: FloatingAlign,
  offset: number,
): React.CSSProperties => {
  const style: React.CSSProperties = { position: 'fixed' }
  let translateX = '0'
  let translateY = '0'

  if (isVerticalPosition(position)) {
    if (position === 'top') {
      style.top = rect.top - offset
      translateY = '-100%'
    } else {
      style.top = rect.bottom + offset
    }

    if (align === 'start') {
      style.left = rect.left
    } else if (align === 'end') {
      style.left = rect.right
      translateX = '-100%'
    } else {
      style.left = rect.left + rect.width / 2
      translateX = '-50%'
    }
  } else {
    if (position === 'left') {
      style.left = rect.left - offset
      translateX = '-100%'
    } else {
      style.left = rect.right + offset
    }

    if (align === 'start') {
      style.top = rect.top
    } else if (align === 'end') {
      style.top = rect.bottom
      translateY = '-100%'
    } else {
      style.top = rect.top + rect.height / 2
      translateY = '-50%'
    }
  }

  style.transform = `translate(${translateX}, ${translateY})`

  return style
}
