'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
          <motion.div
            key={s}
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star 
              size={size} 
              fill={s <= rating ? "#111111" : "transparent"} 
              className={cn(s <= rating ? "text-neutral-900" : "text-neutral-200")} 
            />
          </motion.div>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300 ml-1">
          Archival Opinion ({count})
        </span>
      )}
    </div>
  );
};
