'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '@/components/cart/CartProvider';
import { resolveTheme } from '@/lib/theme/themes';
import Masonry from 'react-masonry-css';
import { ShoppingBag, X } from 'lucide-react';

import { PromoBanner } from '@/components/retail/PromoBanner';
import { BreadcrumbTrail } from '@/components/retail/BreadcrumbTrail';
import { FilterDrawer } from '@/components/retail/FilterDrawer';
import { QuantitySelector } from '@/components/retail/QuantitySelector';
import { StoreStatus } from '@/components/retail/StoreStatus';
import { CartDrawer } from '@/components/retail/CartDrawer';
import { DesktopCategoryNav } from '@/components/retail/DesktopCategoryNav';
import { ImageCarousel } from '@/components/retail/ImageCarousel';
import { RelatedProducts } from '@/components/retail/RelatedProducts';
import { PaymentTrustBadge } from '@/components/retail/PaymentTrustBadge';
import { TechSpecsTable } from '@/components/retail/TechSpecsTable';
import { Badge, Button, EmptyState } from '@/components/ui';

const ALL = 'All';

const money = (n: number) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

/** Real specs off the item, rather than the invented "Level 4 / Digital Matter". */
function specsFor(item: any): { label: string; value: string }[] {
  const specs: { label: string; value: string }[] = [];
  const attrs = item?.attributes ?? {};
  Object.entries(attrs).forEach(([k, v]) => {
    if (v != null && String(v).trim()) specs.push({ label: k, value: String(v) });
  });
  (item?.customFields ?? []).forEach((f: any) => {
    if (f?.value != null && String(f.value).trim()) {
      specs.push({ label: f.label || f.key || 'Detail', value: String(f.value) });
    }
  });
  return specs;
}

