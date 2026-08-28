'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, DollarSign, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsStripProps {
  totalItems: number;
  totalValue: number;
  syncHealth: string;
}

export function StatsStrip({ totalItems, totalValue, syncHealth }: StatsStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-card/50 backdrop-blur-md p-2 rounded-[24px] border border-line shadow-sm">
      <StatItem 
        label="Manifested" 
        value={totalItems} 
        icon={<Layers size={14} />} 
        subValue="+4% cycle" 
      />
      <div className="w-[1px] h-8 bg-elevated hidden sm:block" />
      <StatItem 
        label="Capital" 
        value={`₹${totalValue.toLocaleString()}`} 
        icon={<DollarSign size={14} />} 
        subValue="Live valuation" 
      />
      <div className="w-[1px] h-8 bg-elevated hidden sm:block" />
      <StatItem 
        label="Sync" 
        value={syncHealth} 
        icon={<TrendingUp size={14} />} 
        subValue="All healthy" 
      />
    </div>
  );
}

function StatItem({ label, value, icon, subValue }: { label: string; value: string | number; icon: React.ReactNode; subValue: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-2 rounded-2xl hover:bg-elevated transition-colors group cursor-default">
      <div className="w-10 h-10 rounded-xl bg-elevated border border-line flex items-center justify-center text-text-muted group-hover:bg-accent group-hover:text-bg group-hover:border-accent transition-all duration-500">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted leading-none mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black tracking-tighter text-text italic leading-none">{value}</span>
          <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{subValue}</span>
        </div>
      </div>
    </div>
  );
}
