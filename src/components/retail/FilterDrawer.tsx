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
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="relative w-full max-w-lg bg-white/80 backdrop-blur-3xl rounded-t-[40px] p-10 z-10 shadow-[0_-20px_80px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-2xl font-black text-neutral-900 tracking-tighter">Filter Archetypes</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mt-1">Refine your manifestation</p>
               </div>
               <button onClick={onClose} className="p-2 text-neutral-400">
                  <X size={20} />
               </button>
            </div>

            <div className="space-y-3 mb-10">
               {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { onSelectCategory(cat); onClose(); }}
                    className={cn(
                        "w-full h-16 px-8 rounded-2xl flex items-center justify-between transition-all border",
                        activeCategory === cat ? "bg-neutral-900 border-neutral-900 text-white shadow-xl" : "bg-white/50 border-neutral-100/50 text-neutral-400 hover:text-neutral-900"
                    )}
                  >
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cat}</span>
                     <ChevronRight size={16} className={cn(activeCategory === cat ? "text-white" : "text-neutral-200")} />
                  </motion.button>
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
