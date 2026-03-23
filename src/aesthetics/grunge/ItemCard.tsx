'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

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
      whileHover={{ scale: 0.99 }}
      className="group cursor-pointer overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#1E1E1E] shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all relative"
      style={{ height }}
    >
      <div className="relative h-full overflow-hidden rounded-lg">
        <img src={image} alt={title} className="w-full h-full object-cover sepia-[0.4] brightness-75 group-hover:sepia-0 group-hover:brightness-90 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-bold text-[#D1D1D1] tracking-tight font-mono">{title}</h3>
          <p className="text-[10px] text-[#4A5D4E] font-mono mt-0.5">{author}</p>
        </div>
        <div className="absolute top-3 right-3 w-7 h-7 rounded-md bg-[#4A5D4E]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={14} className="text-[#4A5D4E]" />
        </div>
      </div>
    </motion.div>
  );
};
