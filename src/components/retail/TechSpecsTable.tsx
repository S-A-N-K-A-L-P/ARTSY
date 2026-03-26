'use client';

import React from 'react';

interface TechSpecsTableProps {
  specs: { label: string; value: string }[];
}

export const TechSpecsTable = ({ specs }: TechSpecsTableProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900">Technical Specifications</h3>
      </div>
      
      <div className="border-t border-neutral-100 divide-y divide-neutral-50/50">
        {specs.map((spec, i) => (
          <div key={i} className="flex justify-between py-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{spec.label}</span>
            <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
