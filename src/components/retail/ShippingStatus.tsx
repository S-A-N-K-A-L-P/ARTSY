'use client';

import React from 'react';
import { Truck, Package, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShippingStatusProps {
  status: 'ordered' | 'shipped' | 'delivered';
  date?: string;
}

export const ShippingStatus = ({ status, date }: ShippingStatusProps) => {
  const steps = [
    { key: 'ordered', label: 'Manifested', icon: Package },
    { key: 'shipped', label: 'In Transit', icon: Truck },
    { key: 'delivered', label: 'Arrived', icon: CheckCircle2 },
  ];

  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Logistics Flow</span>
        {date && <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">Est: {date}</span>}
      </div>

      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center gap-2 flex-1">
               <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  i <= currentIndex ? "bg-neutral-900 text-white" : "bg-neutral-50 text-neutral-200"
               )}>
                  <step.icon size={16} />
               </div>
               <span className={cn(
                 "text-[8px] font-bold uppercase tracking-widest",
                 i <= currentIndex ? "text-neutral-900" : "text-neutral-300"
               )}>
                 {step.label}
               </span>
            </div>
            {i < steps.length - 1 && (
               <div className="w-full h-px bg-neutral-100 mt-5 mx-2 flex-1 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
