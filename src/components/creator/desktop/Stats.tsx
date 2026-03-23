'use client';

import React from 'react';
import { TrendingUp, Package, ShieldCheck, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreatorStats as CreatorStatsType } from '@/types/creator';

// 5. CreatorDashboardStats
export const CreatorDashboardStats = ({ stats }: { stats?: CreatorStatsType }) => (
  <div className="grid grid-cols-4 gap-6">
     {[
       { label: 'Total Sales', value: stats?.sales || '₹4,52,000', icon: TrendingUp, color: 'text-emerald-400' },
       { label: 'Active Items', value: stats?.items || '128', icon: Package, color: 'text-blue-400' },
       { label: 'Verification', value: 'Elite', icon: ShieldCheck, color: 'text-amber-400' },
       { label: 'Page Rank', value: '#12', icon: Award, color: 'text-purple-400' }
     ].map(s => (
        <div key={s.label} className="p-8 rounded-[40px] bg-white/5 border border-white/5">
           <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6", s.color)}>
              <s.icon size={24} />
           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-20 mb-1">{s.label}</p>
           <p className="text-2xl font-bold tracking-tighter italic">{s.value}</p>
        </div>
     ))}
  </div>
);

// 18. CreatorInsightCard
export const CreatorInsightCard = ({ label, chart }: { label: string, chart?: any }) => (
  <div className="p-10 rounded-[48px] bg-white/5 border border-white/5 space-y-6">
     <div className="flex justify-between items-center">
        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20">{label}</h4>
        <TrendingUp size={16} className="text-emerald-400" />
     </div>
     <div className="h-32 w-full flex items-end gap-1">
        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
           <div key={i} className="flex-1 bg-white/10 rounded-t-lg transition-all hover:bg-white/40" style={{ height: `${h}%` }} />
        ))}
     </div>
  </div>
);

// 23. AnalyticsHeatmapDesktop
export const AnalyticsHeatmapDesktop = () => (
   <div className="space-y-6">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20">Global Engagement</h4>
      <div className="grid grid-cols-12 gap-1">
         {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-sm bg-white" style={{ opacity: Math.random() * 0.3 }} />
         ))}
      </div>
   </div>
);
