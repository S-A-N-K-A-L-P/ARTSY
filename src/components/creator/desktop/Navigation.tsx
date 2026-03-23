'use client';

import React from 'react';
import { ArrowUpRight, ChevronDown, Search, Info, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { PathItem, TabItem } from '@/types/creator';

// 1. SidebarFilterPanel
export const SidebarFilterPanel = ({ categories, selectedCat, onSelect }: { categories: string[], selectedCat: string, onSelect: (cat: string) => void }) => (
  <aside className="w-80 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto pr-8 no-scrollbar hidden xl:block">
    <div className="space-y-12">
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Discovery</h3>
        <div className="space-y-1">
          {['New Arrivals', 'Best Sellers', 'Aesthetic Choice', 'Limited Edition'].map(f => (
            <button key={f} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold opacity-40 hover:opacity-100 flex items-center justify-between group">
              {f} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Categories</h3>
        <div className="space-y-1">
          {categories.map((c: string) => (
            <button 
              key={c} 
              onClick={() => onSelect(c)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-bold flex items-center gap-3",
                selectedCat === c ? "bg-white text-black" : "opacity-40 hover:opacity-100 hover:bg-white/5"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", selectedCat === c ? "bg-black" : "bg-white/20")} />
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-[40px] bg-gradient-to-br from-white/5 to-transparent border border-white/10">
         <Award size={24} className="mb-4 text-white/40" />
         <p className="font-bold tracking-tight mb-2">Aesthetic Guarantee</p>
         <p className="text-[10px] text-white/40 font-medium leading-relaxed">Every item in this collection is verified for high-depth visual consistency.</p>
      </div>
    </div>
  </aside>
);

// 7. BreadcrumbNavigation
export const BreadcrumbNavigation = ({ paths }: { paths: PathItem[] }) => (
  <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest p-10">
    <span className="opacity-20">Store</span>
    {paths.map((p, i) => (
      <React.Fragment key={i}>
        <ChevronDown size={14} className="-rotate-90 opacity-10" />
        <span className={cn(i === paths.length - 1 ? "text-white" : "opacity-40")}>{p.label}</span>
      </React.Fragment>
    ))}
  </nav>
);

// 11. SearchOverlayDesktop
export const SearchOverlayDesktop = () => (
   <div className="relative group max-w-sm">
      <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-all" />
      <input 
        placeholder="Find aesthetic..." 
        className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-sm font-bold placeholder:opacity-20 focus:outline-none focus:border-white/20 transition-all font-mono"
      />
   </div>
);

// 20. MultiTabNavigationDesktop
export const MultiTabNavigationDesktop = ({ tabs, active, onSelect }: { tabs: TabItem[], active: string, onSelect: (id: string) => void }) => (
  <div className="flex items-center gap-12 border-b border-white/5 px-10">
     {tabs.map((t) => (
        <button 
           key={t.id} 
           onClick={() => onSelect(t.id)}
           className={cn("h-20 text-xs font-bold uppercase tracking-[0.3em] transition-all relative", active === t.id ? "text-white" : "opacity-20 hover:opacity-100")}
        >
           {t.label}
           {active === t.id && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full" />}
        </button>
     ))}
  </div>
);

// 6. AestheticOverrideBadge
export const AestheticOverrideBadge = ({ theme }: { theme: string }) => (
  <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-4 group cursor-help">
     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
     <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-all">Theme Override Active: {theme}</span>
     <Info size={14} className="opacity-20 group-hover:opacity-100 transition-all" />
  </div>
);

// 16. AestheticPreviewLiveDesktop
export const AestheticPreviewLiveDesktop = ({ theme }: { theme: string }) => (
  <div className="p-8 rounded-[48px] bg-white text-black flex items-center justify-between">
     <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center"><Palette size={20} className="text-white" /></div>
        <div>
           <p className="font-bold tracking-tight">Live: {theme}</p>
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Draft Preview Mode</p>
        </div>
     </div>
     <button className="h-12 px-6 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-widest">Publish</button>
  </div>
);
