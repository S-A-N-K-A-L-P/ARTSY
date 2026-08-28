'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ badge */

type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export function Badge({
  tone = 'neutral',
  icon,
  children,
  className,
}: {
  tone?: Tone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    neutral: 'bg-elevated text-text-secondary border-line',
    accent: 'bg-accent-soft text-accent border-transparent',
    success: 'bg-emerald-500/12 text-emerald-500 border-transparent',
    warning: 'bg-amber-500/12 text-amber-500 border-transparent',
    danger: 'bg-red-500/12 text-red-500 border-transparent',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full',
        'text-[var(--text-label)] font-bold uppercase tracking-[0.12em] whitespace-nowrap',
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- avatar */

const AVATAR_SIZES = { xs: 'w-6 h-6 text-[9px]', sm: 'w-8 h-8 text-[10px]', md: 'w-11 h-11 text-xs', lg: 'w-16 h-16 text-base', xl: 'w-24 h-24 text-xl' };

export function Avatar({
  src,
  name,
  size = 'md',
  className,
}: {
  src?: string;
  name?: string;
  size?: keyof typeof AVATAR_SIZES;
  className?: string;
}) {
  const initial = (name ?? '?').trim().charAt(0).toUpperCase();
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden',
        'bg-elevated border border-line rounded-full font-bold text-text-secondary',
        AVATAR_SIZES[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name ? `${name}` : ''} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        initial
      )}
    </span>
  );
}

/* --------------------------------------------------------------- stat */

/** Metric tile. Stats strips were hand-rolled per screen with different sizes. */
export function Stat({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 bg-card border border-line rounded-[var(--radius-md)]',
        className
      )}
    >
      {icon && <span className="text-text-muted shrink-0">{icon}</span>}
      <div className="min-w-0">
        <p className="text-lg font-black tabular-nums tracking-tight text-text leading-none">{value}</p>
        <p className="mt-1 text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted truncate">
          {label}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- tabs */

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export function Tabs({
  items,
  value,
  onChange,
  className,
}: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 p-1 bg-card border border-line rounded-full',
        className
      )}
    >
      {items.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={cn(
              // 44px target: these were 38px, under the minimum
              'inline-flex items-center gap-2 h-11 px-4 rounded-full transition-colors',
              'text-[var(--text-label)] font-bold uppercase tracking-[0.14em]',
              active ? 'bg-accent text-on-accent' : 'text-text-muted hover:text-text'
            )}
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ table */

export function Table({
  head,
  children,
  className,
}: {
  head: React.ReactNode[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('overflow-x-auto border border-line rounded-[var(--radius-lg)]', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line">
            {head.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn('px-4 py-3 text-text align-middle', className)}>{children}</td>;
}

/* ----------------------------------------------------------- description list */

/** Label/value pairs — item specs, order details, settings summaries. */
export function DescriptionList({
  items,
  className,
}: {
  items: { label: string; value: React.ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={cn('grid gap-x-6 gap-y-4 sm:grid-cols-2', className)}>
      {items.map((it, i) => (
        <div key={i} className="min-w-0">
          <dt className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
            {it.label}
          </dt>
          <dd className="mt-1 text-sm text-text break-words">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
