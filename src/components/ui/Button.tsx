'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  /** Stretch to the container. */
  block?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[var(--text-label)] gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-14 px-7 text-sm gap-2.5',
};

const RADII: Record<Size, string> = {
  sm: 'rounded-[var(--radius-sm)]',
  md: 'rounded-[var(--radius-md)]',
  lg: 'rounded-[var(--radius-md)]',
};

/**
 * The one button.
 *
 * Every screen used to hand-roll its own
 * `h-14 rounded-2xl bg-accent text-bg text-[10px] uppercase
 * tracking-[0.3em]`, which is why no two buttons in the app matched and why
 * none of them survived a dark aesthetic. Colours here are tokens only.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    block = false,
    iconLeft,
    iconRight,
    className,
    children,
    disabled,
    type = 'button',
    ...props
  },
  ref
) {
  const variants: Record<Variant, string> = {
    primary: 'bg-accent text-bg hover:brightness-105 shadow-[var(--elevation-soft)]',
    secondary: 'bg-card text-text border border-line hover:border-line-strong',
    ghost: 'bg-transparent text-text-secondary hover:text-text hover:bg-elevated',
    danger: 'bg-transparent text-red-500 border border-red-500/30 hover:bg-red-500/10',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-semibold tracking-tight',
        'transition-[transform,background-color,border-color,color] duration-150',
        'active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none',
        SIZES[size],
        RADII[size],
        variants[variant],
        block && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 13 : 16} className="animate-spin" />
      ) : (
        iconLeft
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
});
