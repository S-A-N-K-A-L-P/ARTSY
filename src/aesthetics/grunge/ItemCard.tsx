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
      whileHover={{ scale: 0.98, x: -2 }}
      whileTap={{ scale: 0.94, x: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="group cursor-pointer overflow-hidden transition-all relative shadow-soft hover:shadow-strong"
      style={{ 
        height, 
        borderRadius: 'var(--radius)', 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-subtle)',
        borderWidth: '1px'
      }}
    >
      <div className="relative h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover sepia-[0.3] brightness-75 group-hover:sepia-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-sm font-bold tracking-tight font-mono" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] font-mono opacity-60" style={{ color: 'var(--accent)' }}>@{author}</p>
            <span className="text-[10px] font-bold opacity-40 font-mono" style={{ color: 'var(--text-secondary)' }}>${price}</span>
          </div>
        </div>
        
        {/* Actions Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart({ id, title, image, price }); }}
             className="w-10 h-10 rounded-md flex items-center justify-center transition-all bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--accent)] hover:border-[var(--accent)] shadow-md"
           >
             <ShoppingBag size={14} />
           </button>
           <button className="w-10 h-10 rounded-md flex items-center justify-center bg-black/40 border border-white/5 text-white/40 hover:text-red-500">
             <Heart size={14} />
           </button>
        </div>
      </div>
    </motion.div>
  );
};
