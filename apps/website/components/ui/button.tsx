import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = {
  variant: {
    primary:
      'bg-accent-green text-white hover:bg-accent-green/90 focus-visible:ring-accent-green',
    secondary:
      'bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-foreground',
    outline:
      'border border-border bg-transparent text-foreground hover:bg-muted focus-visible:ring-foreground',
    ghost:
      'bg-transparent text-foreground hover:bg-muted focus-visible:ring-foreground',
  },
  size: {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-sm',
    lg: 'h-12 px-8 text-base',
  },
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
