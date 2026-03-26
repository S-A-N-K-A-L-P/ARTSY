'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '@/store/cartSlice';
import { useIsMobile } from '@/hooks/useIsMobile';
import Masonry from 'react-masonry-css';
import { ShoppingBag, X } from 'lucide-react';

/* --- Retail Library Imports --- */
import { StickyAddToCart } from '@/components/retail/StickyAddToCart';
import { ReviewStars } from '@/components/retail/ReviewStars';
import { InventoryBadge } from '@/components/retail/InventoryBadge';
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
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const isMobile = useIsMobile(1024);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Artifacts');
  const [showPromo, setShowPromo] = useState(true);

  if (isMobile === null) return null;

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item._id,
      title: item.title,
      price: item.price,
      image: item.images?.[0] || item.image
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Global Announcement Depth */}
      <PromoBanner 
        message="Astal v2 Archives: Winter Zenith Collection Now Manifesting" 
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
        onRemove={(id) => dispatch(removeFromCart(id))}
        onUpdateQuantity={(id, q) => dispatch(updateQuantity({ id, quantity: q }))}
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
      <div className="px-6 pt-12 pb-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-3xl z-40 border-b border-neutral-50/50">
        <StoreStatus isOpen={true} message="Active manifestation" />
        <div className="flex items-center gap-3">
           <button onClick={() => setIsCartOpen(true)} className="relative w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xl">
              <ShoppingBag size={20} />
           </button>
        </div>
      </div>

      <div className="px-6 mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-neutral-900 leading-tight">{page.name}</h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300 mt-2">Compiled by @{user.username}</p>
      </div>

      {/* Tactical Category Chips */}
      <div className="flex gap-2 px-6 overflow-x-auto pb-8 scrollbar-hide">
         {['All Artifacts', 'Ceramics', 'Textiles', 'Obscure'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setIsFilterOpen(true)}
              className={cn(
                "px-6 h-10 rounded-full border text-[10px] font-bold uppercase tracking-widest shrink-0 transition-all",
                activeCategory === cat ? "bg-neutral-900 border-neutral-900 text-white shadow-lg" : "bg-neutral-50 border-neutral-100 text-neutral-400"
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
    <div className="flex h-screen overflow-hidden">
      {/* Cinematic Left Panel */}
      <div className="w-[480px] border-r border-neutral-100 p-16 flex flex-col justify-between bg-white z-50">
        <div>
           <BreadcrumbTrail items={[{ label: page.name, href: '#' }]} />
           <div className="w-24 h-24 rounded-[32px] overflow-hidden border border-neutral-100 shadow-2xl mb-10">
              <img src={page.coverImage} className="w-full h-full object-cover" />
           </div>
           <h1 className="text-5xl font-black tracking-tighter text-neutral-900 leading-tight mb-6">{page.name}</h1>
           <p className="text-base text-neutral-500 font-medium leading-relaxed mb-12 max-w-xs">
              A meticulously gathered archive of high-depth artifacts, curated for visual resonance and material integrity.
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
             className="w-full h-18 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.3em] shadow-2xl shadow-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
           >
              Open Manifest ({items.length})
           </button>
        </div>
      </div>

      {/* Horizontal Cinematic Grid */}
      <div className="flex-1 overflow-y-auto p-20 bg-neutral-50/20">
         <BrandStorySection 
           title="archival depth" 
           story="Each piece in this collection has been selected for its unique manifestation of geometric balance and textural depth."
           image={items[0]?.image}
         />

         <div className="mt-24">
            <Masonry breakpointCols={3} className="flex gap-12" columnClassName="flex flex-col gap-12">
               {items.map((item: any, i: number) => (
                  <React.Fragment key={item._id}>
                     <GalleryCard item={item} onSelect={setSelectedItem} />
                     {i === 3 && <div className="py-12"><NewsletterMinimal /></div>}
                  </React.Fragment>
               ))}
            </Masonry>
         </div>

         <div className="mt-32 border-t border-neutral-100 pt-32 mb-20">
            <RelatedProducts items={items} onSelect={setSelectedItem} />
         </div>
      </div>
    </div>
  );
}

/* --- Refined Gallery Card --- */
function GalleryCard({ item, onSelect, isMobile }: any) {
  const height = React.useMemo(() => {
    const variants = isMobile ? [200, 240, 280] : [320, 380, 440, 360];
    const seed = item._id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return variants[seed % variants.length];
  }, [item._id, isMobile]);

  return (
    <motion.div onClick={() => onSelect(item)} className="group cursor-pointer">
      <div className="rounded-[40px] overflow-hidden bg-white border border-neutral-100 relative shadow-sm hover:shadow-2xl transition-all duration-1000" style={{ height: `${height}px` }}>
        <img src={item.image || item.images?.[0]} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
           <div className="w-14 h-14 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500">
              <ShoppingBag size={24} />
           </div>
        </div>
      </div>
      <div className="mt-5 px-2">
         <InventoryBadge count={10} className="mb-2" />
         <h4 className="text-sm font-bold text-neutral-900 truncate tracking-tight">{item.title}</h4>
         <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mt-1">₹{item.price}</p>
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
        className="relative w-full md:max-w-7xl min-h-[90vh] bg-white rounded-t-[48px] md:rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
      >
        <div className="flex-1 bg-neutral-50/50 flex flex-col">
           <div className="flex-1 overflow-hidden">
              <ImageCarousel images={item.images || [item.image]} className="h-full" />
           </div>
           
           {/* Detailed Table for Depth */}
           <div className="p-12 bg-white border-t border-neutral-100 hidden md:block">
              <TechSpecsTable specs={[
                { label: 'Origin', value: 'Astal Archives' },
                { label: 'Material', value: 'Reinforced Digital Matter' },
                { label: 'Integrity', value: 'Level 4' }
              ]} />
           </div>
        </div>

        <div className="w-full md:w-[540px] p-10 md:p-20 overflow-y-auto bg-white border-l border-neutral-100 flex flex-col justify-between">
           <div className="space-y-12">
              <div className="flex items-center justify-between">
                 <StoreStatus isOpen={true} />
                 <button onClick={onClose} className="p-2 text-neutral-200 hover:text-neutral-900 transition-colors"><X size={24} /></button>
              </div>

              <div className="space-y-4">
                 <ReviewStars rating={4.8} count={24} />
                 <h2 className="text-5xl font-black tracking-tighter text-neutral-900 leading-[0.9]">{item.title}</h2>
                 <p className="text-base text-neutral-500 font-medium leading-relaxed">
                   Experience the silent resonance of an archival artifact designed for high-depth manifestation. Part of the limited v2 release.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 px-1">Inventory Value</span>
                    <p className="text-3xl font-black text-neutral-900 tracking-tighter">₹{item.price}</p>
                 </div>
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 px-1">Identity</span>
                    <p className="text-xs font-bold text-neutral-900 uppercase tracking-widest leading-loose">#{item._id.slice(-6)}</p>
                 </div>
              </div>

              <div className="space-y-8 py-10 border-y border-neutral-50">
                 <OptionPicker label="select architecture" options={['Alpha', 'Beta', 'Gamma', 'Delta']} selected={size} onChange={setSize} />
                 <button onClick={() => setShowSizeGuide(true)} className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-all flex items-center gap-2 underline decoration-neutral-100 underline-offset-4">
                    Dimension Protocols
                 </button>
                 <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-1">manifest quantity</span>
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
                className="w-full h-18 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
