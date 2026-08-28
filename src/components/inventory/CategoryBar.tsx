'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryBar({ categories, selectedCategory, onCategoryChange }: CategoryBarProps) {
  const allCategories = ['All', ...categories];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={cn(
            "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border",
            selectedCategory === cat
              ? "bg-accent text-bg border-accent shadow-xl scale-105"
              : "bg-card text-text-muted border-line hover:border-accent hover:text-text"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
