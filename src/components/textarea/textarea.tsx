import React from 'react'

import { cn } from '@utils'

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  id: string
  hasError?: boolean
  required?: boolean
  errorMessage?: string
}

const Textarea = ({
  label,
  id,
  hasError,
  errorMessage,
  required,
  ...props
}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>
      <textarea
        id={id}
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 read-only:cursor-not-allowed read-only:opacity-75',
          hasError && 'border-destructive',
        )}
        required={required}
        {...props}
      />
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  )
}

export { Textarea }
