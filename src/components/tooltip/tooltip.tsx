import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import { cn, getFloatingPlacement } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'
import { createPortal } from 'react-dom'

export const TooltipPosition = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
} as const

export const TooltipVariant = {
  default: 'default',
  light: 'light',
} as const

export const tooltipVariants = cva(
  'z-50 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      variant: {
        [TooltipVariant.default]: 'bg-primary text-primary-foreground',
        [TooltipVariant.light]:
          'bg-background text-foreground border border-border shadow-sm',
      },
      position: {
        [TooltipPosition.top]:
          'bottom-full left-1/2 -translate-x-1/2 mb-2 slide-in-from-bottom-1',
        [TooltipPosition.bottom]:
          'top-full left-1/2 -translate-x-1/2 mt-2 slide-in-from-top-1',
        [TooltipPosition.left]:
          'right-full top-1/2 -translate-y-1/2 mr-2 slide-in-from-right-1',
        [TooltipPosition.right]:
          'left-full top-1/2 -translate-y-1/2 ml-2 slide-in-from-left-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const arrowPositionClasses = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
} as const

const arrowColorClasses = {
  default: {
    top: 'border-t-primary',
    bottom: 'border-b-primary',
    left: 'border-l-primary',
    right: 'border-r-primary',
  },
  light: {
    top: 'border-t-border',
    bottom: 'border-b-border',
    left: 'border-l-border',
    right: 'border-r-border',
  },
} as const

interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode
  children: React.ReactNode
  delay?: number
  arrow?: boolean
  usePortal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  delay = 200,
  arrow = true,
  usePortal = false,
  open: controlledOpen,
  onOpenChange,
  className,
  ...props
}: TooltipProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  const tooltipId = useId()
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({})

  const resolvedPosition = position ?? 'top'
  const resolvedVariant = variant ?? 'default'

  const updateOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setInternalOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange],
  )

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (usePortal && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setPortalStyle(
          getFloatingPlacement(rect, resolvedPosition, 'center', 8).style,
        )
      }
      updateOpen(true)
    }, delay)
  }, [delay, resolvedPosition, updateOpen, usePortal])

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    updateOpen(false)
  }, [updateOpen])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hide()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, hide])

  const arrowElement = arrow ? (
    <span
      className={cn(
        'absolute size-0 border-4 border-solid',
        arrowPositionClasses[resolvedPosition],
        arrowColorClasses[resolvedVariant][resolvedPosition],
      )}
    />
  ) : null

  const tooltipBubble = (
    <div
      role="tooltip"
      id={tooltipId}
      className={cn(
        usePortal ? 'relative' : 'absolute',
        tooltipVariants({
          variant,
          position: usePortal ? undefined : resolvedPosition,
          className,
        }),
      )}
      {...props}
    >
      {content}
      {arrowElement}
    </div>
  )

  const portalBubble = (
    <div style={portalStyle} className="pointer-events-none">
      {tooltipBubble}
    </div>
  )

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={isOpen ? tooltipId : undefined}>{children}</span>
      {isOpen &&
        (usePortal ? createPortal(portalBubble, document.body) : tooltipBubble)}
    </div>
  )
}
