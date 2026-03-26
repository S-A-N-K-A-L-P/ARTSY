'use client';

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export const NewsletterMinimal = () => {
  return (
    <div className="p-12 rounded-[40px] bg-neutral-900 text-white space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-amber-400">
           <Mail size={16} />
           <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Manifest Access</span>
        </div>
        <h3 className="text-3xl font-black tracking-tighter leading-tight">Join the convergence.</h3>
        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Receive archival updates and exclusive manifestations.</p>
      </div>

      <div className="relative group">
        <input 
          type="email" 
          placeholder="ARCHIVAL@EMAIL.COM" 
          className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-xs font-bold tracking-widest focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-all">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
