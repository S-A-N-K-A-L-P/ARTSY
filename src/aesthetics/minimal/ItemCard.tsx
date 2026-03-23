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
      whileHover={{ y: -4 }}
      className="group cursor-pointer overflow-hidden rounded-[24px] border transition-all duration-300 shadow-soft hover:shadow-medium"
      style={{ 
        height, 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-subtle)' 
      }}
    >
      <div className="relative h-[65%] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart({ id, title, image, price }); }}
             className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all"
           >
             <ShoppingBag size={16} />
           </button>
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between h-[35%]">
        <div>
          <h3 className="text-sm font-bold tracking-tight truncate" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          <p className="text-[10px] font-medium mt-1 uppercase tracking-wider italic" style={{ color: 'var(--text-muted)' }}>@{author}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
           <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>${price}</span>
           <button className="p-1.5 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors">
             <Heart size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-primary)' }} />
           </button>
        </div>
      </div>
    </motion.div>
  );
};