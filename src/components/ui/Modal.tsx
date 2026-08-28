'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const SIZES = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-3xl' };

/**
 * Dialog with the behaviour the hand-rolled ones were missing: Escape to
 * close, a focus trap, focus restored to the opener, background scroll lock,
 * and real dialog semantics. The previous modals were bare divs, so keyboard
 * and screen-reader users could not close or even reach them.
 */
export function Modal({ open, onClose, title, description, footer, size = 'md', children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Focus the first tabbable thing in the panel, or the panel itself.
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )?.focus() ?? panel?.focus();

    return () => {
      document.body.style.overflow = overflow;
      openerRef.current?.focus?.();
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onKeyDown={onKeyDown}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          'relative z-10 w-full bg-card border border-line shadow-[var(--elevation-medium)]',
          'rounded-t-[var(--radius-lg)] sm:rounded-[var(--radius-lg)]',
          'max-h-[90vh] flex flex-col outline-none',
          SIZES[size]
        )}
      >
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 p-5 md:p-6 border-b border-line">
            <div className="min-w-0">
              {title && <h2 className="text-lg font-bold tracking-tight text-text">{title}</h2>}
              {description && (
                <p className="mt-1 text-[var(--text-caption)] text-text-secondary">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="shrink-0 p-2 -m-2 text-text-muted hover:text-text transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5 md:p-6">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 p-5 md:p-6 border-t border-line">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
