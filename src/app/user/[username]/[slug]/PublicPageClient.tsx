'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Share2, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { themes } from '@/lib/theme/themes';
import { IOSBottomNav } from '@/components/ui/ios/ios-bottom-nav';
import Masonry from 'react-masonry-css';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

export default function PublicPageClient({ page, user, items }: any) {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item._id,
      title: item.title,
      price: item.price
    }));
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-32">
      {/* Minimal Header */}
      <div className="px-6 pt-10 pb-6 flex items-center justify-between border-b border-neutral-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            {page.name}
          </h1>
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest mt-1">
            Manifested by @{user.username}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <Masonry
          breakpointCols={{
            default: 2,
            1100: 2,
            700: 2,
            500: 1
          }}
          className="flex gap-4 md:gap-6"
          columnClassName="flex flex-col gap-4 md:gap-6"
        >
          {items.map((item: any) => (
            <GalleryItem 
              key={item._id} 
              item={item} 
              onSelect={setSelectedItem} 
            />
          ))}
        </Masonry>
      </div>

      {/* Simplified Modal */}
      <AnimatePresence>
        {selectedItem && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-0 md:p-6"
           >
              {/* Overlay Backdrop */}
              <div className="absolute inset-0" onClick={() => setSelectedItem(null)} />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                md-initial={{ scale: 0.95, opacity: 0 }}
                md-animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full md:max-w-4xl max-h-[90vh] bg-white rounded-t-[32px] md:rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
              >
                 <div className="flex-1 bg-neutral-50 flex items-center justify-center p-4">
                    <img 
                      src={selectedItem.image || (selectedItem.images && selectedItem.images.length > 0 ? selectedItem.images[0] : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')} 
                      className="max-w-full max-h-[50vh] md:max-h-full object-contain" 
                    />
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-md rounded-full text-neutral-900 hover:bg-white transition-all shadow-sm"
                    >
                       <X size={20} />
                    </button>
                 </div>

                 <div className="w-full md:w-[380px] p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-100">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-3">{selectedItem.title}</h2>
                        <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                          {selectedItem.description || "A curated artifact of aesthetic convergence."}
                        </p>
                        
                        <div className="py-6 border-y border-neutral-50 mb-8 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Inventory Value</span>
                            <span className="text-xl font-bold text-neutral-900">₹{selectedItem.price}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button 
                          onClick={() => { handleAddToCart(selectedItem); setSelectedItem(null); }}
                          className="w-full h-14 rounded-xl bg-neutral-900 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active:scale-[0.98]"
                        >
                            <ShoppingBag size={18} /> Add to Cart
                        </button>
                        <button className="w-full h-14 rounded-xl border border-neutral-200 text-neutral-900 font-semibold text-sm flex items-center justify-center hover:bg-neutral-50 transition-all">
                            Share Piece
                        </button>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      <IOSBottomNav />
    </div>
  );
}

function GalleryItem({ item, onSelect }: { item: any; onSelect: (it: any) => void }) {
  const height = React.useMemo(() => {
    const variants = [220, 260, 320, 280];
    const seed = item._id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return variants[seed % variants.length];
  }, [item._id]);

  return (
    <div
      onClick={() => onSelect(item)}
      className="group cursor-pointer mb-2"
    >
      <div
        className="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100"
        style={{ height: `${height}px` }}
      >
        <img
          src={item.image || (item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
          alt={item.title}
        />
      </div>

      {/* Minimal Info */}
      <div className="mt-3 px-1">
        <p className="text-sm font-semibold text-neutral-900 line-clamp-1">
          {item.title}
        </p>
        <p className="text-sm text-neutral-400 mt-0.5 font-medium">
          ₹{item.price}
        </p>
      </div>
    </div>
  );
}
