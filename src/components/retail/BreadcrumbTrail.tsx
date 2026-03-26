'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbTrailProps {
  items: { label: string; href: string }[];
}

export const BreadcrumbTrail = ({ items }: BreadcrumbTrailProps) => {
  return (
    <nav className="flex items-center gap-4 py-8">
      <Link href="/home" className="text-neutral-300 hover:text-neutral-900 transition-colors">
        <Home size={16} />
      </Link>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight size={14} className="text-neutral-200" />
          <Link 
            href={item.href}
            className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-all"
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};
