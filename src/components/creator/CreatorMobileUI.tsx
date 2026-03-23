'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Heart, Share2, Tag, Info, UserPlus, Layers, Loader2, Settings, Sparkles, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

// 1. ProfileHeaderMobile
export const ProfileHeaderMobile = ({ user, aesthetic }: any) => (
  <div className="px-6 pt-12 pb-8 space-y-6">
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-[32px] overflow-hidden bg-white/5 border border-white/10 p-1">
        <img src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'} className="w-full h-full object-cover rounded-[28px]" alt="" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">@{user?.username}</h1>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mt-1">{user?.aesthetic || 'Global'} Aesthetic</p>
      </div>
    </div>
    <div className="flex gap-4">
       <button className="flex-1 h-12 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
         <UserPlus size={16} /> Follow
       </button>
       <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
         <Share2 size={18} />
       </button>
    </div>
  </div>
);

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
export const ItemCardMobile = ({ item, onClick }: any) => (
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

// 4. AttributeBadge
export const AttributeBadge = ({ label, value }: { label: string, value: string }) => (
  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex flex-col">
     <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{label}</span>
     <span className="text-xs font-bold text-white/80">{value}</span>
  </div>
);

// 5. StatsBarMobile
export const StatsBarMobile = ({ user }: any) => (
  <div className="flex justify-between px-10 py-6 border-y border-white/5">
     <div className="text-center">
        <p className="text-xl font-bold tracking-tighter">{user?.pages?.length || 0}</p>
        <p className="text-[9px] uppercase font-bold tracking-widest opacity-20">Pages</p>
     </div>
     <div className="text-center">
        <p className="text-xl font-bold tracking-tighter">{user?.followersCount || '1.2k'}</p>
        <p className="text-[9px] uppercase font-bold tracking-widest opacity-20">Followers</p>
     </div>
     <div className="text-center">
        <p className="text-xl font-bold tracking-tighter">{user?.followingCount || '450'}</p>
        <p className="text-[9px] uppercase font-bold tracking-widest opacity-20">Following</p>
     </div>
  </div>
);

// 6. AddToCartButtonMobile
export const AddToCartButtonMobile = ({ price, currency, onClick }: any) => (
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

// 7. SellerProfileMini
export const SellerProfileMini = ({ user }: any) => (
  <div className="flex items-center gap-3 py-4">
     <div className="w-10 h-10 rounded-xl bg-white/5 overflow-hidden">
        <img src={user?.image} className="w-full h-full object-cover" alt="" />
     </div>
     <div>
        <p className="text-xs font-bold leading-none">@{user?.username}</p>
        <p className="text-[10px] text-white/40 font-bold mt-1 uppercase tracking-widest">Verified Creator</p>
     </div>
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
export const AttributeGridMobile = ({ attributes }: any) => (
  <div className="grid grid-cols-2 gap-3">
     {Object.entries(attributes || {}).map(([k, v]: any) => (
        <AttributeBadge key={k} label={k} value={v} />
     ))}
  </div>
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

// 12. ShareSheetMobile
export const ShareSheetMobile = ({ isOpen, onClose }: any) => (
   <AnimatePresence>
     {isOpen && (
       <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="relative w-full max-w-lg bg-[#0A0A0A] rounded-t-[48px] p-10 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
             <div className="w-12 h-1.5 rounded-full bg-white/10 mx-auto mb-10" />
             <h3 className="text-2xl font-bold tracking-tighter mb-8">Spread the Aesthetic</h3>
             <div className="grid grid-cols-4 gap-4 mb-10">
                {['Instagram', 'Twitter', 'URL', 'QR'].map(m => (
                   <div key={m} className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                         <Share2 size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{m}</span>
                   </div>
                ))}
             </div>
             <button onClick={onClose} className="w-full h-14 rounded-2xl bg-white/5 font-bold uppercase tracking-widest text-xs border border-white/10">Dismiss</button>
          </motion.div>
       </div>
     )}
   </AnimatePresence>
);

// 13. EmptyStateMobile (already exists)

// 14. InfiniteScrollFeedMobile
export const InfiniteScrollFeedMobile = ({ children, isLoading }: any) => (
  <div className="space-y-6">
    {children}
    {isLoading && (
      <div className="flex justify-center py-10 opacity-20">
        <Loader2 size={24} className="animate-spin" />
      </div>
    )}
  </div>
);

// 15. QuickActionOverlay
export const QuickActionOverlay = ({ onAction }: any) => (
  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
     {['edit', 'hide', 'delete'].map(a => (
        <button key={a} onClick={() => onAction(a)} className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
           <Settings size={14} className="opacity-60" />
        </button>
     ))}
  </div>
);

// 16. AestheticNotificationToast
export const AestheticNotificationToast = ({ message }: { message: string }) => (
  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-24 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center gap-3 z-50">
     <Sparkles size={16} className="text-amber-400" />
     <span className="text-[10px] font-bold uppercase tracking-widest">{message}</span>
  </motion.div>
);

// 17. BulkActionDrawer
export const BulkActionDrawer = ({ count, onAction }: any) => (
  <div className="fixed bottom-0 left-0 right-0 p-8 pt-4 bg-[#0A0A0A] border-t border-white/10 z-[100] rounded-t-[40px] shadow-2xl">
     <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6" />
     <div className="flex items-center justify-between mb-8">
        <p className="text-sm font-bold tracking-tight"><span className="text-white/40">{count}</span> Items Selected</p>
        <button className="text-xs font-bold uppercase tracking-widest text-red-400">Clear</button>
     </div>
     <div className="grid grid-cols-3 gap-3">
        {['Move', 'Duplicate', 'Delete'].map(a => (
           <button key={a} onClick={() => onAction(a)} className="h-14 rounded-2xl bg-white/5 border border-white/5 font-bold uppercase tracking-widest text-[10px]">{a}</button>
        ))}
     </div>
  </div>
);

// 18. CategoryScrollerMobile
export const CategoryScrollerMobile = ({ cats, selected, onSelect }: any) => (
  <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8">
     {cats.map((c: string) => (
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

// 22. SellerInfoFullMobile
export const SellerInfoFullMobile = ({ user }: any) => (
  <div className="p-8 rounded-[40px] bg-white/5 border border-white/5 space-y-4">
     <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/10 overflow-hidden" />
        <div>
           <p className="font-bold tracking-tight">@{user?.username}</p>
           <p className="text-[10px] opacity-20 uppercase font-bold">Verified Aesthetic Maker</p>
        </div>
     </div>
     <p className="text-xs text-white/40 leading-relaxed italic">{user?.description || "Visual curator specializing in Noir and Minimalist storefronts."}</p>
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

// 24. SuccessOverlayMobile
export const SuccessOverlayMobile = ({ onDone }: any) => (
  <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-10 text-center">
     <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-8">
        <Heart size={40} className="text-black" />
     </div>
     <h2 className="text-4xl font-bold tracking-tighter mb-4 italic">Aesthetic Deployed</h2>
     <p className="text-white/40 mb-10">Your collection has been updated globally across the Artsy stack.</p>
     <button onClick={onDone} className="w-full h-16 rounded-2xl bg-white text-black font-extrabold uppercase tracking-widest text-xs">Return to Studio</button>
  </div>
);

// 25. StickyActionHeaderMobile
export const StickyActionHeaderMobile = ({ title, onBack }: any) => (
  <div className="fixed top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 gap-6">
     <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><ChevronLeft size={20} /></button>
     <h2 className="text-lg font-bold tracking-tight">{title}</h2>
  </div>
);
