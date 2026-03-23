'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 17. AdvancedSearchModalDesktop
export const AdvancedSearchModalDesktop = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
   <AnimatePresence>
     {isOpen && (
       <div className="fixed inset-0 z-[200] flex items-center justify-center p-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-4xl bg-white/5 border border-white/10 rounded-[60px] p-20 shadow-2xl">
             <input autoFocus placeholder="Find items, pages, or collectors..." className="w-full bg-transparent text-6xl font-bold tracking-tighter placeholder:opacity-10 focus:outline-none italic" />
             <div className="mt-20 grid grid-cols-3 gap-12 text-left">
                <div>
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-6">Trending Pages</h4>
                   <div className="space-y-4 font-bold tracking-tight opacity-40 hover:opacity-100 transition-opacity cursor-pointer">/streetwear</div>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-6">Aesthetics</h4>
                   <div className="space-y-4 font-bold tracking-tight opacity-40">#noir #cyberpunk #vapor</div>
                </div>
             </div>
          </motion.div>
       </div>
     )}
   </AnimatePresence>
);

// 24. AestheticSettingsModalDesktop
export const AestheticSettingsModalDesktop = () => (
  <div className="p-10 rounded-[48px] bg-white/5 border border-white/5 flex flex-col gap-6">
     <h3 className="text-xl font-bold tracking-tighter italic">Global Visual Policy</h3>
     <div className="space-y-4">
        {['Override Default Fonts', 'Enable Grain FX', 'Force Dark Perspective'].map(p => (
           <div key={p} className="flex justify-between items-center">
              <span className="text-xs font-bold opacity-40">{p}</span>
              <div className="w-10 h-5 rounded-full bg-white/10 p-1 flex justify-end"><div className="w-3 h-3 rounded-full bg-white" /></div>
           </div>
        ))}
     </div>
  </div>
);

// 15. PageCustomizerSidebar
export const PageCustomizerSidebar = ({ page, onUpdate }: any) => (
  <div className="w-96 space-y-12 p-10 bg-white/5 border-l border-white/5 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto no-scrollbar">
     <h3 className="text-xl font-bold tracking-tighter italic">Customize Space</h3>
     <div className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Typography Style</label>
        <div className="grid grid-cols-2 gap-2">
           {['Serif', 'Mono', 'Sans', 'Display'].map(f => (
              <button key={f} className="h-12 rounded-xl bg-white/5 border border-white/5 text-xs font-bold hover:border-white/20 transition-all">{f}</button>
           ))}
        </div>
     </div>
     <div className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Container Radius</label>
        <input type="range" className="w-full accent-white opacity-20 hover:opacity-100 transition-all" />
     </div>
  </div>
);

// 9. BulkActionToolbar
export const BulkActionToolbar = () => (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center gap-8 z-[100]">
       <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest pr-8 border-r border-white/10">
          <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">3</span> Selected
       </div>
       <div className="flex items-center gap-6">
          {['Duplicate', 'Hide', 'Export', 'Delete'].map(a => (
             <button key={a} className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">{a}</button>
          ))}
       </div>
    </div>
 );
