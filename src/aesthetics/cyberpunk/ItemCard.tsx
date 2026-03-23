'use client';

import { motion } from 'framer-motion';

interface ItemCardProps {
  id: number;
  title: string;
  author: string;
  image: string;
  height?: number;
}

export const ItemCard = ({ title, author, image, height = 300 }: ItemCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="group cursor-pointer overflow-hidden border border-[#2A2A4E] bg-[#1A1A2E] rounded transition-all hover:border-[#00F5D4] hover:shadow-[0_0_20px_rgba(0,245,212,0.2)] relative"
      style={{ height }}
    >
      <div className="relative h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] to-transparent" />
        
        {/* Scan line overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,212,0.1) 2px, rgba(0,245,212,0.1) 4px)' }} />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#00F5D4] rounded-full animate-pulse" />
            <p className="text-[9px] text-[#00F5D4] uppercase tracking-[0.3em] font-mono font-bold">LIVE</p>
          </div>
          <h3 className="text-sm font-bold text-[#E0E0FF] font-mono tracking-tight">{title}</h3>
          <p className="text-[10px] text-[#5A5A8A] font-mono mt-0.5">@{author}</p>
        </div>
      </div>
    </motion.div>
  );
};
