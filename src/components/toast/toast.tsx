import React, { useEffect, useState } from 'react'

import { cn } from '@utils'
import { cva } from 'class-variance-authority'
import { AlertTriangleIcon, CircleCheck, CircleX, InfoIcon } from 'lucide-react'
import { createPortal } from 'react-dom'

export const ToastVariant = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
} as const

export const ToastPosition = {
  'top-left': 'top-left',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
} as const

export type ToastVariantValue = (typeof ToastVariant)[keyof typeof ToastVariant]

export type ToastPositionValue =
  (typeof ToastPosition)[keyof typeof ToastPosition]

interface Toast {
  id: string
  message: string
  variant: ToastVariantValue
  dismissing?: boolean
}

export const toastVariants = cva(
  'min-w-[300px] p-3 rounded-lg shadow-xl relative border bg-muted flex items-center gap-2 [&>svg]:size-5 [&>svg]:shrink-0 max-w-40',
  {
    variants: {
      variant: {
        [ToastVariant.success]: 'border-success [&>svg]:text-success',
        [ToastVariant.error]: 'border-destructive [&>svg]:text-destructive',
        [ToastVariant.info]: 'border-info [&>svg]:text-info',
        [ToastVariant.warning]: 'border-warning [&>svg]:text-warning',
      },
    },
    defaultVariants: {
      variant: ToastVariant.info,
    },
  },
)

interface ToastProps {
  usePortal?: boolean
  duration?: number
  position?: ToastPositionValue
  maxToasts?: number
}

let toaster: { addToast: (toast: Omit<Toast, 'id'>) => void } | null = null

export const Toaster = ({
  usePortal,
  duration = 5000,
  position = ToastPosition['bottom-right'],
  maxToasts = 3,
}: ToastProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    toaster = {
      addToast: (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts((prev) => {
          const newToasts = [...prev, { ...toast, id }]
          return newToasts.slice(-maxToasts)
        })

        setTimeout(() => {
          setToasts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, dismissing: true } : t)),
          )
        }, duration)

        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration + 300)
      },
    }

    return () => {
      toaster = null
    }
  }, [maxToasts, duration, position])

  const determineIcon = (variant: ToastVariantValue) => {
    switch (variant) {
      case ToastVariant.success:
        return <CircleCheck />
      case ToastVariant.error:
        return <CircleX />
      case ToastVariant.info:
        return <InfoIcon />
      case ToastVariant.warning:
        return <AlertTriangleIcon />
    }
  }

  const positionClass = {
    [ToastPosition['top-left']]: 'fixed top-4 left-4 flex-col',
    [ToastPosition['top-right']]: 'fixed top-4 right-4 flex-col',
    [ToastPosition['bottom-left']]: 'fixed bottom-4 left-4 flex-col-reverse',
    [ToastPosition['bottom-right']]: 'fixed bottom-4 right-4 flex-col-reverse',
  }

  const marginStyle = {
    [ToastPosition['top-left']]: { marginBottom: '-10%' },
    [ToastPosition['top-right']]: { marginBottom: '-10%' },
    [ToastPosition['bottom-left']]: { marginTop: '-10%' },
    [ToastPosition['bottom-right']]: { marginTop: '-10%' },
  }

  const getEntryAnimation = (position: ToastPositionValue) => {
    switch (position) {
      case ToastPosition['top-left']:
      case ToastPosition['bottom-left']:
        return 'animate-slide-in-from-left'
      default:
        return 'animate-slide-in-from-right'
    }
  }

  const getExitAnimation = (position: ToastPositionValue) => {
    switch (position) {
      case ToastPosition['top-left']:
      case ToastPosition['bottom-left']:
        return 'animate-slide-out-to-left'
      default:
        return 'animate-slide-out-to-right'
    }
  }

  const ToasterContainer = (
    <div className={cn(positionClass[position], 'z-50 flex gap-2')}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={marginStyle[position]}
          className={cn(
            toastVariants({ variant: toast.variant }),
            toast.dismissing
              ? getExitAnimation(position)
              : getEntryAnimation(position),
          )}
        >
          {determineIcon(toast.variant)}
          {toast.message}
        </div>
      ))}
    </div>
  )
  return usePortal
    ? createPortal(ToasterContainer, document.body)
    : ToasterContainer
}

const handleAddToast = (message: string, variant: ToastVariantValue) => {
  if (!toaster) {
    throw new Error('Toast cannot be used outside Toaster')
  }
  toaster.addToast({ message, variant })
}

export const toast = {
  success: (message: string) => handleAddToast(message, ToastVariant.success),
  error: (message: string) => handleAddToast(message, ToastVariant.error),
  info: (message: string) => handleAddToast(message, ToastVariant.info),
  warning: (message: string) => handleAddToast(message, ToastVariant.warning),
}
