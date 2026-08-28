'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Layers, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';

interface DiscoveryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  price?: number;
  aesthetic: string;
  pageSlug?: string;
  creator: { username: string; avatar: string };
  type: 'item' | 'page';
}

/**
 * Pinterest-style ratios. The old card used fixed pixel heights, so every tile
 * was the same size regardless of column width and every image got cropped to
 * fit. Ratios scale with the column instead, so the masonry staggers the way a
 * pin board does.
 */
const ITEM_RATIOS = ['3 / 4', '1 / 1', '4 / 5', '2 / 3', '5 / 6'];
const PAGE_RATIOS = ['4 / 3', '1 / 1', '5 / 4'];

/** Stable per-id pick, so a tile keeps its shape across re-renders. */
function pickRatio(id: string, ratios: string[]) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return ratios[hash % ratios.length];
}

export default function FeedCard({ item }: { item: DiscoveryItem }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [saved, setSaved] = useState(false);
  const isPage = item.type === 'page';

  const ratio = useMemo(
    () => pickRatio(item.id, isPage ? PAGE_RATIOS : ITEM_RATIOS),
    [item.id, isPage]
  );

  const handleNavigate = () => {
    if (isPage && item.pageSlug) {
      router.push(`/user/${item.creator.username}/${item.pageSlug}`);
    } else {
      router.push(`/user/${item.creator.username}/${item.pageSlug || 'item'}/${item.id}`);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price ?? 0,
      image: item.image,
    });
  };

  const isPurchasable = !isPage && typeof item.price === 'number' && item.price > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="group mb-4"
    >
      <div
        role="link"
        tabIndex={0}
        onClick={handleNavigate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigate();
          }
        }}
        aria-label={`${item.title} by ${item.creator.username}`}
        className="relative w-full overflow-hidden cursor-zoom-in rounded-2xl bg-elevated"
        style={{ aspectRatio: ratio }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Scrim only on hover, so the board stays clean at rest — the way a pin
            grid reads before you engage with it. */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/*
          Pinterest puts its primary action — Save — as a filled pill in the
          top-right of the pin. astl's primary action is Add to bag, so it takes
          that slot. Save demotes to a quiet circle beside the price.
        */}
        <div
          className={cn(
            'absolute top-2.5 right-2.5 flex items-center gap-2',
            '[@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100',
            'transition-opacity duration-200'
          )}
        >
          {isPurchasable ? (
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${item.title} to bag`}
              className="h-9 px-4 rounded-full flex items-center gap-1.5 text-[11px] font-bold tracking-tight active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              <ShoppingBag size={14} />
              Add to bag
            </button>
          ) : (
            isPage && (
              <span
                className="h-9 px-4 rounded-full flex items-center gap-1.5 text-[11px] font-bold tracking-tight"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
              >
                <Layers size={14} />
                Visit
              </span>
            )
          )}
        </div>

        {/* Bottom row: price, then the quiet save */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          {isPurchasable ? (
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold tabular-nums"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {`₹${item.price!.toLocaleString('en-IN')}`}
            </span>
          ) : (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em]"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff' }}
            >
              {item.aesthetic}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved((s) => !s);
            }}
            aria-label={saved ? 'Remove from saved' : 'Save'}
            aria-pressed={saved}
            className="h-8 w-8 rounded-full flex items-center justify-center active:scale-90 transition-transform shrink-0"
            style={{
              backgroundColor: saved ? 'var(--accent)' : 'var(--bg-secondary)',
              color: saved ? 'var(--on-accent)' : 'var(--text-primary)',
            }}
          >
            <Heart size={14} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Caption sits outside the tile, unboxed — pin boards keep metadata quiet
          so the imagery carries the grid. */}
      <div className="mt-2 px-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-[13px] font-semibold leading-snug line-clamp-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {item.title}
          </h3>
          {isPage && (
            <ArrowUpRight
              size={14}
              className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
            />
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1.5">
          <img
            src={item.creator.avatar}
            alt=""
            loading="lazy"
            className="w-5 h-5 rounded-full object-cover"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          />
          <span
            className="text-[11px] font-medium truncate"
            style={{ color: 'var(--text-muted)' }}
          >
            {item.creator.username}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
