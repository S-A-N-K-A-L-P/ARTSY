'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useCart } from '@/components/cart/CartProvider';
import { resolveTheme } from '@/lib/theme/themes';
import { useIsMobile } from '@/hooks/useIsMobile';
import Masonry from 'react-masonry-css';
import { ShoppingBag, X } from 'lucide-react';

/* --- Retail Library Imports --- */
import { StickyAddToCart } from '@/components/retail/StickyAddToCart';
import { ReviewStars } from '@/components/retail/ReviewStars';
import { PromoBanner } from '@/components/retail/PromoBanner';
import { BreadcrumbTrail } from '@/components/retail/BreadcrumbTrail';
import { FilterDrawer } from '@/components/retail/FilterDrawer';
import { QuantitySelector } from '@/components/retail/QuantitySelector';
import { OptionPicker } from '@/components/retail/OptionPicker';
import { StoreStatus } from '@/components/retail/StoreStatus';
import { CartDrawer } from '@/components/retail/CartDrawer';
import { DesktopCategoryNav } from '@/components/retail/DesktopCategoryNav';
import { ImageCarousel } from '@/components/retail/ImageCarousel';
import { ProductQuickView } from '@/components/retail/ProductQuickView';
import { SizeGuideModal } from '@/components/retail/SizeGuideModal';
import { ShippingStatus } from '@/components/retail/ShippingStatus';
import { PaymentTrustBadge } from '@/components/retail/PaymentTrustBadge';
import { RelatedProducts } from '@/components/retail/RelatedProducts';
import { NewsletterMinimal } from '@/components/retail/NewsletterMinimal';
import { StoreAnnouncement } from '@/components/retail/StoreAnnouncement';
import { BrandStorySection } from '@/components/retail/BrandStorySection';
import { TechSpecsTable } from '@/components/retail/TechSpecsTable';
import { CheckoutSteps } from '@/components/retail/CheckoutSteps';

