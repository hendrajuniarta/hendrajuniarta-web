import type { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  return (
    <button type="button" className={className}>
      {children}
    </button>
  )
}
