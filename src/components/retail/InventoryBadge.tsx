'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InventoryBadgeProps {
  count: number;
  lowStockThreshold?: number;
  className?: string;
}

export const InventoryBadge = ({ count, lowStockThreshold = 5, className }: InventoryBadgeProps) => {
  const isLow = count > 0 && count <= lowStockThreshold;
  const isOut = count === 0;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className={cn(
        "w-1.5 h-1.5 rounded-full animate-pulse",
        isOut ? "bg-red-500" : isLow ? "bg-amber-500" : "bg-emerald-500"
      )} />
      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
        {isOut ? "Exhausted" : isLow ? "Limited Edition" : "In Stock"}
      </span>
    </div>
  );
};
