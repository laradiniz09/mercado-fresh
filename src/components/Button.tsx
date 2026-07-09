// Button variants matching Figma — Primary, Secondary, Tertiary
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:     'bg-surface-brand text-content-inverse font-semibold h-14 rounded-xl',
  secondary:   'bg-transparent border border-stroke-active text-content-primary font-semibold h-14 rounded-xl',
  tertiary:    'bg-transparent text-content-brand font-semibold h-10',
  destructive: 'bg-transparent border border-danger text-danger font-semibold h-14 rounded-xl',
}

export default function Button({
  variant = 'primary',
  children,
  fullWidth = true,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        flex items-center justify-center
        font-body text-base
        transition-opacity active:opacity-80
        ${fullWidth ? 'w-full' : ''}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
