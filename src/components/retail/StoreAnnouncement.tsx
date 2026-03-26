'use client';

import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoreAnnouncementProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export const StoreAnnouncement = ({ title, message, onClose }: StoreAnnouncementProps) => {
  return (
    <div className="relative p-8 rounded-3xl bg-amber-50 border border-amber-100/50 flex gap-6 overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-900 pointer-events-none">
        <Megaphone size={120} strokeWidth={1} />
      </div>

      <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center text-amber-700 shrink-0">
         <Megaphone size={20} />
      </div>

      <AnimatePresence>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-neutral-900 text-white py-4 px-6 flex items-center justify-between relative overflow-hidden group shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="flex-1 flex items-center justify-center gap-4 relative z-10">
           <Megaphone size={14} className="text-amber-400 animate-pulse" />
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-center">
              {message} <span className="text-amber-400 ml-4 font-black tracking-normal italic uppercase">Explore Archives</span>
           </p>
        </div>
        
        <motion.button 
          whileHover={{ rotate: 90 }}
          onClick={() => {/* handle close if needed */}}
          className="p-1 px-3 text-white/30 hover:text-white transition-all relative z-10"
        >
          <X size={14} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
    </div>
  );
};
