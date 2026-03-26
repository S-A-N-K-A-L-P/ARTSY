'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StoreStatusProps {
  isOpen: boolean;
  message?: string;
  className?: string;
  hours?: string; // Added hours prop based on the new component's usage
}

export const StoreStatus = ({ isOpen, message, className, hours }: StoreStatusProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn("flex items-center gap-4 bg-neutral-100/50 px-6 py-2.5 rounded-full border border-neutral-100 shadow-sm", className)}
    >
      <div className="relative">
         <motion.div
           animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
           transition={{ duration: 2, repeat: Infinity }}
           className={cn("absolute inset-0 rounded-full", isOpen ? "bg-emerald-500" : "bg-neutral-300")}
         />
         <div className={cn("w-2 h-2 rounded-full relative z-10", isOpen ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-neutral-300")} />
      </div>
      <div>
         <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-900 leading-none">
           Archival {isOpen ? 'Online' : 'Offline'}
         </p>
         {hours && <p className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-300 mt-1">{hours}</p>}
      </div>
    </motion.div>
  );
};
