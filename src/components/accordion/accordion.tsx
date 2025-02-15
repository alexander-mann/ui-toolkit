import React, { useState } from 'react'

import { cn } from '@utils'
import { ChevronDown } from 'lucide-react'

interface AccordionProps {
  title: string | React.ReactNode
  children: React.ReactNode
  id: string
}

const Accordion = ({ title, children, id }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={toggleAccordion}
        aria-expanded={isExpanded}
        aria-controls={id}
        className="py-4 w-full flex items-center justify-between underline"
      >
        {title}
        <ChevronDown
          size={16}
          className={cn('transition-all duration-300', {
            'rotate-180': isExpanded,
          })}
        />
      </button>
      {isExpanded && (
        <div
          id={id}
          className="pb-4 transition-all duration-300 text-muted-foreground"
        >
          {children}
        </div>
      )}
    </div>
  )
}

export { Accordion }
