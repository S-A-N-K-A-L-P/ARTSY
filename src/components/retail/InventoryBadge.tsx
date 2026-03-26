'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InventoryBadgeProps {
  count: number;
}

export const InventoryBadge = ({ count }: InventoryBadgeProps) => {
  return (
    <div className="flex items-center gap-2 bg-neutral-100/50 px-3 py-1.5 rounded-full border border-neutral-100 shadow-sm relative overflow-hidden">
      <motion.span 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-emerald-500" 
      />
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-900 leading-none">
        {count} Manifested
      </span>
    </div>
  );
};
