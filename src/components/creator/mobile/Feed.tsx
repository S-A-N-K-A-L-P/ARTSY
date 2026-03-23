'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AestheticItem } from '@/types/creator';

// 2. PageTabsScroller
export const PageTabsScroller = ({ pages, activeSlug, onSelect }: any) => (
  <div className="flex overflow-x-auto no-scrollbar gap-2 px-6 py-4">
    {pages.map((p: any) => (
      <button 
        key={p.slug}
        onClick={() => onSelect(p.slug)}
        className={cn(
          "px-6 h-10 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
          activeSlug === p.slug ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/5"
        )}
      >
        {p.name}
      </button>
    ))}
  </div>
);

// 3. ItemCardMobile
export const ItemCardMobile = ({ item, onClick }: { item: AestheticItem, onClick?: () => void }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-white/5 border border-white/5"
  >
    <img src={item.images?.[0]} className="w-full h-full object-cover opacity-80" alt="" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
       <h4 className="text-lg font-bold tracking-tight line-clamp-1">{item.title}</h4>
       <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-bold italic">{item.currency} {item.price?.toLocaleString()}</p>
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
             <ShoppingBag size={14} />
          </div>
       </div>
    </div>
  </motion.div>
);

// 10. ImageCarouselMobile
export const ImageCarouselMobile = ({ images }: { images: string[] }) => (
  <div className="relative aspect-[4/5] -mx-6 mb-10 overflow-hidden">
     <div className="flex h-full overflow-x-auto snap-x no-scrollbar">
        {images.map((img, i) => (
           <div key={i} className="min-w-full h-full snap-center p-4">
              <img src={img} className="w-full h-full object-cover rounded-[48px]" alt="" />
           </div>
        ))}
     </div>
     <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
           <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
        ))}
     </div>
  </div>
);

// 11. PagePreviewListMobile
export const PagePreviewListMobile = ({ pages, onSelect }: any) => (
  <div className="space-y-4 px-6 pb-20">
    <div className="flex items-center justify-between mb-4">
       <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/20">Aesthetic Spaces</h3>
       <span className="px-2 py-1 rounded bg-white/5 text-[8px] font-bold uppercase tracking-widest opacity-40">{pages.length} Total</span>
    </div>
    {pages.map((p: any) => (
       <div 
         key={p._id} 
         onClick={() => onSelect(p.slug)}
         className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 active:scale-[0.98] transition-all cursor-pointer group hover:bg-white/10"
       >
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 relative">
             <img src={p.coverImage} className="w-full h-full object-cover" alt="" />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
          </div>
          <div className="flex-1">
             <p className="font-bold tracking-tight text-lg leading-none mb-1">{p.name}</p>
             <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.2em]">{p.type} • {p.aesthetic}</p>
          </div>
          <ChevronRight size={18} className="opacity-20 group-hover:opacity-100 transition-all" />
       </div>
    ))}
  </div>
);

// 14. InfiniteScrollFeedMobile
export const InfiniteScrollFeedMobile = ({ children, isLoading }: { children: React.ReactNode, isLoading?: boolean }) => (
  <div className="space-y-6">
    {children}
    {isLoading && (
      <div className="flex justify-center py-10 opacity-20">
        <Loader2 size={24} className="animate-spin" />
      </div>
    )}
  </div>
);

// 18. CategoryScrollerMobile
export const CategoryScrollerMobile = ({ cats, selected, onSelect }: { cats: string[], selected: string, onSelect: (cat: string) => void }) => (
  <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8">
     {cats.map((c) => (
        <button 
          key={c}
          onClick={() => onSelect(c)}
          className={cn("px-5 h-9 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all", selected === c ? "bg-white text-black" : "bg-white/5 text-white/20")}
        >
          {c}
        </button>
     ))}
  </div>
);

// 19. ItemGrid2ColMobile
export const ItemGrid2ColMobile = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-4">
     {children}
  </div>
);
