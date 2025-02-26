import React, { useState } from 'react'

import { cn } from '@utils'

interface TabData {
  label: string
  content: React.ReactNode
}

interface TabsProps {
  data: TabData[]
  className?: string
}

const Tabs = ({ data, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className={cn('w-full', className)}>
      <div className="flex w-full" role="tablist">
        {data.map((tab, index) => {
          const isActive = activeTab === index
          return (
            <button
              id={`tab-${index}`}
              role="tab"
              disabled={isActive}
              aria-selected={isActive}
              className={cn(
                'whitespace-nowrap border border-muted-foreground py-2 px-4 bg-muted-foreground/10 hover:bg-muted-foreground/30 first-of-type:rounded-tl-md last-of-type:rounded-tr-md disabled:bg-transparent',
                isActive
                  ? 'border-b-0'
                  : 'border-muted-foreground/50 border-b-muted-foreground',
              )}
              key={`${tab.label}-tab`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          )
        })}
        <span className="border-b w-full" />
      </div>
      <div className="border border-t-0 border-muted-foreground p-4 w-full rounded-md rounded-t-none">
        {data.map((tab, index) => {
          const isActive = activeTab === index
          return (
            <div
              id={`tabpanel-${index}`}
              role="tabpanel"
              aria-labelledby={`tab-${index}`}
              hidden={!isActive}
              key={`${tab.label}-panel`}
            >
              {tab.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Tabs }
