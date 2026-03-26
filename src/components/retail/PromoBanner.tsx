'use client';

import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromoBannerProps {
  message: string;
  onClose?: () => void;
  isVisible?: boolean;
}

export const PromoBanner = ({ message, onClose, isVisible = true }: PromoBannerProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-neutral-900 text-white overflow-hidden"
        >
          <div className="px-6 py-3 flex items-center justify-center relative">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em]">
              <Sparkles size={12} className="text-amber-400" />
              {message}
            </div>
            {onClose && (
              <button onClick={onClose} className="absolute right-6 p-1 text-white/40 hover:text-white transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
