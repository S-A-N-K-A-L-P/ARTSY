'use client';

import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (val: number) => void;
  max?: number;
}

export const QuantitySelector = ({ quantity, onChange, max = 99 }: QuantitySelectorProps) => {
  const increment = () => quantity < max && onChange(quantity + 1);
  const decrement = () => quantity > 1 && onChange(quantity - 1);

  return (
    <div className="flex items-center gap-4 bg-neutral-50 rounded-2xl h-14 px-6 border border-neutral-100">
      <button 
        onClick={decrement}
        className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>
      <span className="text-xs font-bold text-neutral-900 min-w-8 text-center">{quantity}</span>
      <button 
        onClick={increment}
        className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
        disabled={quantity >= max}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
