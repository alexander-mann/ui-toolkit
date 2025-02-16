import React from 'react'

import { cn } from '@utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  hasError?: boolean
  errorMessage?: string
}

const Input = ({ label, id, hasError, errorMessage, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          hasError && 'border-destructive',
        )}
        {...props}
      />
      {hasError && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  )
}

export { Input }
