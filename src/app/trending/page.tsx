'use client';

import React from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Zap, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const TRENDS = [
  { name: 'Cyberpunk Redux', creators: 124, vibe: 'High Tech', color: '#ff0055' },
  { name: 'Soft Minimal', creators: 890, vibe: 'Serene', color: '#f5f2ee' },
  { name: 'Noir Detective', creators: 45, vibe: 'Gothic', color: '#000000' },
  { name: 'Vapor Wave', creators: 312, vibe: 'Retro', color: '#00f2ff' },
];

export default function TrendingPage() {
  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <header className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase tracking-widest mb-4">
              <Flame size={10} /> Hot Conversions
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>Trending Vibes</h1>
            <p className="mt-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">The most sought-after archetypes in the collective</p>
        </header>

        <div className="space-y-6">
            {TRENDS.map((trend, i) => (
                <motion.div
                    key={trend.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[32px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between group hover:border-[var(--accent-soft)] transition-all"
                >
                    <div className="flex items-center gap-6">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                          style={{ backgroundColor: trend.color }}
                        >
                            <Sparkles size={24} className={cn(trend.name === 'Soft Minimal' ? 'text-black' : 'text-white')} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tighter italic">{trend.name}</h3>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">{trend.vibe} · {trend.creators} Manifestations</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block h-1 w-24 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.random() * 60 + 40}%` }}
                                className="h-full bg-[var(--accent)]"
                            />
                        </div>
                        <TrendingUp size={20} className="text-[var(--accent)]" />
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Top Creators Spotlight */}
        <section className="mt-20">
            <h2 className="text-2xl font-black tracking-tighter italic mb-8">Top Visionaries</h2>
            <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar">
                {[1, 2, 3, 4, 5].map((idx) => (
                    <div key={idx} className="flex-shrink-0 flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-[28px] p-1 border-2 border-[var(--accent)] shadow-xl shadow-[var(--accent-soft)]">
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=creator${idx}`} 
                              className="w-full h-full rounded-[24px] object-cover bg-[var(--bg-tertiary)]"
                              alt="creator"
                            />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">@visionary_{idx}</span>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </DashboardShell>
  );
}
