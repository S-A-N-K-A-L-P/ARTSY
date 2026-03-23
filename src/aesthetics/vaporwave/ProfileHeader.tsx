import React from 'react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="p-16 bg-[#fafafa] relative overflow-hidden">
       <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
       <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />
       
       <div className="relative flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-[40px] bg-white shadow-2xl flex items-center justify-center p-2 mb-10 rotate-3">
             <img src={user?.image} className="w-full h-full object-cover rounded-[32px]" alt="" />
          </div>
          <h2 className="text-5xl font-black italic tracking-tighter text-blue-900 mb-4 mix-blend-multiply">@{user?.username || 'vapor'}</h2>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-pink-500">Retro Digital Dreamer</p>
       </div>
    </div>
  );
};