'use client';

import React from 'react';
import { Truck, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface TechSpecsTableProps {
  specs: { label: string; value: string }[];
}

export const TechSpecsTable = ({ specs }: TechSpecsTableProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-10 rounded-[40px] bg-neutral-50/50 border border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-12"
    >
      {specs.map((spec, i) => (
        <div key={i} className="flex flex-col gap-2">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">{spec.label}</p>
           <h4 className="text-lg font-black tracking-tighter text-neutral-900 italic line-clamp-1">{spec.value}</h4>
        </div>
      ))}
    </motion.div>
  );
};
