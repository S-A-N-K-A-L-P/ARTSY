'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InventoryBadgeProps {
  count: number;
  className?: string;
}

export const InventoryBadge = ({ count, className }: InventoryBadgeProps) => {
  return (
    <div className={cn("flex items-center gap-2 bg-elevated px-3 py-1.5 rounded-full border border-line shadow-sm relative overflow-hidden", className)}>
      <motion.span 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-emerald-500" 
      />
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text leading-none">
        {count} Manifested
      </span>
    </div>
  );
};
