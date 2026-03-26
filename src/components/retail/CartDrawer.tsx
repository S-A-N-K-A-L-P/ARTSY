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
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="relative w-full max-w-md bg-white/80 backdrop-blur-3xl h-full flex flex-col shadow-[-20px_0_80px_rgba(0,0,0,0.1)]"
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
                    <motion.div 
                      key={item.id} 
                      layout 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-neutral-100 border border-neutral-100 overflow-hidden shrink-0 transition-all group-hover:shadow-lg group-hover:scale-105">
                        <img src={item.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-black text-neutral-900 uppercase tracking-widest truncate">{item.title}</h4>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">₹{item.price}</p>
                        
                        <div className="flex items-center justify-between mt-3">
                           <div className="flex items-center gap-4 bg-neutral-50 rounded-full px-3 py-1">
                              <button onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))} className="text-neutral-400 hover:text-neutral-900 active:scale-95 transition-all"><Minus size={10} /></button>
                              <span className="text-[10px] font-black text-neutral-900 min-w-[12px] text-center">{item.quantity || 1}</span>
                              <button onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)} className="text-neutral-400 hover:text-neutral-900 active:scale-95 transition-all"><Plus size={10} /></button>
                           </div>
                           <button onClick={() => onRemove(item.id)} className="text-neutral-200 hover:text-neutral-900 transition-colors">
                              <Trash2 size={12} />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-neutral-100 bg-white/50">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Archival Total</span>
                <span className="text-3xl font-black text-neutral-900 tracking-tighter">₹{total}</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-18 rounded-2xl bg-neutral-900 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-neutral-200 active:bg-neutral-800 transition-all disabled:opacity-30" 
                disabled={items.length === 0}
              >
                Synchronize manifest
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
