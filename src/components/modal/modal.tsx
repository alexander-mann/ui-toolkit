import React, { HTMLAttributes, useState } from 'react'

import { Button } from '@components/button'
import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

export const ModalSize = {
  sm: 'sm',
  default: 'default',
  lg: 'lg',
}

const modalVariants = cva(
  'flex flex-col gap-6 h-fit bg-background p-5 rounded-lg',
  {
    variants: {
      size: {
        [ModalSize.sm]: 'w-[300px] max-h-[200px]',
        [ModalSize.default]: 'w-[600px] max-h-[500px]',
        [ModalSize.lg]: 'w-[1000px] max-h-[800px]',
      },
    },
    defaultVariants: {
      size: ModalSize.default,
    },
  },
)

interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  title: string
  triggerElement: React.ReactNode
  usePortal?: boolean
}

export const Modal = ({
  title,
  children,
  size,
  triggerElement,
  className,
  usePortal,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const ModalContent = (
    <div
      className="fixed z-[1000] inset-0 flex items-center justify-center bg-black/50"
      onClick={toggleModal}
    >
      <div
        role="dialog"
        aria-labelledby="dialog-label"
        aria-modal="true"
        className={cn(modalVariants({ size, className }))}
      >
        <div className="flex justify-between items-center">
          <h1 id="dialog-label" className="text-2xl font-medium">
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
      <button type="button" onClick={toggleModal}>
        {triggerElement}
      </button>
      {isOpen &&
        (usePortal ? createPortal(ModalContent, document.body) : ModalContent)}
    </>
  )
}
