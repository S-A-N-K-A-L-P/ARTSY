'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';

interface ItemCardProps {
  id: string | number;
  title: string;
  author: string;
  image: string;
  price?: number;
  height?: number;
}

export const ItemCard = ({ id, title, author, image, price = 0, height = 300 }: ItemCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group cursor-pointer overflow-hidden border transition-all duration-700 relative shadow-soft hover:shadow-strong"
      style={{ 
        height, 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-subtle)' 
      }}
    >
      <div className="relative h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
          <h3 className="text-lg font-bold tracking-wide text-white uppercase" style={{ fontFamily: "var(--font)" }}>{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: 'var(--accent)' }}>@{author}</p>
            <span className="text-xs font-bold text-white/60">${price}</span>
          </div>
        </div>
        
        {/* Actions Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart({ id, title, image, price }); }}
             className="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black transition-all"
           >
             <ShoppingBag size={14} />
           </button>
           <button className="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
             <Heart size={14} className="group-hover:text-[var(--accent)]" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};