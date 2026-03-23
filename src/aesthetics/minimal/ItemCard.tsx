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
      whileHover={{ y: -2 }}
      className="group cursor-pointer overflow-hidden rounded-xl border border-[#eee] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      style={{ height }}
    >
      <div className="relative h-[70%] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-[#111] tracking-tight">{title}</h3>
          <p className="text-xs text-[#999] mt-0.5">{author}</p>
        </div>
        <button className="p-1.5 rounded-full hover:bg-[#f5f5f5] transition-colors">
          <Heart size={14} className="text-[#ccc] group-hover:text-[#111] transition-colors" />
        </button>
      </div>
    </motion.div>
  );
};