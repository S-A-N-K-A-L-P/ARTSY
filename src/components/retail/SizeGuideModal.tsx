'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-xl bg-white rounded-[32px] p-10 z-10"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <Ruler size={20} className="text-neutral-900" />
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight">Dimensions & Scale</h3>
               </div>
               <button onClick={onClose} className="p-2 text-neutral-300 hover:text-neutral-900 transition-colors">
                  <X size={20} />
               </button>
            </div>

            <div className="space-y-6">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Archival Size</th>
                      <th className="py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Width (cm)</th>
                      <th className="py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Height (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'Alpha', w: 45, h: 70 },
                      { size: 'Beta', w: 48, h: 72 },
                      { size: 'Gamma', w: 52, h: 75 },
                      { size: 'Delta', w: 56, h: 78 },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-neutral-50/50">
                        <td className="py-4 text-xs font-bold text-neutral-900 uppercase tracking-widest">{row.size}</td>
                        <td className="py-4 text-xs font-medium text-neutral-500">{row.w}</td>
                        <td className="py-4 text-xs font-medium text-neutral-500">{row.h}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
               
               <p className="text-[10px] font-medium text-neutral-400 leading-relaxed italic">
                 * Measurements are based on standard manifestation protocols. Allow for minor variations in physical geometry.
               </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full h-14 rounded-xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest mt-10 active:scale-[0.98] transition-all"
            >
              Confirm Orientation
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
