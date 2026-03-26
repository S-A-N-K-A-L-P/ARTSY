'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckoutStepsProps {
  currentStep: number; // 0, 1, 2
}

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const steps = ['Identity', 'Distribution', 'Convergence'];

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto py-16">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-4 relative">
            <motion.div 
               initial={false}
               animate={{ 
                 scale: i === currentStep ? 1.1 : 1,
                 backgroundColor: i < currentStep ? "#10b981" : i === currentStep ? "#111111" : "#ffffff"
               }}
               className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 border",
                  i < currentStep ? "border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" : 
                  i === currentStep ? "border-neutral-900 text-white shadow-2xl shadow-black/20" : 
                  "bg-white text-neutral-200 border-neutral-100"
               )}
            >
               {i < currentStep ? <Check size={18} strokeWidth={3} /> : (
                 <span className="text-[11px] font-black uppercase tracking-widest leading-none">{i + 1}</span>
               )}
            </motion.div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-500",
              i <= currentStep ? "text-neutral-900" : "text-neutral-300"
            )}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
             <div className="h-[1px] flex-1 mx-6 mb-9 bg-neutral-100 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: i < currentStep ? "100%" : "0%" }}
                  className="absolute inset-y-0 left-0 bg-emerald-500"
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
             </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
