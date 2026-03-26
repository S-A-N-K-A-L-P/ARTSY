'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RelatedProductsProps {
  items: any[];
  onSelect: (item: any) => void;
}

export const RelatedProducts = ({ items, onSelect }: RelatedProductsProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">Converging Artifacts</h3>
        <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest cursor-pointer hover:underline">View All</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {items.slice(0, 4).map((item, i) => (
          <motion.div 
            key={item._id}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(item)}
            className="group cursor-pointer space-y-3"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100">
               <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="px-1">
               <h4 className="text-[11px] font-bold text-neutral-900 truncate">{item.title}</h4>
               <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">₹{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
