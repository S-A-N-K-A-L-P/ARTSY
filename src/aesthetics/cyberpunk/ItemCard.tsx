'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Zap } from 'lucide-react';
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
      whileHover={{ scale: 1.03, skewX: -1 }}
      whileTap={{ scale: 0.95, skewX: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
      className="group cursor-pointer overflow-hidden border transition-all duration-300 relative rounded-none hover:shadow-[0_0_30px_var(--accent-soft)]"
      style={{ 
        height, 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border-subtle)' 
      }}
    >
      <div className="relative h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Scan line overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--accent) 2px, var(--accent) 4px)' }} />

        {/* Glitch Frame */}
        <div className="absolute inset-0 border border-transparent group-hover:border-[var(--accent)] group-hover:opacity-40 transition-opacity" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
            <p className="text-[8px] uppercase tracking-[0.4em] font-black" style={{ color: 'var(--accent)' }}>MARKET_READY</p>
          </div>
          <h3 className="text-sm font-black text-white italic tracking-tighter" style={{ fontFamily: "var(--font)" }}>{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[9px] uppercase tracking-widest font-mono" style={{ color: 'var(--text-muted)' }}>// @{author}</p>
            <span className="text-xs font-black" style={{ color: 'var(--accent)' }}>${price}</span>
          </div>
        </div>

        {/* Cyber Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart({ id, title, image, price }); }}
             className="w-10 h-10 border border-[var(--accent)] bg-black text-[var(--accent)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-colors shadow-[0_0_10px_var(--accent-soft)]"
           >
             <ShoppingBag size={14} />
           </button>
        </div>
      </div>
    </motion.div>
  );
};
