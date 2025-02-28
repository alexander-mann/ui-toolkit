import React, { useEffect, useState } from 'react'

import { cn } from '@utils'
import { cva } from 'class-variance-authority'
import { AlertTriangleIcon, CircleCheck, CircleX, InfoIcon } from 'lucide-react'
import { createPortal } from 'react-dom'

export enum ToastVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export const ToastPosition = {
  TopLeft: 'top-left',
  TopRight: 'top-right',
  BottomLeft: 'bottom-left',
  BottomRight: 'bottom-right',
} as const

interface Toast {
  id: string
  message: string
  variant: ToastVariant
}

const toastVariants = cva(
  'min-w-[300px] p-3 rounded-lg shadow-xl animate-toast-in relative border bg-background flex items-center gap-2 [&>svg]:size-5 [&>svg]:shrink-0 max-w-40',
  {
    variants: {
      variant: {
        [ToastVariant.Success]: 'border-success text-success',
        [ToastVariant.Error]: 'border-destructive text-destructive',
        [ToastVariant.Info]: 'border-info text-info',
        [ToastVariant.Warning]: 'border-warning text-warning',
      },
    },
  },
)

interface ToastProps {
  usePortal?: boolean
  duration?: number
  position?: (typeof ToastPosition)[keyof typeof ToastPosition]
  maxToasts?: number
}

let toaster: { addToast: (toast: Omit<Toast, 'id'>) => void } | null = null

export const Toaster = ({
  usePortal,
  duration = 5000,
  position = ToastPosition.BottomRight,
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
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
      },
    }

    return () => {
      toaster = null
    }
  }, [maxToasts, duration, position])

  const determineIcon = (variant: ToastVariant) => {
    switch (variant) {
      case ToastVariant.Success:
        return <CircleCheck />
      case ToastVariant.Error:
        return <CircleX />
      case ToastVariant.Info:
        return <InfoIcon />
      case ToastVariant.Warning:
        return <AlertTriangleIcon />
    }
  }

  const positionClass = {
    [ToastPosition.TopLeft]: 'fixed top-4 left-4 flex-col',
    [ToastPosition.TopRight]: 'fixed top-4 right-4 flex-col',
    [ToastPosition.BottomLeft]: 'fixed bottom-4 left-4 flex-col-reverse',
    [ToastPosition.BottomRight]: 'fixed bottom-4 right-4 flex-col-reverse',
  }

  const marginStyle = {
    [ToastPosition.TopLeft]: { marginBottom: '-10%' },
    [ToastPosition.TopRight]: { marginBottom: '-10%' },
    [ToastPosition.BottomLeft]: { marginTop: '-10%' },
    [ToastPosition.BottomRight]: { marginTop: '-10%' },
  }

  const ToasterContainer = (
    <div className={cn(positionClass[position], 'z-50 flex')}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={marginStyle[position]}
          className={cn(toastVariants({ variant: toast.variant }))}
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

export const toast = {
  success: (message: string) => {
    if (!toaster) {
      throw new Error('Toast cannot be used outside Toaster')
    }
    toaster.addToast({ message, variant: ToastVariant.Success })
  },
  error: (message: string) => {
    if (!toaster) {
      throw new Error('Toast cannot be used outside Toaster')
    }
    toaster.addToast({ message, variant: ToastVariant.Error })
  },
  info: (message: string) => {
    if (!toaster) {
      throw new Error('Toast cannot be used outside Toaster')
    }
    toaster.addToast({ message, variant: ToastVariant.Info })
  },
  warning: (message: string) => {
    if (!toaster) {
      throw new Error('Toast cannot be used outside Toaster')
    }
    toaster.addToast({ message, variant: ToastVariant.Warning })
  },
}
