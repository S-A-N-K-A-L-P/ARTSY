'use client';

import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (val: number) => void;
  max?: number;
}

export const QuantitySelector = ({ quantity, onChange, max = 99 }: QuantitySelectorProps) => {
  const increment = () => quantity < max && onChange(quantity + 1);
  const decrement = () => quantity > 1 && onChange(quantity - 1);

  return (
    <div className="flex items-center gap-1 bg-neutral-100/50 p-1.5 rounded-2xl border border-neutral-100">
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={decrement}
        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-neutral-400 hover:text-neutral-900 shadow-sm transition-all disabled:opacity-30"
        disabled={quantity <= 1}
      >
        <Minus size={14} />
      </motion.button>
      <span className="text-[11px] font-black text-neutral-900 min-w-[48px] text-center uppercase tracking-widest">{quantity}</span>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={increment}
        className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-neutral-400 hover:text-neutral-900 shadow-sm transition-all disabled:opacity-30"
        disabled={quantity >= max}
      >
        <Plus size={14} />
      </motion.button>
    </div>
  );
};
