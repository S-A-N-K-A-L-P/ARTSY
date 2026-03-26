'use client';

import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromoBannerProps {
  message: string;
  onClose?: () => void;
  isVisible: boolean;
}

export const PromoBanner = ({ message, onClose, isVisible }: PromoBannerProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="p-4 rounded-2xl bg-neutral-900 text-white flex items-center justify-between relative overflow-hidden group shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            {message}
          </div>

          {onClose && (
            <motion.button 
              onClick={onClose}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 px-6 py-2 bg-white text-neutral-900 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-md transition-all"
            >
              Dismiss
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
