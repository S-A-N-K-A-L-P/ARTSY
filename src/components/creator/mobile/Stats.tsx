'use client';

import React from 'react';
import { UserProfile } from '@/types/creator';

// 5. StatsBarMobile
export const StatsBarMobile = ({ user }: { user?: UserProfile }) => (
  <div className="flex justify-between px-10 py-6 border-y border-white/5">
     <div className="text-center">
        <p className="text-xl font-bold tracking-tighter">{user?.pages?.length || 0}</p>
        <p className="text-[9px] uppercase font-bold tracking-widest opacity-20">Pages</p>
     </div>
     <div className="text-center">
        <p className="text-xl font-bold tracking-tighter">{user?.followersCount || '1.2k'}</p>
        <p className="text-[9px] uppercase font-bold tracking-widest opacity-20">Followers</p>
     </div>
     <div className="text-center">
        <p className="text-xl font-bold tracking-tighter">{user?.followingCount || '450'}</p>
        <p className="text-[9px] uppercase font-bold tracking-widest opacity-20">Following</p>
     </div>
  </div>
);
