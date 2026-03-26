'use client';

import React from 'react';
import { Truck, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface TechSpecsTableProps {
  status: string;
  estimatedDelivery: string;
}

export const TechSpecsTable = ({ status, estimatedDelivery }: TechSpecsTableProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-[32px] bg-neutral-50/50 border border-neutral-100 flex flex-col md:flex-row gap-8 items-center justify-between"
    >
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-900 shadow-sm relative overflow-hidden">
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 bg-neutral-900"
           />
           <Truck size={24} className="relative z-10" />
        </div>
        <div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">Logistics Status</p>
           <h4 className="text-xl font-black tracking-tighter text-neutral-900 mt-1">{status}</h4>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="text-center md:text-left">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Estimated Arrival</p>
           <div className="flex items-center gap-3 text-neutral-900">
              <Clock size={14} className="text-neutral-300" />
              <span className="text-xs font-black uppercase tracking-widest">{estimatedDelivery}</span>
           </div>
        </div>
        <div className="text-center md:text-left">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Security Protocol</p>
           <div className="flex items-center gap-3 text-emerald-500">
              <ShieldCheck size={14} />
              <span className="text-xs font-black uppercase tracking-widest italic">Encrypted</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
