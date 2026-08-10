import React from 'react'

export type FloatingPosition = 'top' | 'right' | 'bottom' | 'left'

export type FloatingAlign = 'start' | 'center' | 'end'

export interface FloatingSize {
  width: number
  height: number
}

export interface FloatingPlacement {
  /** Styles for the wrapper element that anchors the floating surface. */
  style: React.CSSProperties
  /** Position actually used — differs from the requested one after a flip. */
  position: FloatingPosition
  /** Alignment actually used. */
  align: FloatingAlign
  /**
   * Pixels the surface was pushed along its cross axis to stay on screen.
   * Shift an arrow by the negation of this to keep it over the trigger.
   */
  arrowShift: number
}

const oppositePosition: Record<FloatingPosition, FloatingPosition> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

export const isVerticalPosition = (position: FloatingPosition) =>
  position === 'top' || position === 'bottom'

const clamp = (value: number, min: number, max: number) => {
  if (max < min) {
    return min
  }
  return Math.min(Math.max(value, min), max)
}

/**
 * Anchor styles that lean on percentage transforms, for callers that don't
 * know the floating element's size. No collision handling is possible here.
 */
const getAnchorStyle = (
  trigger: DOMRect,
  position: FloatingPosition,
  align: FloatingAlign,
  offset: number,
): React.CSSProperties => {
  const style: React.CSSProperties = { position: 'fixed' }
  let translateX = '0'
  let translateY = '0'

  if (isVerticalPosition(position)) {
    if (position === 'top') {
      style.top = trigger.top - offset
      translateY = '-100%'
    } else {
      style.top = trigger.bottom + offset
    }

    if (align === 'start') {
      style.left = trigger.left
    } else if (align === 'end') {
      style.left = trigger.right
      translateX = '-100%'
    } else {
      style.left = trigger.left + trigger.width / 2
      translateX = '-50%'
    }
  } else {
    if (position === 'left') {
      style.left = trigger.left - offset
      translateX = '-100%'
    } else {
      style.left = trigger.right + offset
    }

    if (align === 'start') {
      style.top = trigger.top
    } else if (align === 'end') {
      style.top = trigger.bottom
      translateY = '-100%'
    } else {
      style.top = trigger.top + trigger.height / 2
      translateY = '-50%'
    }
  }

  style.transform = `translate(${translateX}, ${translateY})`

  return style
}

/**
 * Flip to the opposite side when the requested one can't fit the surface and
 * the opposite side has more room. Staying put beats flipping into an even
 * tighter gap.
 */
const flipPosition = (
  trigger: DOMRect,
  position: FloatingPosition,
  floating: FloatingSize,
  viewport: FloatingSize,
  offset: number,
): FloatingPosition => {
  const space: Record<FloatingPosition, number> = {
    top: trigger.top - offset,
    bottom: viewport.height - trigger.bottom - offset,
    left: trigger.left - offset,
    right: viewport.width - trigger.right - offset,
  }
  const needed = isVerticalPosition(position) ? floating.height : floating.width

  if (space[position] >= needed) {
    return position
  }

  const opposite = oppositePosition[position]

  return space[opposite] > space[position] ? opposite : position
}

/**
 * Fixed-position placement anchoring a floating element to a trigger rect.
 *
 * Pass `floating` (the surface's measured size) to get viewport collision
 * handling: the surface flips to the opposite side when the requested one
 * can't fit, and is clamped along its cross axis to stay on screen. Omit it
 * and the placement is computed from percentage transforms instead, which
 * needs no measurement pass but cannot collision-detect.
 *
 * The returned styles belong on a wrapper element, not on the animated
 * surface itself — a class-based transform on the surface would be clobbered
 * by the enter keyframes.
 */
export const getFloatingPlacement = (
  trigger: DOMRect,
  position: FloatingPosition,
  align: FloatingAlign,
  offset: number,
  floating?: FloatingSize,
  viewport?: FloatingSize,
): FloatingPlacement => {
  if (!floating) {
    return {
      style: getAnchorStyle(trigger, position, align, offset),
      position,
      align,
      arrowShift: 0,
    }
  }

  const bounds = viewport ?? {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const resolved = flipPosition(trigger, position, floating, bounds, offset)
  const vertical = isVerticalPosition(resolved)

  let main: number
  if (resolved === 'top') {
    main = trigger.top - offset - floating.height
  } else if (resolved === 'bottom') {
    main = trigger.bottom + offset
  } else if (resolved === 'left') {
    main = trigger.left - offset - floating.width
  } else {
    main = trigger.right + offset
  }

  const crossSize = vertical ? floating.width : floating.height
  const triggerStart = vertical ? trigger.left : trigger.top
  const triggerEnd = vertical ? trigger.right : trigger.bottom
  const triggerExtent = vertical ? trigger.width : trigger.height
  const crossLimit = vertical ? bounds.width : bounds.height

  let cross: number
  if (align === 'start') {
    cross = triggerStart
  } else if (align === 'end') {
    cross = triggerEnd - crossSize
  } else {
    cross = triggerStart + triggerExtent / 2 - crossSize / 2
  }

  const clampedCross = clamp(cross, offset, crossLimit - crossSize - offset)

  return {
    style: vertical
      ? { position: 'fixed', top: main, left: clampedCross }
      : { position: 'fixed', top: clampedCross, left: main },
    position: resolved,
    align,
    arrowShift: clampedCross - cross,
  }
}
