'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------- spinner */

export function Spinner({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <Loader2
      size={size}
      className={cn('animate-spin text-accent-text', className)}
      role="status"
      aria-label="Loading"
    />
  );
}

/* --------------------------------------------------------------- skeleton */

/**
 * Placeholder block.
 *
 * Screens previously showed either a bare spinner or nothing at all while
 * loading, so the layout jumped when data landed. A skeleton holds the shape.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('animate-pulse bg-elevated rounded-[var(--radius-sm)]', className)}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full aspect-[3/4] rounded-[var(--radius-lg)]" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}

/** Fills a masonry/grid while the real items load. */
export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ empty state */

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'py-20 px-6 text-center border border-dashed border-line rounded-[var(--radius-lg)]',
        className
      )}
    >
      {icon && <div className="mb-4 flex justify-center text-text-muted opacity-40">{icon}</div>}
      <p className="text-sm font-semibold text-text">{title}</p>
      {description && (
        <p className="mt-1.5 text-[var(--text-caption)] text-text-secondary max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------- inline alert */

export function Alert({
  tone = 'error',
  children,
  className,
}: {
  tone?: 'error' | 'success' | 'info';
  children: React.ReactNode;
  className?: string;
}) {
  const tones = {
    error: 'border-red-500/30 bg-red-500/10 text-red-500',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
    info: 'border-line bg-elevated text-text-secondary',
  };
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'px-4 py-3 rounded-[var(--radius-md)] border text-[var(--text-caption)] font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </div>
  );
}
