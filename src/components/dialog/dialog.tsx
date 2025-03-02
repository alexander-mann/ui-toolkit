import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

import { Button } from '@components/button'
import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

export const DialogSize = {
  sm: 'sm',
  default: 'default',
  lg: 'lg',
}

const dialogVariants = cva(
  'flex flex-col gap-4 h-fit bg-background p-5 rounded-lg pb-6',
  {
    variants: {
      size: {
        [DialogSize.sm]: 'w-[300px] max-h-[300px]',
        [DialogSize.default]: 'w-[600px] max-h-[500px]',
        [DialogSize.lg]: 'w-[1000px] max-h-[800px]',
      },
    },
    defaultVariants: {
      size: DialogSize.default,
    },
  },
)

interface DialogProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  title: string
  triggerElement: React.ReactNode
  usePortal?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Dialog = ({
  title,
  children,
  size,
  triggerElement,
  className,
  usePortal,
  open = false,
  onOpenChange,
}: DialogProps) => {
  const [isOpen, setIsOpen] = useState(open)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        onOpenChange?.(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onOpenChange])

  const toggleModal = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onOpenChange?.(newState)
  }

  const ModalContent = (
    <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black/50">
      <div
        ref={dialogRef}
        role="dialog"
        aria-labelledby="dialog-label"
        aria-modal="true"
        className={cn(dialogVariants({ size, className }))}
      >
        <div className="flex justify-between items-center">
          <h1
            id="dialog-label"
            className={cn('text-2xl font-medium', {
              'text-xl': size === DialogSize.sm,
            })}
          >
            {title}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleModal}
            aria-label="Close modal"
          >
            <X size={16} />
          </Button>
        </div>
        <div className="overflow-y-auto flex flex-col gap-2" tabIndex={0}>
          {children}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <span onClick={toggleModal}>{triggerElement}</span>
      {isOpen &&
        (usePortal ? createPortal(ModalContent, document.body) : ModalContent)}
    </>
  )
}
