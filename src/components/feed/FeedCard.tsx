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
        className="relative w-full overflow-hidden cursor-zoom-in rounded-[var(--radius)] transition-shadow duration-300 hover:shadow-[var(--elevation-medium)]"
        style={{ aspectRatio: ratio, backgroundColor: 'var(--bg-tertiary)' }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Scrim only on hover, so the board stays clean at rest — the way a pin
            grid reads before you engage with it. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25 opacity-60 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Save — top right, the primary affordance on a pin */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved((s) => !s);
          }}
          aria-label={saved ? 'Remove from saved' : 'Save'}
          aria-pressed={saved}
          className={cn(
            'absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center',
            '[@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
            '[@media(hover:hover)]:translate-y-1 group-hover:translate-y-0 transition-all duration-300',
            'active:scale-90 shadow-[var(--elevation-soft)]'
          )}
          style={{
            backgroundColor: saved ? 'var(--accent)' : 'var(--bg-secondary)',
            color: saved ? 'var(--bg-primary)' : 'var(--text-primary)',
          }}
        >
          <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>

        {/* Aesthetic tag — the category axis this whole product is built on */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md [@media(hover:hover)]:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
          {item.aesthetic}
        </span>

        {/* Bottom action row */}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:hover)]:translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          {isPurchasable ? (
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold tabular-nums shadow-[var(--elevation-soft)]"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {`₹${item.price!.toLocaleString('en-IN')}`}
            </span>
          ) : (
            <span />
          )}

          {isPurchasable ? (
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${item.title} to bag`}
              className="h-9 px-3.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] active:scale-95 transition-transform shadow-[var(--elevation-soft)]"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              <ShoppingBag size={13} />
              Add
            </button>
          ) : (
            isPage && (
              <span
                className="h-9 px-3.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] shadow-[var(--elevation-soft)]"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                <Layers size={13} />
                Visit
              </span>
            )
          )}
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
