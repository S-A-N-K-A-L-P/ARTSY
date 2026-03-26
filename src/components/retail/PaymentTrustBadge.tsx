'use client';

import React from 'react';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

export const PaymentTrustBadge = () => {
  return (
    <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-4">
      <div className="flex items-center gap-3">
        <ShieldCheck size={18} className="text-emerald-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-900">Secure Protocol Active</span>
      </div>
      
      <div className="flex items-center gap-6 opacity-30">
        <CreditCard size={20} />
        <Lock size={18} />
        <div className="text-[9px] font-black uppercase italic tracking-widest">VISA</div>
        <div className="text-[9px] font-black uppercase italic tracking-widest">UPI</div>
      </div>
      
      <p className="text-[9px] font-medium text-neutral-400 leading-relaxed uppercase tracking-widest">
        End-to-end encrypted transactions via Astal Secure Gate.
      </p>
    </div>
  );
};
