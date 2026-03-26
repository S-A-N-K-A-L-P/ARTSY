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
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Archives</span>
        <h3 className="text-xl font-bold text-neutral-900 tracking-tighter">Collections</h3>
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
               activeCategory === cat ? "text-neutral-900 border-b-2 border-neutral-900" : "text-neutral-400 group-hover:text-neutral-900"
            )}>
              {cat}
            </span>
            <ChevronRight size={14} className={cn(
              "transition-all",
              activeCategory === cat ? "text-neutral-900 translate-x-1" : "text-neutral-100 group-hover:text-neutral-400"
            )} />
          </button>
        ))}
      </div>
    </div>
  );
};
