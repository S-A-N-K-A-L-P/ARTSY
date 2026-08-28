'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ stack */

type Gap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const GAP: Record<Gap, string> = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-5',
  lg: 'gap-8',
  xl: 'gap-12',
};

/** Vertical rhythm. Replaces ad-hoc space-y-* / mb-* scattered per screen. */
export function Stack({
  gap = 'md',
  className,
  children,
}: {
  gap?: Gap;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('flex flex-col', GAP[gap], className)}>{children}</div>;
}

/** Horizontal row that wraps by default. */
export function Inline({
  gap = 'sm',
  align = 'center',
  className,
  children,
}: {
  gap?: Gap;
  align?: 'start' | 'center' | 'end' | 'baseline';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap',
        GAP[gap],
        { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline' }[align],
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- page shell */

/**
 * Consistent page width + heading block.
 *
 * Screens variously used max-w-4xl / 5xl / 6xl / none and headings from
 * text-3xl to text-7xl italic, which is most of why no two pages looked
 * related.
 */
export function Page({
  title,
  description,
  actions,
  width = 'default',
  className,
  children,
}: {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  width?: 'narrow' | 'default' | 'wide' | 'full';
  className?: string;
  children: React.ReactNode;
}) {
  const widths = {
    narrow: 'max-w-2xl',
    default: 'max-w-5xl',
    wide: 'max-w-[1600px]',
    full: 'max-w-none',
  };

  return (
    <div className={cn('mx-auto w-full', widths[width], className)}>
      {(title || actions) && (
        <header className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="min-w-0">
            {title && (
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-text">{title}</h1>
            )}
            {description && (
              <p className="mt-1.5 text-sm text-text-secondary">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </header>
      )}
      {children}
    </div>
  );
}

/** A titled block within a page. */
export function Section({
  title,
  description,
  actions,
  className,
  children,
}: {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || actions) && (
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            {title && (
              <h2 className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
                {title}
              </h2>
            )}
            {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------- surface */

export function Card({
  className,
  children,
  interactive = false,
  padded = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean; padded?: boolean }) {
  return (
    <div
      className={cn(
        'bg-card border border-line rounded-[var(--radius-lg)]',
        padded && 'p-5 md:p-6',
        interactive &&
          'transition-[border-color,box-shadow] hover:border-line-strong hover:shadow-[var(--elevation-soft)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Card that is itself a control (settings rows, pickers). */
export function CardButton({
  className,
  children,
  selected = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'w-full text-left bg-card border rounded-[var(--radius-lg)] p-5 md:p-6',
        'transition-[border-color,background-color] active:scale-[0.995]',
        selected ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
