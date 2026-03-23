import React from 'react';
import { useAesthetic } from '../AestheticProvider';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="py-20 px-10 text-center border-b border-black/[0.05]">
      <div className="w-32 h-32 mx-auto rounded-full bg-black/5 p-1 mb-8">
        <div className="w-full h-full rounded-full bg-white border border-black/[0.05] overflow-hidden">
          <img src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'} className="w-full h-full object-cover" alt="" />
        </div>
      </div>
      <h1 className="text-4xl font-extralight tracking-tight mb-2">@{user?.username || 'minimalist'}</h1>
      <p className="text-sm opacity-40 uppercase tracking-[0.3em] font-medium">Visual Curator</p>
    </div>
  );
};