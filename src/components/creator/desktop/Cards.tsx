'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Plus } from 'lucide-react';
import { AestheticItem, UserProfile } from '@/types/creator';

// 3. HoverPreviewCard
export const HoverPreviewCard = ({ item, onClick }: { item: AestheticItem, onClick?: () => void }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={onClick}
    className="group relative h-[450px] rounded-[48px] overflow-hidden bg-white/5 border border-white/5 cursor-pointer"
  >
    <img src={item.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-80 group-hover:opacity-100" alt={item.title} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all duration-500">
       <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest">{item.category}</span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest">{item.aesthetic}</span>
       </div>
       <h3 className="text-3xl font-bold tracking-tighter mb-2">{item.title}</h3>
       <p className="text-sm font-bold italic tracking-tight text-white/60 mb-6">{item.currency} {item.price?.toLocaleString()}</p>
       
       <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div initial={{ x: '-100%' }} whileHover={{ x: '0%' }} className="h-full bg-white" />
       </div>
    </div>
    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
       <Maximize2 size={18} />
    </div>
  </motion.div>
);

// 22. UserProfileMiniDesktop
export const UserProfileMiniDesktop = ({ user }: { user?: UserProfile }) => (
  <div className="flex items-center gap-6 p-6 rounded-[32px] bg-white/5 border border-white/5">
     <div className="w-14 h-14 rounded-2xl bg-white/10" />
     <div className="flex-1">
        <p className="font-bold tracking-tight">@{user?.username}</p>
        <p className="text-[10px] opacity-20 uppercase font-bold tracking-widest">Collector Level IV</p>
     </div>
     <button className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center"><Plus size={18} /></button>
  </div>
);

// 4. AttributeDataGrid
export const AttributeDataGrid = ({ attributes }: { attributes?: Record<string, string> }) => (
  <div className="grid grid-cols-1 gap-4">
     {Object.entries(attributes || {}).map(([k, v]) => (
        <div key={k} className="flex items-center justify-between py-4 border-b border-white/5">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/20">{k}</span>
           <span className="font-bold tracking-tight italic">{v}</span>
        </div>
     ))}
  </div>
);

// 19. ItemDetailSidebarDesktop
export const ItemDetailSidebarDesktop = ({ item }: { item: AestheticItem }) => (
  <div className="space-y-12">
     <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10" />
        <p className="font-bold tracking-tight opacity-40 italic">Managed by {item.owner || "Trustee"}</p>
     </div>
     <div className="p-10 rounded-[40px] border border-white/5 space-y-4">
        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20">Ownership Records</h4>
        <p className="text-sm font-medium opacity-40 leading-relaxed italic">This aesthetic piece was curated on March 2026. Part of the Digital Renaissance collection.</p>
     </div>
  </div>
);
