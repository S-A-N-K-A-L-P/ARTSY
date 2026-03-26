'use client';

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const NewsletterMinimal = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-16 rounded-[48px] bg-neutral-900 text-white space-y-12 relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-4 text-amber-400">
           <Mail size={18} />
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">Archival Access</span>
        </div>
        <h3 className="text-4xl font-black tracking-tighter leading-[0.9] max-w-md italic">Join the convergence.</h3>
        <p className="text-sm text-neutral-400 font-medium uppercase tracking-[0.2em] leading-relaxed max-w-xs">
          Receive archival updates and exclusive manifestations.
        </p>
      </div>

      <div className="relative z-10">
        <input 
          type="email" 
          placeholder="ARCHIVAL@EMAIL.COM" 
          className="w-full h-20 bg-white/5 border border-white/10 rounded-2xl px-8 text-[11px] font-black tracking-[0.3em] focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/10 uppercase"
        />
        <motion.button 
          whileHover={{ x: 5 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/40 hover:text-white transition-all"
        >
          <ArrowRight size={24} />
        </motion.button>
      </div>
    </motion.div>
  );
};
