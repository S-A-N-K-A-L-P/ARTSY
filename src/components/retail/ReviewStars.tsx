'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewStarsProps {
  rating: number; // 0-5
  count?: number;
  size?: number;
  className?: string;
}

export const ReviewStars = ({ rating, count, size = 14, className }: ReviewStarsProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            size={size} 
            fill={s <= rating ? "#111111" : "transparent"} 
            className={cn(s <= rating ? "text-neutral-900" : "text-neutral-200")} 
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          {count} Opinions
        </span>
      )}
    </div>
  );
};