export default function PublicPageClient({ page, user, items }: any) {
  const { items: cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [showPromo, setShowPromo] = useState(true);

  // The creator's chosen aesthetic, scoped to this storefront subtree. This is
  // the whole product promise: a noir shop must actually render as noir.
  const storeTheme = resolveTheme(page?.aesthetic?.theme);

  // Categories come from the items that actually exist. This was a hardcoded
  // ['All Artifacts','Ceramics','Textiles','Digital Matter'] on every
  // storefront, and selecting one filtered nothing — it was decorative.
  const categories = useMemo(() => {
    const tags = new Set<string>();
    (items ?? []).forEach((i: any) =>
      (i.tags ?? []).forEach((t: string) => t?.trim() && tags.add(t.trim()))
    );
    return [ALL, ...Array.from(tags).sort()];
  }, [items]);

  const visibleItems = useMemo(() => {
    if (activeCategory === ALL) return items ?? [];
    return (items ?? []).filter((i: any) => (i.tags ?? []).includes(activeCategory));
  }, [items, activeCategory]);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item._id,
      title: item.title,
      price: item.price,
      image: item.images?.[0] || item.image,
    });
  };

  return (
    // fontFamily is set explicitly: body already resolved --font in the visitor's
    // own theme, and an inherited font-family is a computed value, so the var
    // would not be re-evaluated inside this scope without it.
    <div
      data-theme={storeTheme}
      style={{ fontFamily: 'var(--font)' }}
      className="min-h-screen bg-bg text-text"
    >
      <PromoBanner
        message={`${page.name} — curated by @${user.username}`}
        isVisible={showPromo}
        onClose={() => setShowPromo(false)}
      />

      {/*
        One responsive layout. This was two entirely separate component trees
        picked by useIsMobile(), which returns null on the server and on first
        render — so the storefront rendered nothing, then swapped. The identity
        panel is a stacked header on small screens and a sticky rail on large.
      */}
      <div className="lg:flex lg:items-start">
        <aside
          className={cn(
            'bg-card border-line px-5 py-8 lg:p-10',
            'border-b lg:border-b-0 lg:border-r',
            'lg:w-[340px] xl:w-[380px] lg:shrink-0 lg:sticky lg:top-0 lg:h-screen',
            'lg:overflow-y-auto flex flex-col gap-8'
          )}
        >
          <div className="flex-1 min-w-0">
            <div className="hidden lg:block">
              <BreadcrumbTrail items={[{ label: page.name, href: '#' }]} />
            </div>

            <div className="flex items-center gap-4 lg:block">
              <div className="w-16 h-16 lg:w-24 lg:h-24 shrink-0 rounded-ios overflow-hidden border border-line lg:mb-8">
                {page.coverImage && (
                  <img src={page.coverImage} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl lg:text-4xl font-black tracking-tighter leading-tight text-text truncate lg:whitespace-normal">
                  {page.name}
                </h1>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted mt-1">
                  @{user.username}
                </p>
              </div>
            </div>

            {page.description && (
              <p className="hidden lg:block text-sm text-text-secondary leading-relaxed mt-6">
                {page.description}
              </p>
            )}

            {/* Only offer filtering when there is something to filter by. */}
            {categories.length > 1 && (
              <div className="hidden lg:block mt-10">
                <DesktopCategoryNav
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                />
              </div>
            )}
          </div>

          <div className="hidden lg:flex flex-col gap-5">
            <StoreStatus isOpen={page?.settings?.isPublic !== false} />
            <Button block size="lg" onClick={() => setIsCartOpen(true)}>
              Open bag ({cartItems.length})
            </Button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 px-4 py-6 lg:p-10 xl:p-14 pb-28 lg:pb-14">
          {/* Mobile category chips — the desktop rail is hidden at this width */}
          {categories.length > 1 && (
            <div className="lg:hidden flex gap-2 overflow-x-auto hide-scrollbar pb-5 -mx-4 px-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={cn(
                    'px-4 h-9 rounded-full border text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors',
                    activeCategory === cat
                      ? 'bg-accent border-accent text-on-accent'
                      : 'bg-card border-line text-text-muted'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {visibleItems.length > 0 ? (
            <Masonry
              breakpointCols={{ default: 4, 1536: 4, 1280: 3, 1024: 2, 640: 2 }}
              className="flex gap-3 md:gap-4"
              columnClassName="flex flex-col"
            >
              {visibleItems.map((item: any) => (
                <GalleryCard
                  key={item._id}
                  item={item}
                  onSelect={setSelectedItem}
                  onAdd={handleAddToCart}
                />
              ))}
            </Masonry>
          ) : (
            <EmptyState
              icon={<ShoppingBag size={34} />}
              title={
                activeCategory === ALL
                  ? 'This archive is empty for now.'
                  : `Nothing tagged \u201C${activeCategory}\u201D yet.`
              }
              action={
                activeCategory !== ALL ? (
                  <Button variant="secondary" onClick={() => setActiveCategory(ALL)}>
                    Show everything
                  </Button>
                ) : undefined
              }
            />
          )}
        </main>
      </div>

      {/* Mobile cart bar — the desktop button lives in the rail */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-16 px-6 bg-accent text-on-accent font-bold text-xs uppercase tracking-[0.24em] flex items-center justify-center gap-3 shadow-[var(--elevation-medium)]"
      >
        <ShoppingBag size={16} />
        Open Manifest ({cartItems.length})
      </button>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <AnimatePresence>
        {selectedItem && (
          <ItemDetailOverlay
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
            relatedItems={(items ?? []).filter((it: any) => it._id !== selectedItem._id)}
            setSelectedItem={setSelectedItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- Gallery card --- */
function GalleryCard({ item, onSelect, onAdd }: any) {
  // Aspect ratios rather than fixed pixel heights, so tiles scale with the
  // column and the board staggers instead of cropping every image to a box.
  const ratio = useMemo(() => {
    const variants = ['3 / 4', '1 / 1', '4 / 5', '2 / 3', '5 / 6'];
    let hash = 0;
    const id = String(item._id);
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return variants[hash % variants.length];
  }, [item._id]);

  const image = item.images?.[0] || item.image;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="group mb-4"
    >
      <div
        role="link"
        tabIndex={0}
        onClick={() => onSelect(item)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(item);
          }
        }}
        aria-label={item.title}
        className="relative w-full overflow-hidden cursor-zoom-in rounded-ios bg-elevated transition-shadow duration-300 hover:shadow-[var(--elevation-medium)]"
        style={{ aspectRatio: ratio }}
      >
        {image && (
          <img
            src={image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-60 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:hover)]:translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          {item.price > 0 ? (
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold tabular-nums shadow-[var(--elevation-soft)]"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {money(item.price)}
            </span>
          ) : (
            <span />
          )}

          {item.isForSale !== false && item.price > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(item);
              }}
              aria-label={`Add ${item.title} to bag`}
              className="h-9 px-3.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] bg-accent text-on-accent active:scale-95 transition-transform shadow-[var(--elevation-soft)]"
            >
              <ShoppingBag size={13} />
              Add
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 px-1">
        <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 text-text">{item.title}</h3>
        {item.price > 0 && (
          <p className="text-xs font-bold tabular-nums mt-1 text-text-secondary">{money(item.price)}</p>
        )}
      </div>
    </motion.article>
  );
}

/* --- Item detail --- */
function ItemDetailOverlay({ item, onClose, onAddToCart, relatedItems, setSelectedItem }: any) {
  const [quantity, setQuantity] = useState(1);
  const specs = useMemo(() => specsFor(item), [item]);
  const images = (item.images?.length ? item.images : [item.image]).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xl p-0 md:p-10 overflow-y-auto"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 280 }}
        className="relative w-full md:max-w-6xl max-h-[92vh] bg-card rounded-t-[32px] md:rounded-ios overflow-hidden flex flex-col md:flex-row shadow-[var(--elevation-medium)] z-10"
      >
        <div className="md:flex-1 bg-elevated min-h-[38vh] md:min-h-0">
          <ImageCarousel images={images} className="h-full" />
        </div>

        <div className="w-full md:w-[460px] md:shrink-0 p-6 md:p-10 overflow-y-auto bg-card md:border-l border-line flex flex-col gap-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-3xl font-black tracking-tighter text-text leading-tight">{item.title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 p-2 text-text-muted hover:text-text transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {item.description && (
            <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
          )}

          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-black tabular-nums text-text tracking-tight">{money(item.price)}</p>
            {item.currency && item.currency !== 'INR' && (
              <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted">
                {item.currency}
              </span>
            )}
          </div>

          {item.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t: string) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          )}

          {/* Only rendered when the item actually carries attributes/customFields */}
          {specs.length > 0 && <TechSpecsTable specs={specs} />}

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Quantity</span>
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
          </div>

          <Button
            block
            size="lg"
            iconLeft={<ShoppingBag size={16} />}
            onClick={() => {
              for (let i = 0; i < quantity; i++) onAddToCart(item);
              onClose();
            }}
          >
            Add to bag
          </Button>

          <PaymentTrustBadge />

          {relatedItems.length > 0 && (
            <RelatedProducts
              items={relatedItems.slice(0, 4)}
              onSelect={(it: any) => {
                onClose();
                setSelectedItem(it);
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
