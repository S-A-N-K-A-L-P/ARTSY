'use client';

import React from 'react';
import { Layers, LayoutGrid, PlusCircle } from 'lucide-react';
import { CartItem } from '@/types/creator';

// 2. MasonryGridDesktop
export const MasonryGridDesktop = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
     {children}
  </div>
);

// 10. EmptyStateCreator
export const EmptyStateCreator = () => (
  <div className="col-span-full py-40 border-2 border-dashed border-white/5 rounded-[60px] flex flex-col items-center justify-center p-10 text-center">
     <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8">
        <Layers size={32} className="opacity-20" />
     </div>
     <h3 className="text-2xl font-bold tracking-tight mb-4">No aesthetic items found</h3>
     <p className="text-white/40 max-w-xs mb-10 font-medium">Start building your storefront by adding your first curated piece.</p>
     <button className="h-14 px-10 rounded-2xl bg-white text-black font-extrabold uppercase tracking-widest text-xs">Create Item</button>
  </div>
);

// 8. CheckoutSummaryPanel
export const CheckoutSummaryPanel = ({ cartItems, total }: { cartItems: CartItem[], total: string }) => (
  <div className="w-96 sticky top-24 p-10 rounded-[48px] bg-white text-black shadow-2xl space-y-8">
     <h3 className="text-2xl font-bold tracking-tighter">Your Bag</h3>
     <div className="space-y-4">
        {cartItems.map((item) => (
           <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 rounded-2xl bg-black/5 overflow-hidden">
                 <img src={item.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1">
                 <p className="font-bold tracking-tight text-sm line-clamp-1">{item.title}</p>
                 <p className="text-xs font-bold opacity-40 italic">{item.price}</p>
              </div>
           </div>
        ))}
     </div>
     <div className="pt-8 border-t border-black/10 space-y-4">
        <div className="flex justify-between items-end">
           <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Estimate Total</span>
           <span className="text-3xl font-bold italic tracking-tighter">{total}</span>
        </div>
        <button className="w-full h-16 rounded-2xl bg-black text-white font-bold uppercase tracking-[0.2em] text-xs active:scale-[0.98] transition-all">Secure Checkout</button>
     </div>
  </div>
);

// 21. BulkAssetUploaderDesktop
export const BulkAssetUploaderDesktop = () => (
   <div className="col-span-full h-80 rounded-[60px] bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-10 text-center group hover:bg-white/[0.07] transition-all">
      <PlusCircle size={40} className="opacity-10 group-hover:opacity-40 mb-6 transition-all" />
      <h3 className="text-3xl font-bold tracking-tighter mb-2">Mass Aesthetic Curator</h3>
      <p className="text-white/40 max-w-xs font-medium italic">Drop up to 50 assets to auto-generate gallery pieces.</p>
   </div>
);

// 14. DragDropOrganizerDesktop
export const DragDropOrganizerDesktop = ({ items }: any) => (
  <div className="p-10 rounded-[60px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center group hover:border-white/10 transition-all cursor-move">
     <LayoutGrid size={48} className="opacity-10 group-hover:opacity-100 transition-all mb-6" />
     <p className="font-bold tracking-[0.3em] uppercase text-xs opacity-20">Drag to reorder aesthetic priority</p>
  </div>
);
