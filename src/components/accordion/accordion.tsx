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
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div id={id} className="overflow-hidden">
          <div className="pb-4 text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  )
}

export { Accordion }
