import React, {
  AriaAttributes,
  HTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import { cn, getFloatingStyle, isVerticalPosition } from '@utils'
import { VariantProps } from 'class-variance-authority'
import { createPortal } from 'react-dom'

import { PopoverAlign, PopoverPosition } from './popover.constants'
import {
  focusableSelector,
  getOffsetStyle,
  nativelyActivatableTags,
} from './popover.utils'
import {
  arrowAlignClasses,
  arrowPositionClasses,
  enterAnimationClasses,
  popoverPlacementVariants,
  popoverVariants,
} from './popover.variants'

export * from './popover.constants'
export { popoverPlacementVariants, popoverVariants } from './popover.variants'

interface TriggerProps extends AriaAttributes {
  role?: React.AriaRole
  tabIndex?: number
  onClick?: React.MouseEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
}

interface PopoverBaseProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      'content' | 'title' | 'id' | 'aria-label'
    >,
    VariantProps<typeof popoverVariants>,
    VariantProps<typeof popoverPlacementVariants> {
  content: React.ReactNode
  children: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  usePortal?: boolean
  arrow?: boolean
  offset?: number
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
}

/**
 * `role="dialog"` must have an accessible name, so exactly one of `title`
 * (rendered as a heading) or `aria-label` (visually hidden) is required.
 */
type PopoverProps = PopoverBaseProps &
  (
    | { title: string; 'aria-label'?: never }
    | { title?: never; 'aria-label': string }
  )

export const Popover = ({
  content,
  children,
  title,
  position,
  align,
  size,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  usePortal = false,
  arrow = true,
  offset = 8,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className,
  style,
  onBlur: onBlurProp,
  onKeyDown: onKeyDownProp,
  ...props
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [portalStyle, setPortalStyle] = useState<React.CSSProperties | null>(
    null,
  )
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const generatedId = useId()
  const popoverId = `${generatedId}-popover`
  const titleId = `${generatedId}-title`

  const rootRef = useRef<HTMLDivElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const wasOpenRef = useRef(controlledOpen ?? defaultOpen)

  const resolvedPosition = position ?? PopoverPosition.bottom
  const resolvedAlign = align ?? PopoverAlign.center
  const isSurfaceRendered = isOpen && (!usePortal || portalStyle !== null)

  const updateOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange],
  )

  const close = useCallback(() => {
    updateOpen(false)
  }, [updateOpen])

  const focusTrigger = useCallback(() => {
    const lastFocused = lastFocusedRef.current
    if (lastFocused && document.contains(lastFocused)) {
      lastFocused.focus()
      return
    }
    rootRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus()
  }, [])

  const isInsidePopover = useCallback((node: Node | null) => {
    if (!node) {
      return false
    }
    return (
      rootRef.current?.contains(node) === true ||
      surfaceRef.current?.contains(node) === true
    )
  }, [])

  const toggle = (trigger: HTMLElement) => {
    lastFocusedRef.current = trigger
    updateOpen(!isOpen)
  }

  const handleTriggerClick = (event: React.MouseEvent<HTMLElement>) => {
    toggle(event.currentTarget)
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }
    if (nativelyActivatableTags.includes(event.currentTarget.tagName)) {
      return
    }
    event.preventDefault()
    toggle(event.currentTarget)
  }

  const handleSurfaceBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    onBlurProp?.(event)
    const nextTarget = event.relatedTarget as Node | null
    if (!closeOnOutsideClick || !nextTarget || isInsidePopover(nextTarget)) {
      return
    }
    close()
  }

  /**
   * Tab out of the surface closes rather than trapping. Focus returns to the
   * trigger first so the browser's own Tab handling continues from there —
   * which is what keeps the portalled surface (appended to document.body) from
   * stranding focus at the end of the document.
   */
  const handleSurfaceKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDownProp?.(event)
    if (event.key !== 'Tab' || !closeOnOutsideClick) {
      return
    }
    const surface = surfaceRef.current
    if (!surface) {
      return
    }
    const focusable = Array.from(
      surface.querySelectorAll<HTMLElement>(focusableSelector),
    )
    const active = document.activeElement
    const isLeaving =
      focusable.length === 0 ||
      (event.shiftKey
        ? active === focusable[0]
        : active === focusable[focusable.length - 1])
    if (!isLeaving) {
      return
    }
    close()
    focusTrigger()
  }

  useEffect(() => {
    if (!isOpen || !usePortal) {
      setPortalStyle(null)
      return
    }

    let frame = 0

    const updatePortalStyle = () => {
      const rect = rootRef.current?.getBoundingClientRect()
      if (!rect) {
        return
      }
      setPortalStyle(
        getFloatingStyle(rect, resolvedPosition, resolvedAlign, offset),
      )
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updatePortalStyle)
    }

    updatePortalStyle()
    window.addEventListener('scroll', scheduleUpdate, true)
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate, true)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [isOpen, usePortal, resolvedPosition, resolvedAlign, offset])

  useEffect(() => {
    if (!isOpen) {
      wasOpenRef.current = false
      return
    }
    if (!isSurfaceRendered || wasOpenRef.current) {
      return
    }
    wasOpenRef.current = true

    const surface = surfaceRef.current
    if (!surface) {
      return
    }
    const firstFocusable =
      surface.querySelector<HTMLElement>(focusableSelector) ?? surface
    firstFocusable.focus({ preventScroll: true })
  }, [isOpen, isSurfaceRendered])

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }
      const heldFocus = isInsidePopover(document.activeElement)
      close()
      if (heldFocus) {
        focusTrigger()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeOnEscape, close, focusTrigger, isInsidePopover])

  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) {
      return
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (isInsidePopover(event.target as Node)) {
        return
      }
      close()
    }

    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isOpen, closeOnOutsideClick, close, isInsidePopover])

  const triggerProps: TriggerProps = {
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog',
    'aria-controls': isOpen ? popoverId : undefined,
    onClick: handleTriggerClick,
    onKeyDown: handleTriggerKeyDown,
  }

  /**
   * A non-interactive host element (`span`, `div`, …) is not tab-reachable, so
   * its injected key handler could never fire. Give it button semantics rather
   * than silently dropping keyboard support. Composite children are left alone
   * — we cannot know what they render.
   */
  const needsButtonSemantics =
    React.isValidElement(children) &&
    typeof children.type === 'string' &&
    !nativelyActivatableTags.includes(children.type.toUpperCase())

  const trigger = React.isValidElement<TriggerProps>(children) ? (
    React.cloneElement(children, {
      ...triggerProps,
      role: needsButtonSemantics
        ? (children.props.role ?? 'button')
        : children.props.role,
      tabIndex: needsButtonSemantics
        ? (children.props.tabIndex ?? 0)
        : children.props.tabIndex,
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        children.props.onClick?.(event)
        handleTriggerClick(event)
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        children.props.onKeyDown?.(event)
        handleTriggerKeyDown(event)
      },
    })
  ) : (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  )

  const surface = (
    <div
      {...props}
      ref={surfaceRef}
      role="dialog"
      id={popoverId}
      aria-labelledby={title === undefined ? undefined : titleId}
      tabIndex={-1}
      onBlur={handleSurfaceBlur}
      onKeyDown={handleSurfaceKeyDown}
      className={cn(
        enterAnimationClasses[resolvedPosition],
        popoverVariants({ size, className }),
      )}
      style={style}
    >
      {title !== undefined && (
        <h2 id={titleId} className="mb-2 text-base font-medium">
          {title}
        </h2>
      )}
      {content}
      {arrow && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute size-2 rotate-45 border border-border bg-background',
            arrowPositionClasses[resolvedPosition],
            arrowAlignClasses[
              isVerticalPosition(resolvedPosition) ? 'vertical' : 'horizontal'
            ][resolvedAlign],
          )}
        />
      )}
    </div>
  )

  const anchoredSurface = usePortal ? (
    <div className="z-50" style={portalStyle ?? undefined}>
      {surface}
    </div>
  ) : (
    <div
      className={cn(
        popoverPlacementVariants({
          position: resolvedPosition,
          align: resolvedAlign,
        }),
      )}
      style={getOffsetStyle(resolvedPosition, offset)}
    >
      {surface}
    </div>
  )

  return (
    <div ref={rootRef} className="relative inline-flex">
      {trigger}
      {isSurfaceRendered &&
        (usePortal
          ? createPortal(anchoredSurface, document.body)
          : anchoredSurface)}
    </div>
  )
}
