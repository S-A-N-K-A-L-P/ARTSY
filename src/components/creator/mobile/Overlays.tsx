'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Settings, Sparkles, Heart } from 'lucide-react';
import { UserProfile } from '@/types/creator';

// 12. ShareSheetMobile
export const ShareSheetMobile = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
   <AnimatePresence>
     {isOpen && (
       <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="relative w-full max-w-lg bg-[#0A0A0A] rounded-t-[48px] p-10 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
             <div className="w-12 h-1.5 rounded-full bg-white/10 mx-auto mb-10" />
             <h3 className="text-2xl font-bold tracking-tighter mb-8">Spread the Aesthetic</h3>
             <div className="grid grid-cols-4 gap-4 mb-10">
                {['Instagram', 'Twitter', 'URL', 'QR'].map(m => (
                   <div key={m} className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                         <Share2 size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{m}</span>
                   </div>
                ))}
             </div>
             <button onClick={onClose} className="w-full h-14 rounded-2xl bg-white/5 font-bold uppercase tracking-widest text-xs border border-white/10">Dismiss</button>
          </motion.div>
       </div>
     )}
   </AnimatePresence>
);

// 15. QuickActionOverlay
export const QuickActionOverlay = ({ onAction }: { onAction: (action: string) => void }) => (
  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
     {['edit', 'hide', 'delete'].map(a => (
        <button key={a} onClick={() => onAction(a)} className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
           <Settings size={14} className="opacity-60" />
        </button>
     ))}
  </div>
);

// 16. AestheticNotificationToast
export const AestheticNotificationToast = ({ message }: { message: string }) => (
  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-24 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center gap-3 z-50">
     <Sparkles size={16} className="text-amber-400" />
     <span className="text-[10px] font-bold uppercase tracking-widest">{message}</span>
  </motion.div>
);

// 17. BulkActionDrawer
export const BulkActionDrawer = ({ count, onAction }: { count: number, onAction: (action: string) => void }) => (
  <div className="fixed bottom-0 left-0 right-0 p-8 pt-4 bg-[#0A0A0A] border-t border-white/10 z-[100] rounded-t-[40px] shadow-2xl">
     <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6" />
     <div className="flex items-center justify-between mb-8">
        <p className="text-sm font-bold tracking-tight"><span className="text-white/40">{count}</span> Items Selected</p>
        <button className="text-xs font-bold uppercase tracking-widest text-red-400">Clear</button>
     </div>
     <div className="grid grid-cols-3 gap-3">
        {['Move', 'Duplicate', 'Delete'].map(a => (
           <button key={a} onClick={() => onAction(a)} className="h-14 rounded-2xl bg-white/5 border border-white/5 font-bold uppercase tracking-widest text-[10px]">{a}</button>
        ))}
     </div>
  </div>
);

// 24. SuccessOverlayMobile
export const SuccessOverlayMobile = ({ onDone }: { onDone: () => void }) => (
  <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-10 text-center">
     <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8">
        <Heart size={40} className="text-black" />
     </div>
     <h2 className="text-4xl font-bold tracking-tighter mb-4 italic">Aesthetic Deployed</h2>
     <p className="text-white/40 mb-10">Your collection has been updated globally across the Artsy stack.</p>
     <button onClick={onDone} className="w-full h-16 rounded-2xl bg-white text-black font-extrabold uppercase tracking-widest text-xs">Return to Studio</button>
  </div>
);

// 22. SellerInfoFullMobile
export const SellerInfoFullMobile = ({ user }: { user?: UserProfile }) => (
  <div className="p-8 rounded-[40px] bg-white/5 border border-white/5 space-y-4">
     <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/10 overflow-hidden" />
        <div>
           <p className="font-bold tracking-tight">@{user?.username}</p>
           <p className="text-[10px] opacity-20 uppercase font-bold">Verified Aesthetic Maker</p>
        </div>
     </div>
     <p className="text-xs text-white/40 leading-relaxed italic">{user?.description || "Visual curator specializing in Noir and Minimalist storefronts."}</p>
  </div>
);
