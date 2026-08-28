'use client';

import React from 'react';
import { Maximize2 } from 'lucide-react';
import { AestheticItem } from '@/types/creator';
import { Badge, DescriptionList, Card } from '@/components/ui';

const money = (n?: number, currency = '₹') =>
  `${currency}${Number(n ?? 0).toLocaleString('en-IN')}`;

/** Storefront tile with a hover reveal. */
export const HoverPreviewCard = ({
  item,
  onClick,
}: {
  item: AestheticItem;
  onClick?: () => void;
}) => (
  <article className="group">
    <div
      role="link"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={item.title}
      // Ratio rather than a fixed h-[450px], so tiles scale with the column.
      className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer rounded-[var(--radius-lg)] bg-elevated border border-line transition-shadow duration-300 hover:shadow-[var(--elevation-medium)]"
    >
      {item.images?.[0] && (
        <img
          src={item.images[0]}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-60 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center text-text [@media(hover:hover)]:opacity-0 group-hover:opacity-100 transition-opacity">
        <Maximize2 size={15} />
      </span>

      {item.aesthetic && (
        <span className="absolute top-3 left-3 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge tone="accent">{item.aesthetic}</Badge>
        </span>
      )}
    </div>

    <div className="mt-2.5 px-0.5">
      <h3 className="text-sm font-semibold text-text line-clamp-1">{item.title}</h3>
      <p className="mt-1 text-xs font-bold tabular-nums text-text-secondary">
        {money(item.price, item.currency)}
      </p>
    </div>
  </article>
);

/** Item attributes as a label/value list. */
export const AttributeDataGrid = ({ attributes }: { attributes?: Record<string, string> }) => {
  const items = Object.entries(attributes ?? {})
    .filter(([, v]) => v != null && String(v).trim())
    .map(([label, value]) => ({ label, value: String(value) }));

  if (items.length === 0) return null;
  return <DescriptionList items={items} />;
};

/**
 * Item detail rail.
 *
 * This previously asserted "curated on March 2026. Part of the Digital
 * Renaissance collection." for every item — invented provenance. It now shows
 * only what the item actually carries.
 */
export const ItemDetailSidebarDesktop = ({ item }: { item: AestheticItem }) => {
  const details = [
    item.owner ? { label: 'Managed by', value: item.owner } : null,
    item.category ? { label: 'Category', value: item.category } : null,
    item.aesthetic ? { label: 'Aesthetic', value: item.aesthetic } : null,
    item.price != null ? { label: 'Price', value: money(item.price, item.currency) } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  if (details.length === 0) return null;

  return (
    <Card>
      <h4 className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted mb-4">
        Details
      </h4>
      <DescriptionList items={details} />
    </Card>
  );
};
