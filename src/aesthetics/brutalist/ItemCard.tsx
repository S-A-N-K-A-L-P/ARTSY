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
      className="group cursor-pointer overflow-hidden border-4 border-[#1A1A1A] bg-[#D4CFC8] shadow-[8px_8px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 transition-all relative"
      style={{ height }}
    >
      <div className="relative h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover contrast-125 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#E8E4DE] border-t-4 border-[#1A1A1A]">
          <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-tight font-mono">{title}</h3>
          <p className="text-[10px] text-[#FF3300] font-mono font-bold uppercase mt-0.5">{author}</p>
        </div>
      </div>
    </motion.div>
  );
};