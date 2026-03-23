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
      whileHover={{ scale: 0.98 }}
      className="group cursor-pointer overflow-hidden border border-[#333] bg-[#1a1a1a] transition-all hover:border-[#C0A062] relative"
      style={{ height }}
    >
      <div className="relative h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-lg font-bold tracking-wide text-white uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
          <p className="text-[10px] text-[#C0A062] uppercase tracking-[0.3em] mt-1 font-bold">{author}</p>
        </div>
        <button className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={14} className="text-[#C0A062]" />
        </button>
      </div>
    </motion.div>
  );
};