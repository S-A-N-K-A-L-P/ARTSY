'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BreadcrumbTrailProps {
  items: { label: string; href: string }[];
}

export const BreadcrumbTrail = ({ items }: BreadcrumbTrailProps) => {
  return (
    <motion.nav 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 py-8"
    >
      <Link href="/home" className="text-text-muted hover:text-text transition-colors">
        <Home size={16} />
      </Link>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight size={14} className="text-text-muted" />
          <motion.div
            whileHover={{ x: 2 }}
            className="flex"
          >
            <Link 
              href={item.href}
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                i === items.length - 1 ? "text-text italic underline decoration-line underline-offset-4" : "text-text-muted hover:text-text"
              )}
            >
              {item.label}
            </Link>
          </motion.div>
        </React.Fragment>
      ))}
    </motion.nav>
  );
};
