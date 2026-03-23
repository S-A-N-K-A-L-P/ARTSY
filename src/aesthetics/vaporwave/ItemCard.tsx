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
      whileHover={{ y: -4, rotate: -0.5 }}
      className="group cursor-pointer overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2a1a3e] to-[#1a0a2e] border border-[#3a2a4e] shadow-[0_8px_32px_rgba(255,106,213,0.1)] transition-all relative"
      style={{ height }}
    >
      <div className="relative h-full overflow-hidden rounded-[32px]">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 hue-rotate-[280deg] saturate-150 group-hover:hue-rotate-0 group-hover:saturate-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-base font-bold text-[#FFE4F5] tracking-tight">{title}</h3>
          <p className="text-[10px] text-[#FF6AD5] mt-1 font-bold uppercase tracking-widest">{author}</p>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FF6AD5]/20 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={14} className="text-[#FF6AD5]" />
        </div>
      </div>
    </motion.div>
  );
};