import React, { HTMLAttributes, useState } from 'react'

import { Button } from '@components/button'
import { cn } from '@utils'
import { cva, VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

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
}

export const Modal = ({
  title,
  children,
  size,
  triggerElement,
  className,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button onClick={toggleModal}>{triggerElement}</button>
      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed z-[1000] inset-0 flex items-center justify-center bg-black/50">
          {/* Modal content */}
          <div className={cn(modalVariants({ size, className }))}>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-medium">{title}</h1>
              <Button variant="outline" size="icon" onClick={toggleModal}>
                <X size={12} />
              </Button>
            </div>
            <div className="overflow-y-auto flex flex-col gap-2">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
