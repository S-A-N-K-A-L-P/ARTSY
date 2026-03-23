'use client';

import React from 'react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import { ItemCard as NoirCard } from '@/aesthetics/noir/ItemCard';
import { ItemCard as MinimalCard } from '@/aesthetics/minimal/ItemCard';
import { ItemCard as CyberpunkCard } from '@/aesthetics/cyberpunk/ItemCard';
import { ItemCard as VaporwaveCard } from '@/aesthetics/vaporwave/ItemCard';

export interface ItemCardProps {
  id: string | number;
  title: string;
  price: number;
  image: string;
  author?: string;
  aesthetic?: string;
  isAdd?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { aesthetic: globalAesthetic } = useAesthetic();
  if (props.isAdd) {
    return (
      <div 
        onClick={() => {
           // This will be handled by the parent or router
           window.location.href += '/item/new';
        }}
        className="group relative cursor-pointer overflow-hidden border-2 border-dashed transition-all duration-700 aspect-[4/5] flex flex-col items-center justify-center bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:border-[var(--accent)] hover:bg-[var(--bg-tertiary)]"
      >
         <div className="w-16 h-16 rounded-full bg-[var(--accent-soft)] flex items-center justify-center group-hover:scale-110 transition-all duration-500">
            <span className="text-4xl font-black text-[var(--accent)] transition-colors">+</span>
         </div>
         <span className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">Manifest New Artifact</span>
      </div>
    );
  }

  const theme = props.aesthetic || globalAesthetic || 'minimal';
  const cardProps = { ...props, author: props.author || 'creator' };

  // Dispatch to the correct aesthetic card
  switch (theme) {
    case 'noir':
      return <NoirCard {...cardProps} />;
    case 'minimal':
      return <MinimalCard {...cardProps} />;
    case 'cyberpunk':
      return <CyberpunkCard {...cardProps} />;
    case 'vaporwave':
      return <VaporwaveCard {...cardProps} />;
    default:
      return <MinimalCard {...cardProps} />;
  }
};