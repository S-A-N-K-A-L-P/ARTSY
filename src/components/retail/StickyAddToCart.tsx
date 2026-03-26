'use client';

import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StickyAddToCartProps {
  price: number;
  onAdd: () => void;
  isLoading?: boolean;
}

export const StickyAddToCart = ({ price, onAdd, isLoading }: StickyAddToCartProps) => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[110] bg-white/80 backdrop-blur-2xl border-t border-neutral-100 px-6 py-6 pb-12 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
    >
      <div className="flex flex-col">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-300">Total Value</span>
        <span className="text-3xl font-black text-neutral-900 tracking-tighter">₹{price}</span>
      </div>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAdd}
        disabled={isLoading}
        className="h-16 px-10 rounded-2xl bg-neutral-900 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] disabled:opacity-30"
      >
        {isLoading ? 'Synchronizing...' : (
          <>
            Add to Manifest <ChevronRight size={16} />
          </>
        )}
      </motion.button>
    </motion.div>
  );
};
