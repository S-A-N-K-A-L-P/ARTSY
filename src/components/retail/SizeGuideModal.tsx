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
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-xl bg-card/80 backdrop-blur-3xl rounded-[32px] p-10 z-10 shadow-[0_20px_80px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <Ruler size={20} className="text-text" />
                  <h3 className="text-lg font-bold text-text tracking-tight">Dimensions & Scale</h3>
               </div>
               <button onClick={onClose} className="p-2 text-text-muted hover:text-text transition-colors">
                  <X size={20} />
               </button>
            </div>

            <div className="space-y-6">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Archival Size</th>
                      <th className="py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Width (cm)</th>
                      <th className="py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Height (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'Alpha', w: 45, h: 70 },
                      { size: 'Beta', w: 48, h: 72 },
                      { size: 'Gamma', w: 52, h: 75 },
                      { size: 'Delta', w: 56, h: 78 },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-line/50">
                        <td className="py-4 text-xs font-bold text-text uppercase tracking-widest">{row.size}</td>
                        <td className="py-4 text-xs font-medium text-text-secondary">{row.w}</td>
                        <td className="py-4 text-xs font-medium text-text-secondary">{row.h}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
               
               <p className="text-[10px] font-medium text-text-muted leading-relaxed italic">
                 * Measurements are based on standard manifestation protocols. Allow for minor variations in physical geometry.
               </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full h-14 rounded-xl bg-accent text-on-accent font-black text-[10px] uppercase tracking-[0.2em] mt-10 shadow-lg active:brightness-95 transition-all"
            >
              Confirm Orientation
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
