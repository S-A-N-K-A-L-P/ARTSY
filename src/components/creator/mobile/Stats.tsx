'use client';

import React from 'react';
import { UserProfile } from '@/types/creator';

/**
 * Profile counts.
 *
 * The fallbacks here used to be '1.2k' followers and '450' following, so a
 * brand-new account with no audience displayed an invented one. A real zero is
 * more honest than a fake number.
 */
export const StatsBarMobile = ({ user }: { user?: UserProfile }) => {
  const stats = [
    { label: 'Pages', value: user?.pages?.length ?? 0 },
    { label: 'Followers', value: user?.followersCount ?? 0 },
    { label: 'Following', value: user?.followingCount ?? 0 },
  ];

  return (
    <div className="grid grid-cols-3 border-y border-line">
      {stats.map((s) => (
        <div key={s.label} className="py-4 text-center">
          <p className="text-lg font-black tabular-nums tracking-tight text-text">{s.value}</p>
          <p className="mt-0.5 text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
};
