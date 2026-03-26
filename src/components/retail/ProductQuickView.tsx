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
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-3xl"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative w-full max-w-6xl h-[80vh] bg-white/80 backdrop-blur-2xl rounded-[40px] overflow-hidden flex shadow-[0_40px_100px_rgba(0,0,0,0.15)] z-10"
          >
            <div className="flex-1 overflow-hidden">
               <ImageCarousel images={item.images || [item.image]} className="h-full" />
            </div>

            <div className="w-[480px] p-16 flex flex-col justify-between border-l border-neutral-100 bg-white/40">
               <div>
                  <div className="flex items-center justify-between mb-10">
                     <InventoryBadge count={10} />
                     <motion.button 
                       whileHover={{ scale: 1.1, rotate: 90 }}
                       whileTap={{ scale: 0.9 }}
                       onClick={onClose} 
                       className="p-2 text-neutral-400 hover:text-neutral-900 transition-all"
                     >
                        <X size={20} />
                     </motion.button>
                  </div>

                  <h2 className="text-4xl font-black tracking-tighter text-neutral-900 mb-2 leading-[0.9] italic">Manifesting Depth</h2>
                  <ReviewStars rating={4.5} count={12} className="mb-10" />
                  
                  <p className="text-sm text-neutral-400 font-medium leading-relaxed mb-10 max-w-xs">
                    {item.description || "A curated artifact of aesthetic convergence, selected for its visual weight and archival integrity."}
                  </p>

                  <div className="py-10 border-t border-neutral-100/50">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">Retail Value</span>
                     <p className="text-4xl font-black text-neutral-900 tracking-tighter mt-1">₹{item.price}</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { onAddToCart(item); onClose(); }}
                    className="w-full h-18 rounded-2xl bg-neutral-900 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:bg-neutral-800 transition-all"
                  >
                     <ShoppingBag size={18} /> Add to Manifest
                  </motion.button>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="w-full h-18 rounded-2xl border border-neutral-100 text-neutral-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:text-neutral-900 hover:bg-neutral-50 transition-all"
                  >
                     Full Record <ExternalLink size={14} />
                  </motion.button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
