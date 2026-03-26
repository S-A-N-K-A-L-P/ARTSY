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
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">Total Value</span>
        <span className="text-xl font-black text-neutral-900 tracking-tighter">₹{price}</span>
      </div>
      <button 
        onClick={onAdd}
        disabled={isLoading}
        className="h-14 px-8 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 active:scale-[0.98] transition-all shadow-2xl shadow-neutral-200"
      >
        {isLoading ? 'Processing...' : (
          <>
            Add to Manifest <ChevronRight size={16} />
          </>
        )}
      </button>
    </motion.div>
  );
};
