'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  activeCategory?: string;
  onSelectCategory: (cat: string) => void;
}

export const FilterDrawer = ({ isOpen, onClose, categories, activeCategory, onSelectCategory }: FilterDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-end justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-t-[40px] p-10 z-10"
          >
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-bold text-neutral-900">Filter Archetypes</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-0.5">Refine your manifestation</p>
               </div>
               <button onClick={onClose} className="p-2 text-neutral-400">
                  <X size={20} />
               </button>
            </div>

            <div className="space-y-2 mb-10">
               {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { onSelectCategory(cat); onClose(); }}
                    className={cn(
                        "w-full h-14 px-6 rounded-2xl flex items-center justify-between transition-all",
                        activeCategory === cat ? "bg-neutral-900 text-white shadow-xl" : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100"
                    )}
                  >
                     <span className="text-xs font-bold uppercase tracking-widest">{cat}</span>
                     <ChevronRight size={16} className={cn(activeCategory === cat ? "text-white" : "text-neutral-200")} />
                  </button>
               ))}
            </div>

            <button 
              onClick={onClose}
              className="w-full h-16 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-neutral-200 active:scale-[0.98] transition-all"
            >
              Apply Selection
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
