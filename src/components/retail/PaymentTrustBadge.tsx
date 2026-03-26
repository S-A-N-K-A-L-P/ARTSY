'use client';

import React from 'react';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export const PaymentTrustBadge = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-[32px] bg-neutral-900 text-white flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-amber-400 shadow-inner">
           <ShieldCheck size={28} strokeWidth={1.5} />
        </div>
        <div>
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Payment Sovereignty</p>
           <h4 className="text-xl font-black tracking-tighter text-white mt-1 italic">Encrypted Convergence</h4>
        </div>
      </div>

      <div className="flex items-center gap-6 relative z-10 p-4 rounded-2xl bg-white/5 border border-white/5">
        <CreditCard size={20} className="text-white/20" />
        <div className="h-4 w-px bg-white/10" />
        <Lock size={16} className="text-emerald-400" />
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Secure Node</span>
      </div>
    </motion.div>
  );
};
