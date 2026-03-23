'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// 4. AttributeBadge
export const AttributeBadge = ({ label, value }: { label: string, value: string }) => (
  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex flex-col">
     <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{label}</span>
     <span className="text-xs font-bold text-white/80">{value}</span>
  </div>
);

// 6. AddToCartButtonMobile
export const AddToCartButtonMobile = ({ price, currency, onClick }: { price: number, currency: string, onClick?: () => void }) => (
  <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent z-[60]">
     <button 
       onClick={onClick}
       className="w-full h-16 rounded-[24px] bg-white text-black font-extrabold flex items-center justify-between px-8 shadow-2xl shadow-white/10"
     >
        <span className="text-sm uppercase tracking-[0.2em]">Add to Cart</span>
        <div className="flex items-center gap-3">
           <span className="text-xs opacity-40">|</span>
           <span className="text-lg italic font-bold">{currency} {price?.toLocaleString()}</span>
           <ChevronRight size={20} />
        </div>
     </button>
  </div>
);

// 8. DescriptionBlockMobile
export const DescriptionBlockMobile = ({ text }: { text: string }) => (
  <div className="space-y-4">
     <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/20">The Story</h3>
     <p className="text-sm font-medium leading-relaxed text-white/60">
        {text}
     </p>
  </div>
);

// 9. AttributeGridMobile
export const AttributeGridMobile = ({ attributes }: { attributes?: Record<string, string> }) => (
  <div className="grid grid-cols-2 gap-3">
     {Object.entries(attributes || {}).map(([k, v]) => (
        <AttributeBadge key={k} label={k} value={v} />
     ))}
  </div>
);

// 20. AestheticThemeBadge
export const AestheticThemeBadge = ({ theme }: { theme: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
     <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
     <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{theme} Mode</span>
  </div>
);

// 21. PriceFilterMobile
export const PriceFilterMobile = () => (
   <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 mb-4">Price Range</h4>
      <div className="flex items-center gap-4">
         <div className="flex-1 h-1 bg-white/10 rounded-full relative">
            <div className="absolute left-1/4 right-1/4 h-full bg-white" />
         </div>
      </div>
   </div>
);

// 23. CheckoutStepsMobile
export const CheckoutStepsMobile = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-between px-10 py-6 mb-8">
     {[1, 2, 3].map(s => (
        <div key={s} className="flex items-center gap-2">
           <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold", s <= currentStep ? "bg-white text-black" : "bg-white/5 text-white/20")}>{s}</div>
           {s < 3 && <div className={cn("w-8 h-px", s < currentStep ? "bg-white" : "bg-white/10")} />}
        </div>
     ))}
  </div>
);

// 13. EmptyStateMobile (already exists as placeholder in original, adding here if needed)
export const EmptyStateMobile = () => (
  <div className="py-20 flex flex-col items-center justify-center text-center px-10">
     <p className="text-white/20 text-xs font-bold uppercase tracking-widest">No items in this collection</p>
  </div>
);
