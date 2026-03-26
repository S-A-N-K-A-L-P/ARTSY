'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageCarousel } from './ImageCarousel';
import { InventoryBadge } from './InventoryBadge';
import { ReviewStars } from './ReviewStars';

interface ProductQuickViewProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onAddToCart: (item: any) => void;
}

export const ProductQuickView = ({ isOpen, onClose, item, onAddToCart }: ProductQuickViewProps) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-6xl h-[80vh] bg-white rounded-[40px] overflow-hidden flex shadow-2xl z-10"
          >
            <div className="flex-1 overflow-hidden">
               <ImageCarousel images={item.images || [item.image]} className="h-full" />
            </div>

            <div className="w-[480px] p-16 flex flex-col justify-between border-l border-neutral-100 bg-white">
               <div>
                  <div className="flex items-center justify-between mb-8">
                     <InventoryBadge count={10} />
                     <button onClick={onClose} className="p-2 text-neutral-300 hover:text-neutral-900 transition-colors">
                        <X size={20} />
                     </button>
                  </div>

                  <h2 className="text-3xl font-black tracking-tighter text-neutral-900 mb-2 leading-tight">{item.title}</h2>
                  <ReviewStars rating={4.5} count={12} className="mb-8" />
                  
                  <p className="text-sm text-neutral-500 leading-relaxed mb-10 max-w-xs">
                    {item.description || "A curated artifact of aesthetic convergence, selected for its visual weight and archival integrity."}
                  </p>

                  <div className="py-8 border-t border-neutral-50">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Retail Value</span>
                     <p className="text-3xl font-black text-neutral-900 tracking-tighter mt-1">₹{item.price}</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <button 
                    onClick={() => { onAddToCart(item); onClose(); }}
                    className="w-full h-18 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all"
                  >
                     <ShoppingBag size={18} /> Add to Manifest
                  </button>
                  <button className="w-full h-18 rounded-2xl border border-neutral-100 text-neutral-900 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-50 transition-all">
                     View Full Record <ExternalLink size={14} />
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
