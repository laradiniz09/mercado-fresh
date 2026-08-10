// Button variants matching Figma — Primary, Secondary, Tertiary
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'destructive'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  fullWidth?: boolean
  /** A4: isLoading aplica aria-disabled + aria-busy sem bloquear o DOM,
   *  diferente de `disabled` que bloqueia totalmente a interação */
  isLoading?: boolean
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
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      // A4: type="button" explícito evita submit acidental dentro de <form>
      type="button"
      // A3: aria-disabled + aria-busy no estado de carregamento
      aria-disabled={isLoading || props.disabled || undefined}
      aria-busy={isLoading || undefined}
      className={`
        flex items-center justify-center
        font-body text-base
        transition-opacity active:opacity-80
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fresh focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
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
