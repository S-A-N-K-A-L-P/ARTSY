'use client';

import React from 'react';
import { UserPlus, Share2, ChevronLeft } from 'lucide-react';
import { UserProfile } from '@/types/creator';

// 1. ProfileHeaderMobile
export const ProfileHeaderMobile = ({ user, aesthetic }: { user?: UserProfile, aesthetic?: string }) => (
  <div className="px-6 pt-12 pb-8 space-y-6">
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-[32px] overflow-hidden bg-white/5 border border-white/10 p-1">
        <img src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'} className="w-full h-full object-cover rounded-[28px]" alt="" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">@{user?.username}</h1>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mt-1">{user?.aesthetic || aesthetic || 'Global'} Aesthetic</p>
      </div>
    </div>
    <div className="flex gap-4">
       <button className="flex-1 h-12 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          <UserPlus size={16} /> Follow
       </button>
       <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Share2 size={18} />
       </button>
    </div>
  </div>
);

// 7. SellerProfileMini
export const SellerProfileMini = ({ user }: { user?: UserProfile }) => (
  <div className="flex items-center gap-3 py-4">
     <div className="w-10 h-10 rounded-xl bg-white/5 overflow-hidden">
        <img src={user?.image} className="w-full h-full object-cover" alt="" />
     </div>
     <div>
        <p className="text-xs font-bold leading-none">@{user?.username}</p>
        <p className="text-[10px] text-white/40 font-bold mt-1 uppercase tracking-widest">Verified Creator</p>
     </div>
  </div>
);

// 25. StickyActionHeaderMobile
export const StickyActionHeaderMobile = ({ title, onBack }: { title: string, onBack?: () => void }) => (
  <div className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 gap-6">
     <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><ChevronLeft size={20} /></button>
     <h2 className="text-lg font-bold tracking-tight">{title}</h2>
  </div>
);
