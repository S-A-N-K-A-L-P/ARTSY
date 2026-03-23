'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Share2, Sparkles, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { themes } from '@/lib/theme/themes';
import { IOSBottomNav } from '@/components/ui/ios/ios-bottom-nav';

export default function PublicPageClient({ page, user, items }: any) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const themeName = page.aesthetic?.theme || page.aesthetic || 'minimal';
  const theme = themes[themeName as keyof typeof themes] || themes.minimal;

  return (
    <div 
      className="min-h-screen pb-32 transition-colors duration-1000"
      style={theme as React.CSSProperties}
    >
      {/* Immersive Header */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={page.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200"} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-current opacity-20" style={{ color: (theme as any)["--bg-primary"] }} />
        
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-center text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-white mb-4"
            >
                <Sparkles size={10} className="text-[var(--accent)]" /> {themeName} Manifest
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter italic mb-4 drop-shadow-2xl text-white"
            >
                {page.name}
            </motion.h1>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
                <img src={user.profile?.avatar || user.avatar} className="w-6 h-6 rounded-full border border-white/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">curated by @{user.username}</span>
            </motion.div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {items.map((item: any, i: number) => {
           const isWide = i % 7 === 2;
           const isTall = i % 7 === 5;
           
           return (
             <motion.div
               key={item._id}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className={cn(
                  "group relative rounded-[32px] overflow-hidden cursor-pointer border border-white/5 bg-black/20 backdrop-blur-sm",
                  isWide ? "col-span-2" : "col-span-1",
                  isTall ? "row-span-2" : "row-span-1"
               )}
               onClick={() => setSelectedItem(item)}
             >
                <img 
                   src={item.images?.[0]} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <h3 className="text-white font-black italic tracking-tighter text-xl">{item.title}</h3>
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1">₹{item.price}</p>
                </div>
             </motion.div>
           );
        })}
      </div>

      {/* Full Screen Interactive View */}
      <AnimatePresence>
        {selectedItem && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
           >
              {/* Blur Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/30 backdrop-blur-[100px]"
                onClick={() => setSelectedItem(null)}
              />

              <motion.div
                initial={{ scale: 0.9, y: 50, rotateX: 20 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.9, y: 50, rotateX: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white/5 backdrop-blur-2xl rounded-[48px] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              >
                 <div className="flex-1 relative bg-black/20">
                    <img src={selectedItem.images?.[0]} className="w-full h-full object-contain" />
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-8 left-8 w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                       <X size={20} />
                    </button>
                 </div>

                 <div className="w-full md:w-[400px] p-10 flex flex-col justify-between border-l border-white/5 bg-black/10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[9px] font-black uppercase tracking-widest mb-6">
                            Verified Artifact
                        </div>
                        <h2 className="text-4xl font-black italic tracking-tighter text-white mb-4 leading-none">{selectedItem.title}</h2>
                        <p className="text-white/40 text-xs leading-relaxed mb-8">{selectedItem.description || "The digital manifestation of a unique perspective. Sculpted by the currents of aesthetic identity."}</p>
                        
                        <div className="flex items-center gap-4 mb-10">
                            <div className="flex-1 h-[1px] bg-white/5" />
                            <span className="text-2xl font-black italic text-[var(--accent)] tracking-tighter">₹{selectedItem.price}</span>
                            <div className="flex-1 h-[1px] bg-white/5" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full h-16 rounded-[24px] bg-[var(--accent)] text-[var(--bg-primary)] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[var(--accent-soft)]">
                            <ShoppingBag size={16} /> Add to Manifest
                        </button>
                        <button className="w-full h-14 rounded-[24px] bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[9px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                            <Share2 size={14} /> Distribute Perspective
                        </button>
                    </div>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      <IOSBottomNav />
    </div>
  );
}