export default function PublicPageClient({ page, user, items }: any) {
  const { items: cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const isMobile = useIsMobile(1024);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Artifacts');
  const [showPromo, setShowPromo] = useState(true);

  // The creator's chosen aesthetic, scoped to this storefront subtree. This is
  // the whole product promise: a noir shop must actually render as noir. The
  // page fetched aesthetic.theme from Mongo and previously discarded it.
  const storeTheme = resolveTheme(page?.aesthetic?.theme);

  if (isMobile === null) return null;

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
      {/* 1. Global Announcement Depth */}
      <PromoBanner 
        message={`${page.name} — curated by @${user.username}`} 
        isVisible={showPromo} 
        onClose={() => setShowPromo(false)} 
      />

      {isMobile ? (
        <IOSView 
          page={page} 
          user={user} 
          items={items} 
          setSelectedItem={setSelectedItem}
          setIsCartOpen={setIsCartOpen}
          setIsFilterOpen={setIsFilterOpen}
          activeCategory={activeCategory}
        />
      ) : (
        <DesktopView 
          page={page} 
          user={user} 
          items={items} 
          setSelectedItem={setSelectedItem}
          setIsCartOpen={setIsCartOpen}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}

      {/* Shared Depth Layers */}
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
        categories={['All Artifacts', 'Ceramics', 'Textiles', 'Obscure Objects', 'Digital Matter']}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <AnimatePresence>
        {selectedItem && (
           <ItemDetailOverlay 
             item={selectedItem} 
             onClose={() => setSelectedItem(null)} 
             onAddToCart={handleAddToCart}
             relatedItems={items.filter((it: any) => it._id !== selectedItem._id)}
             setSelectedItem={setSelectedItem}
           />
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- iOS View (Tactile, Story-driven) --- */
function IOSView({ page, user, items, setSelectedItem, setIsCartOpen, setIsFilterOpen, activeCategory }: any) {
  return (
    <div className="pb-40">
      {/* Premium iOS Header */}
      <div className="px-6 pt-12 pb-8 flex items-center justify-between sticky top-0 bg-card/80 backdrop-blur-3xl z-40 border-b border-line">
        <StoreStatus isOpen={true} message="Active manifestation" />
        <div className="flex items-center gap-3">
           <button onClick={() => setIsCartOpen(true)} className="relative w-12 h-12 rounded-2xl bg-accent text-bg flex items-center justify-center shadow-xl">
              <ShoppingBag size={20} />
           </button>
        </div>
      </div>

      <div className="px-6 mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-text leading-tight">{page.name}</h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted mt-2">Compiled by @{user.username}</p>
      </div>

      {/* Tactical Category Chips */}
      <div className="flex gap-2 px-6 overflow-x-auto pb-8 scrollbar-hide">
         {['All Artifacts', 'Ceramics', 'Textiles', 'Obscure'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setIsFilterOpen(true)}
              className={cn(
                "px-6 h-10 rounded-full border text-[10px] font-bold uppercase tracking-widest shrink-0 transition-all",
                activeCategory === cat ? "bg-accent border-accent text-bg shadow-lg" : "bg-elevated border-line text-text-muted"
              )}
            >
              {cat}
            </button>
         ))}
      </div>

      {/* Lush Masonry with Depth Injections */}
      <div className="px-6">
        <Masonry breakpointCols={2} className="flex gap-4" columnClassName="flex flex-col gap-4">
          {items.map((item: any, i: number) => (
            <React.Fragment key={item._id}>
              {/* Inject Brand Story & Announcements randomly for depth */}
              {i === 2 && (
                <div className="col-span-2 py-8">
                   <StoreAnnouncement title="Convergence Notice" message="New archival objects arriving in 48 hours." />
                </div>
              )}
              <GalleryCard item={item} onSelect={setSelectedItem} isMobile />
              {i === 5 && (
                <div className="col-span-2 py-8">
                   <NewsletterMinimal />
                </div>
              )}
            </React.Fragment>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

/* --- Desktop View (Cinematic & Immersive) --- */
function DesktopView({ page, user, items, setSelectedItem, setIsCartOpen, activeCategory, setActiveCategory }: any) {
  return (
    <div className="flex min-h-screen items-start">
      {/* Cinematic Left Panel */}
      <div className="w-[380px] shrink-0 border-r border-line p-10 flex flex-col justify-between gap-10 bg-card sticky top-0 h-screen overflow-y-auto z-40">
        <div>
           <BreadcrumbTrail items={[{ label: page.name, href: '#' }]} />
           <div className="w-24 h-24 rounded-ios overflow-hidden border border-line shadow-[var(--elevation-medium)] mb-10">
              <img src={page.coverImage} alt="" className="w-full h-full object-cover" />
           </div>
           <h1 className="text-5xl font-black tracking-tighter text-text leading-tight mb-6">{page.name}</h1>
           <p className="text-base text-text-secondary font-medium leading-relaxed mb-12 max-w-xs">
              {page.description || `A collection by @${user.username}.`}
           </p>
           
           <DesktopCategoryNav 
             categories={['All Artifacts', 'Ceramics', 'Textiles', 'Digital Matter']} 
             activeCategory={activeCategory}
             onSelectCategory={setActiveCategory}
           />
        </div>

        <div className="space-y-8">
           <StoreStatus isOpen={true} />
           <button 
             onClick={() => setIsCartOpen(true)}
             className="w-full h-14 rounded-2xl bg-accent text-bg font-bold text-xs uppercase tracking-[0.3em] shadow-[var(--elevation-medium)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
           >
              Open Manifest ({items.length})
           </button>
        </div>
      </div>

      {/* Horizontal Cinematic Grid */}
      <div className="flex-1 min-w-0 p-10 xl:p-16 bg-bg">
         <BrandStorySection 
           title="archival depth" 
           story="Each piece in this collection has been selected for its unique manifestation of geometric balance and textural depth."
           image={items[0]?.image}
         />

         <div className="mt-24">
            <Masonry
              breakpointCols={{ default: 4, 1536: 3, 1280: 3, 1024: 2 }}
              className="flex gap-5"
              columnClassName="flex flex-col"
            >
               {items.map((item: any, i: number) => (
                  <React.Fragment key={item._id}>
                     <GalleryCard item={item} onSelect={setSelectedItem} />
                     {i === 3 && <div className="py-12"><NewsletterMinimal /></div>}
                  </React.Fragment>
               ))}
            </Masonry>
         </div>

         {items.length === 0 && (
            <div className="py-32 text-center border border-dashed border-line rounded-ios">
               <ShoppingBag size={36} className="mx-auto mb-4 text-text-muted opacity-40" />
               <p className="text-sm font-medium text-text-secondary">This archive is empty for now.</p>
            </div>
         )}

         {items.length > 0 && (
           <div className="mt-24 border-t border-line pt-24 mb-20">
              <RelatedProducts items={items} onSelect={setSelectedItem} />
           </div>
         )}
      </div>
    </div>
  );
}

/* --- Refined Gallery Card --- */
function GalleryCard({ item, onSelect, isMobile }: any) {
  // Aspect ratios rather than fixed pixel heights, so tiles scale with the
  // column and the board staggers instead of cropping every image to a box.
  const ratio = React.useMemo(() => {
    const variants = ['3 / 4', '1 / 1', '4 / 5', '2 / 3'];
    let hash = 0;
    for (let i = 0; i < item._id.length; i++) hash = (hash * 31 + item._id.charCodeAt(i)) >>> 0;
    return variants[hash % variants.length];
  }, [item._id]);

  return (
    <motion.div onClick={() => onSelect(item)} className="group cursor-pointer mb-2">
      <div className="rounded-ios overflow-hidden bg-elevated border border-line relative shadow-[var(--elevation-soft)] hover:shadow-[var(--elevation-medium)] transition-shadow duration-500 mb-5" style={{ aspectRatio: ratio }}>
        <img src={item.image || item.images?.[0]} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
           <div className="w-14 h-14 rounded-full bg-card text-text flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500">
              <ShoppingBag size={24} />
           </div>
        </div>
      </div>
      <div className="mt-5 px-2">
         <h4 className="text-sm font-bold text-text truncate tracking-tight">{item.title}</h4>
         <p className="text-xs font-bold text-text-secondary tabular-nums mt-1">
            ₹{Number(item.price || 0).toLocaleString('en-IN')}
         </p>
      </div>
    </motion.div>
  );
}

/* --- High-Depth Item Overlay --- */
function ItemDetailOverlay({ item, onClose, onAddToCart, relatedItems, setSelectedItem }: any) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Gamma');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-2xl p-0 md:p-12 overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        layoutId={`item-${item._id}`}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="relative w-full md:max-w-7xl min-h-[90vh] bg-card rounded-t-[48px] md:rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
      >
        <div className="flex-1 bg-elevated flex flex-col">
           <div className="flex-1 overflow-hidden">
              <ImageCarousel images={item.images || [item.image]} className="h-full" />
           </div>
           
           {/* Detailed Table for Depth */}
           <div className="p-12 bg-card border-t border-line hidden md:block">
              <TechSpecsTable specs={[
                { label: 'Origin', value: 'Astl Archives' },
                { label: 'Material', value: 'Reinforced Digital Matter' },
                { label: 'Integrity', value: 'Level 4' }
              ]} />
           </div>
        </div>

        <div className="w-full md:w-[540px] p-10 md:p-20 overflow-y-auto bg-card border-l border-line flex flex-col justify-between">
           <div className="space-y-12">
              <div className="flex items-center justify-between">
                 <StoreStatus isOpen={true} />
                 <button onClick={onClose} className="p-2 text-text-muted hover:text-text transition-colors"><X size={24} /></button>
              </div>

              <div className="space-y-4">
                 <ReviewStars rating={4.8} count={24} />
                 <h2 className="text-5xl font-black tracking-tighter text-text leading-[0.9]">{item.title}</h2>
                 <p className="text-base text-text-secondary font-medium leading-relaxed">
                   Experience the silent resonance of an archival artifact designed for high-depth manifestation. Part of the limited v2 release.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Inventory Value</span>
                    <p className="text-3xl font-black text-text tracking-tighter">₹{item.price}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Identity</span>
                    <p className="text-xs font-bold text-text uppercase tracking-widest leading-loose">#{item._id.slice(-6)}</p>
                 </div>
              </div>

              <div className="space-y-8 py-10 border-y border-line">
                 <OptionPicker label="select architecture" options={['Alpha', 'Beta', 'Gamma', 'Delta']} selected={size} onChange={setSize} />
                 <button onClick={() => setShowSizeGuide(true)} className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-text transition-all flex items-center gap-2 underline decoration-line underline-offset-4">
                    Dimension Protocols
                 </button>
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">manifest quantity</span>
                    <QuantitySelector quantity={quantity} onChange={setQuantity} />
                 </div>
              </div>

              <ShippingStatus status="ordered" date="December 24th" />
              <PaymentTrustBadge />

              <div className="pt-10">
                 <RelatedProducts items={relatedItems} onSelect={(it) => { onClose(); setSelectedItem(it); }} />
              </div>
           </div>

           <div className="pt-16 pb-4 flex flex-col gap-4">
              <button 
                onClick={() => { onAddToCart(item); onClose(); }} 
                className="w-full h-14 rounded-2xl bg-accent text-bg font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-[var(--elevation-medium)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                 <ShoppingBag size={20} /> Deploy manifest (₹{item.price * quantity})
              </button>
           </div>
        </div>
      </motion.div>

      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </motion.div>
  );
}
