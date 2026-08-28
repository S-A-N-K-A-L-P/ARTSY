'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface DesktopCategoryNavProps {
  categories: string[];
  activeCategory?: string;
  onSelectCategory: (cat: string) => void;
}

export const DesktopCategoryNav = ({ categories, activeCategory, onSelectCategory }: DesktopCategoryNavProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Archives</span>
        <h3 className="text-xl font-bold text-text tracking-tighter">Collections</h3>
      </div>
      
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className="group flex items-center justify-between py-2 text-left transition-all"
          >
            <span className={cn(
               "text-xs font-bold uppercase tracking-widest transition-all",
               activeCategory === cat ? "text-text border-b-2 border-accent" : "text-text-muted group-hover:text-text"
            )}>
              {cat}
            </span>
            <ChevronRight size={14} className={cn(
              "transition-all",
              activeCategory === cat ? "text-text translate-x-1" : "text-text-muted opacity-30 group-hover:opacity-100"
            )} />
          </button>
        ))}
      </div>
    </div>
  );
};
