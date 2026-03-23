import React from 'react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="relative h-96 flex items-end p-12 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40 grayscale contrast-125">
        <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative flex items-center gap-8">
        <div className="w-40 h-40 border border-white/20 p-2">
          <img src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'} className="w-full h-full object-cover grayscale" alt="" />
        </div>
        <div>
          <h1 className="text-6xl font-bold tracking-tighter uppercase italic leading-none mb-4">@{user?.username || 'noir'}</h1>
          <div className="flex gap-4">
             <span className="px-4 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest">Aesthetic: Elite</span>
             <span className="px-4 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest">Verified Collector</span>
          </div>
        </div>
      </div>
    </div>
  );
};