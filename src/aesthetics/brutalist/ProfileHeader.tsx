import React from 'react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="p-20 bg-[#DEDEDE] border-8 border-black">
       <div className="flex gap-12 items-start">
          <div className="w-48 h-48 bg-black p-1">
             <div className="w-full h-full bg-white grayscale">
                <img src={user?.image} className="w-full h-full object-cover contrast-150" alt="" />
             </div>
          </div>
          <div className="flex-1">
             <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">@{user?.username || 'BRUTAL'}</h1>
             <div className="grid grid-cols-2 border-t-4 border-black pt-8">
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                   <p className="text-2xl font-black uppercase">Active Creator</p>
                </div>
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest mb-1">Rank</p>
                   <p className="text-2xl font-black uppercase">Elite Tier</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};