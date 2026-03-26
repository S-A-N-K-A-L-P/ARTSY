'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BreadcrumbTrailProps {
  items: { label: string; href: string }[];
}

export const BreadcrumbTrail = ({ items }: BreadcrumbTrailProps) => {
  return (
    <motion.nav 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em]"
    >
      <motion.button 
        whileHover={{ scale: 1.1 }}
        className="text-neutral-300 hover:text-neutral-900 transition-colors"
      >
        <Home size={12} />
      </motion.button>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight size={10} className="text-neutral-100" />
          <motion.button 
             whileHover={{ x: 2 }}
             className={cn(
               "transition-all",
               i === items.length - 1 ? "text-neutral-900 italic underline decoration-neutral-100 underline-offset-4" : "text-neutral-300 hover:text-neutral-900"
             )}
          >
            {item.label}
          </motion.button>
        </React.Fragment>
      ))}
    </motion.nav>
  );
};
