'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/** Horizontally scrolling category chips. */
export const CategoryScrollerMobile = ({
  cats,
  selected,
  onSelect,
}: {
  cats: string[];
  selected: string;
  onSelect: (cat: string) => void;
}) => (
  <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
    {cats.map((c) => {
      const active = selected === c;
      return (
        <button
          key={c}
          onClick={() => onSelect(c)}
          aria-pressed={active}
          className={cn(
            // 36px was under the 44px minimum tap target
            'px-4 h-11 rounded-full border shrink-0 whitespace-nowrap transition-colors',
            'text-[var(--text-label)] font-bold uppercase tracking-[0.12em]',
            active
              ? 'bg-accent border-accent text-on-accent'
              : 'bg-card border-line text-text-muted hover:text-text'
          )}
        >
          {c}
        </button>
      );
    })}
  </div>
);
