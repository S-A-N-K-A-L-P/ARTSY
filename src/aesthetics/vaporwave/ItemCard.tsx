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
      whileHover={{ y: -12, scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.94, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
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
        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 hue-rotate-[280deg] saturate-150 group-hover:hue-rotate-0 group-hover:saturate-100 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>@{author}</p>
            <span className="text-xs font-bold opacity-60" style={{ color: 'var(--text-primary)' }}>${price}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart({ id, title, image, price }); }}
             className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center transition-all bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
           >
             <ShoppingBag size={14} />
           </button>
           <button className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center bg-white/5 border border-white/10 text-white">
             <Heart size={14} className="group-hover:text-[var(--accent)]" />
           </button>
        </div>
      </div>
    </motion.div>
  );
};