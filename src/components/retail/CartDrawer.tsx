'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
}

export const CartDrawer = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }: CartDrawerProps) => {
  const total = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black tracking-tighter text-neutral-900">Manifest Summary</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-0.5">{items.length} Artifacts</p>
              </div>
              <button onClick={onClose} className="p-2 text-neutral-400">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                   <ShoppingBag size={48} strokeWidth={1} />
                   <p className="text-[10px] font-bold uppercase tracking-widest mt-4">Empty Manifest</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-50 border border-neutral-100 overflow-hidden shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 truncate">{item.title}</h4>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">₹{item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                         <div className="flex items-center gap-3">
                            <button onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))} className="text-neutral-300 hover:text-neutral-900"><Minus size={12} /></button>
                            <span className="text-[10px] font-bold text-neutral-900">{item.quantity || 1}</span>
                            <button onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)} className="text-neutral-300 hover:text-neutral-900"><Plus size={12} /></button>
                         </div>
                         <button onClick={() => onRemove(item.id)} className="text-neutral-200 hover:text-red-500 transition-colors">
                            <Trash2 size={12} />
                         </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-neutral-100 bg-neutral-50/30">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total Value</span>
                <span className="text-2xl font-black text-neutral-900 tracking-tighter">₹{total}</span>
              </div>
              <button className="w-full h-18 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-neutral-200 active:scale-[0.98] transition-all disabled:opacity-30" disabled={items.length === 0}>
                Synchronize & Order
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
