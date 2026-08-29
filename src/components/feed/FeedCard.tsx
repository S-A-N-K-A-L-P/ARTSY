'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, ImageOff, Layers, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';
import { useImageRatio, placeholderRatio } from '@/hooks/useImageRatio';

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

export default function FeedCard({ item }: { item: DiscoveryItem }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [saved, setSaved] = useState(false);
  const isPage = item.type === 'page';

  // Placeholder only — replaced by the image's real ratio once it loads.
  const fallbackRatio = useMemo(
    () => placeholderRatio(item.id, isPage ? PAGE_RATIOS : ITEM_RATIOS),
    [item.id, isPage]
  );
  const { ratio, onLoad, onError, failed } = useImageRatio(fallbackRatio);

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
        {item.image && !failed ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-text-muted">
            <ImageOff size={22} className="opacity-50" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-70">
              No image
            </span>
          </span>
        )}

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
          {isPurchasable && (
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold tabular-nums"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {`₹${item.price!.toLocaleString('en-IN')}`}
            </span>
          )}

          {isPurchasable ? (
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${item.title} to bag`}
              className="h-11 w-11 sm:h-9 sm:w-auto sm:px-4 rounded-full flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-tight active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              <ShoppingBag size={16} className="shrink-0" />
              <span className="hidden sm:inline">Add to bag</span>
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

          <span className="flex items-center gap-1.5 min-w-0">
            <img
              src={item.creator.avatar}
              alt=""
              loading="lazy"
              className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-white/40"
            />
            <span className="text-[11px] font-medium text-white truncate drop-shadow">
              {item.creator.username}
            </span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved((s) => !s);
            }}
            aria-label={saved ? 'Remove from saved' : 'Save'}
            aria-pressed={saved}
            className="h-11 w-11 sm:h-8 sm:w-8 rounded-full flex items-center justify-center active:scale-90 transition-transform shrink-0"
            style={{
              backgroundColor: saved ? 'var(--accent)' : 'var(--bg-secondary)',
              color: saved ? 'var(--on-accent)' : 'var(--text-primary)',
            }}
          >
            <Heart size={14} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/*
        One quiet line, not a caption block.
        This was a title plus an avatar row under every single tile — roughly
        48px of chrome per pin, which lined the board up into visible rows and
        pulled the eye off the imagery. Pinterest shows nothing under most pins;
        the creator moves onto the tile on hover, where it does not cost layout.
      */}
      <div className="mt-1.5 px-1 flex items-center gap-1.5">
        <h3
          className="text-[13px] font-medium leading-snug truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.title}
        </h3>
        {isPage && (
          <ArrowUpRight
            size={13}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-muted)' }}
          />
        )}
      </div>
    </motion.article>
  );
}
