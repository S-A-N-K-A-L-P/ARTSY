'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
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
      whileHover={{ x: 6, y: 6 }}
      whileTap={{ x: 2, y: 2 }}
      transition={{ type: "spring", stiffness: 600, damping: 15 }}
      className="group cursor-pointer overflow-hidden border-[4px] border-black transition-all relative"
      style={{ 
        height, 
        backgroundColor: 'var(--bg-secondary)', 
        boxShadow: '10px 10px 0px var(--border-strong)' 
      }}
    >
      <div className="relative h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover contrast-125 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t-[4px] border-black" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <h3 className="text-sm font-black uppercase tracking-tight font-mono" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] font-mono font-black uppercase" style={{ color: 'var(--accent)' }}>@{author}</p>
            <span className="text-sm font-black font-mono" style={{ color: 'var(--text-primary)' }}>${price}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart({ id, title, image, price }); }}
             className="w-12 h-12 border-[4px] border-black bg-[var(--accent)] text-black flex items-center justify-center hover:bg-white transition-colors shadow-[4px_4px_0px_black]"
           >
             <ShoppingBag size={18} />
           </button>
        </div>
      </div>
    </motion.div>
  );
};