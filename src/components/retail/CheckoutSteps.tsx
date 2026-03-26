'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: number; // 0, 1, 2
}

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const steps = ['Identity', 'Distribution', 'Convergence'];

  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto py-12">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-3">
            <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
               i < currentStep ? "bg-emerald-500 text-white" : 
               i === currentStep ? "bg-neutral-900 text-white shadow-xl shadow-black/10" : 
               "bg-neutral-50 text-neutral-200 border border-neutral-100"
            )}>
               {i < currentStep ? <Check size={16} strokeWidth={3} /> : (
                 <span className="text-[10px] font-black uppercase tracking-widest leading-none">{i + 1}</span>
               )}
            </div>
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-[0.2em]",
              i <= currentStep ? "text-neutral-900" : "text-neutral-300"
            )}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
             <div className={cn(
               "h-[2px] w-full mx-4 mb-8 flex-1 transition-all duration-1000",
               i < currentStep ? "bg-emerald-500" : "bg-neutral-100"
             )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
