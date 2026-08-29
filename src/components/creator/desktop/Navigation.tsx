'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PathItem } from '@/types/creator';
import { Section } from '@/components/ui';

/**
 * Storefront category rail.
 *
 * The "Discovery" block above the categories (New Arrivals / Best Sellers /
 * Aesthetic Choice / Limited Edition) was four buttons that filtered nothing,
 * and the "Aesthetic Guarantee" panel was marketing copy asserting a
 * verification process that does not exist. Both are gone; what remains
 * actually drives the grid.
 */
export const SidebarFilterPanel = ({
  categories,
  selectedCat,
  onSelect,
}: {
  categories: string[];
  selectedCat: string;
  onSelect: (cat: string) => void;
}) => (
  <aside className="w-64 shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto hide-scrollbar hidden xl:block">
    <Section title="Categories">
      <div className="space-y-0.5">
        {categories.map((c) => {
          const active = selectedCat === c;
          return (
            <button
              key={c}
              onClick={() => onSelect(c)}
              aria-pressed={active}
              className={cn(
                'w-full text-left px-3 h-11 rounded-[var(--radius-sm)] transition-colors',
                'text-sm font-semibold flex items-center gap-2.5',
                active
                  ? 'bg-accent-soft text-accent-text'
                  : 'text-text-secondary hover:text-text hover:bg-elevated'
              )}
            >
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full shrink-0',
                  active ? 'bg-accent' : 'bg-line-strong'
                )}
              />
              <span className="truncate">{c}</span>
            </button>
          );
        })}
      </div>
    </Section>
  </aside>
);

export const BreadcrumbNavigation = ({ paths }: { paths: PathItem[] }) => (
  <nav
    aria-label="Breadcrumb"
    className="flex items-center gap-2 text-[var(--text-label)] font-bold uppercase tracking-[0.14em]"
  >
    <span className="text-text-muted">Store</span>
    {paths.map((p, i) => (
      <React.Fragment key={i}>
        <ChevronRight size={12} className="text-text-muted opacity-50 shrink-0" />
        <span className={i === paths.length - 1 ? 'text-text' : 'text-text-muted'}>{p.label}</span>
      </React.Fragment>
    ))}
  </nav>
);
