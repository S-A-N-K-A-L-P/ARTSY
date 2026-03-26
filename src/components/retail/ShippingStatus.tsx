'use client';

import React from 'react';
import { Truck, Package, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <div className="space-y-8">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">Logistics Flow</span>
        {date && (
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.2em] italic">Est: {date}</span>
          </div>
        )}
      </div>

      <div className="relative flex items-center justify-between w-full px-4">
        {/* Connection Line */}
        <div className="absolute top-6 left-10 right-10 h-px bg-neutral-100 z-0">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
             className="h-full bg-neutral-900"
             transition={{ duration: 1.5, ease: "easeInOut" }}
           />
        </div>

        {steps.map((step, i) => (
           <div key={step.key} className="flex flex-col items-center gap-4 relative z-10">
              <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ 
                   scale: i <= currentIndex ? 1 : 0.9, 
                   opacity: 1,
                   backgroundColor: i <= currentIndex ? "#111111" : "#ffffff"
                 }}
                 className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border shadow-sm",
                    i <= currentIndex ? "border-neutral-900 text-white shadow-xl shadow-black/10" : "bg-white text-neutral-200 border-neutral-100"
                 )}
              >
                 <step.icon size={18} strokeWidth={i === currentIndex ? 2.5 : 2} />
              </motion.div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-500",
                i <= currentIndex ? "text-neutral-900" : "text-neutral-300"
              )}>
                {step.label}
              </span>
           </div>
        ))}
      </div>
    </div>
  );
};
