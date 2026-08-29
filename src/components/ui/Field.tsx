'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ label */

export function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted',
        className
      )}
    >
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ field */

export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  /** Receives the generated id so the control can be wired to the label. */
  children: (id: string, describedBy?: string) => React.ReactNode;
}

/**
 * Label + control + hint/error, wired for accessibility.
 *
 * Forms across the app were rendering bare inputs with an error `<p>` floating
 * near them and no `htmlFor`/`aria-describedby`, so nothing was announced and
 * clicking a label did nothing.
 */
export function Field({ label, hint, error, required, className, children }: FieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-accent-text ml-1">*</span>}
        </Label>
      )}

      {children(id, describedBy)}

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[var(--text-caption)] text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[var(--text-caption)] text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- inputs */

const CONTROL = [
  'w-full bg-elevated text-text placeholder:text-text-muted',
  'border border-line rounded-[var(--radius-md)]',
  'transition-colors outline-none',
  'focus:border-accent focus:ring-4 focus:ring-[var(--accent-soft)]',
  'disabled:opacity-45 disabled:pointer-events-none',
  'aria-[invalid=true]:border-red-500',
].join(' ');

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, invalid, className, ...props },
  ref
) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(CONTROL, 'h-12 text-sm', icon ? 'pl-11 pr-4' : 'px-4', className)}
        {...props}
      />
    </div>
  );
});

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, rows = 4, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL, 'p-4 text-sm resize-y leading-relaxed', className)}
      {...props}
    />
  );
});

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL, 'h-12 px-4 text-sm appearance-none', className)}
      {...props}
    >
      {children}
    </select>
  );
});
