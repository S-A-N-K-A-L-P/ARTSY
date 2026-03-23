'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Search, 
  LayoutGrid, 
  Maximize2, 
  TrendingUp, 
  Award, 
  ShieldCheck,
  Package,
  ArrowUpRight,
  MousePointer2,
  ChevronDown,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 1. SidebarFilterPanel
export const SidebarFilterPanel = ({ categories, selectedCat, onSelect }: any) => (
  <aside className="w-80 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto pr-8 no-scrollbar hidden xl:block">
    <div className="space-y-12">
      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Discovery</h3>
        <div className="space-y-1">
          {['New Arrivals', 'Best Sellers', 'Aesthetic Choice', 'Limited Edition'].map(f => (
            <button key={f} className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold opacity-40 hover:opacity-100 flex items-center justify-between group">
              {f} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Categories</h3>
        <div className="space-y-1">
          {categories.map((c: string) => (
            <button 
              key={c} 
              onClick={() => onSelect(c)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-bold flex items-center gap-3",
                selectedCat === c ? "bg-white text-black" : "opacity-40 hover:opacity-100 hover:bg-white/5"
              )}
            >
              <div className={cn("w-2 h-2 rounded-full", selectedCat === c ? "bg-black" : "bg-white/20")} />
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-[40px] bg-gradient-to-br from-white/5 to-transparent border border-white/10">
         <Award size={24} className="mb-4 text-white/40" />
         <p className="font-bold tracking-tight mb-2">Aesthetic Guarantee</p>
         <p className="text-[10px] text-white/40 font-medium leading-relaxed">Every item in this collection is verified for high-depth visual consistency.</p>
      </div>
    </div>
  </aside>
);

// 2. MasonryGridDesktop
export const MasonryGridDesktop = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
     {children}
  </div>
);

// 3. HoverPreviewCard
export const HoverPreviewCard = ({ item, onClick }: any) => (
  <motion.div 
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={onClick}
    className="group relative h-[450px] rounded-[48px] overflow-hidden bg-white/5 border border-white/5 cursor-pointer"
  >
    <img src={item.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-80 group-hover:opacity-100" alt={item.title} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all duration-500">
       <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest">{item.category}</span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest">{item.aesthetic}</span>
       </div>
       <h3 className="text-3xl font-bold tracking-tighter mb-2">{item.title}</h3>
       <p className="text-sm font-bold italic tracking-tight text-white/60 mb-6">{item.currency} {item.price?.toLocaleString()}</p>
       
       <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div initial={{ x: '-100%' }} whileHover={{ x: '0%' }} className="h-full bg-white" />
       </div>
    </div>
    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
       <Maximize2 size={18} />
    </div>
  </motion.div>
);

// 4. AttributeDataGrid
export const AttributeDataGrid = ({ attributes }: any) => (
  <div className="grid grid-cols-1 gap-4">
     {Object.entries(attributes || {}).map(([k, v]: any) => (
        <div key={k} className="flex items-center justify-between py-4 border-b border-white/5">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/20">{k}</span>
           <span className="font-bold tracking-tight italic">{v}</span>
        </div>
     ))}
  </div>
);

// 5. CreatorDashboardStats
export const CreatorDashboardStats = ({ stats }: any) => (
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

// 6. AestheticOverrideBadge
export const AestheticOverrideBadge = ({ theme }: { theme: string }) => (
  <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 flex items-center gap-4 group cursor-help">
     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
     <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-all">Theme Override Active: {theme}</span>
     <Info size={14} className="opacity-20 group-hover:opacity-100 transition-all" />
  </div>
);

// 7. BreadcrumbNavigation
export const BreadcrumbNavigation = ({ paths }: { paths: { label: string, href?: string }[] }) => (
  <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest p-10">
    <span className="opacity-20">Store</span>
    {paths.map((p, i) => (
      <React.Fragment key={i}>
        <ChevronDown size={14} className="-rotate-90 opacity-10" />
        <span className={cn(i === paths.length - 1 ? "text-white" : "opacity-40")}>{p.label}</span>
      </React.Fragment>
    ))}
  </nav>
);

// 8. CheckoutSummaryPanel
export const CheckoutSummaryPanel = ({ cartItems, total }: any) => (
  <div className="w-96 sticky top-24 p-10 rounded-[48px] bg-white text-black shadow-2xl space-y-8">
     <h3 className="text-2xl font-bold tracking-tighter">Your Bag</h3>
     <div className="space-y-4">
        {cartItems.map((item: any) => (
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

// 9. BulkActionToolbar
export const BulkActionToolbar = () => (
   <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-center gap-8 z-[100]">
      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest pr-8 border-r border-white/10">
         <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">3</span> Selected
      </div>
      <div className="flex items-center gap-6">
         {['Duplicate', 'Hide', 'Export', 'Delete'].map(a => (
            <button key={a} className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">{a}</button>
         ))}
      </div>
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

// 11. SearchOverlayDesktop
export const SearchOverlayDesktop = () => (
   <div className="relative group max-w-sm">
      <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-all" />
      <input 
        placeholder="Find aesthetic..." 
        className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-sm font-bold placeholder:opacity-20 focus:outline-none focus:border-white/20 transition-all font-mono"
      />
   </div>
);

// 12. ThemeSwitcherDesktop
export const ThemeSwitcherDesktop = ({ current, themes, onSelect }: any) => (
   <div className="flex items-center gap-2">
      {themes.map((t: any) => (
         <button 
           key={t.id}
           onClick={() => onSelect(t.id)}
           className={cn(
             "w-3 h-3 rounded-full transition-all",
             current === t.id ? "ring-4 ring-white/10 scale-125 bg-white" : "bg-white/20 hover:bg-white/40"
           )}
           title={t.label}
         />
      ))}
   </div>
);

// 13. AdvancedProductInfo (already exists)

// 14. DragDropOrganizerDesktop
export const DragDropOrganizerDesktop = ({ items }: any) => (
  <div className="p-10 rounded-[60px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center group hover:border-white/10 transition-all cursor-move">
     <LayoutGrid size={48} className="opacity-10 group-hover:opacity-100 transition-all mb-6" />
     <p className="font-bold tracking-[0.3em] uppercase text-xs opacity-20">Drag to reorder aesthetic priority</p>
  </div>
);

// 15. PageCustomizerSidebar
export const PageCustomizerSidebar = ({ page, onUpdate }: any) => (
  <div className="w-96 space-y-12 p-10 bg-white/5 border-l border-white/5 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto no-scrollbar">
     <h3 className="text-xl font-bold tracking-tighter italic">Customize Space</h3>
     <div className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Typography Style</label>
        <div className="grid grid-cols-2 gap-2">
           {['Serif', 'Mono', 'Sans', 'Display'].map(f => (
              <button key={f} className="h-12 rounded-xl bg-white/5 border border-white/5 text-xs font-bold hover:border-white/20 transition-all">{f}</button>
           ))}
        </div>
     </div>
     <div className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Container Radius</label>
        <input type="range" className="w-full accent-white opacity-20 hover:opacity-100 transition-all" />
     </div>
  </div>
);

// 16. AestheticPreviewLiveDesktop
export const AestheticPreviewLiveDesktop = ({ theme }: { theme: string }) => (
  <div className="p-8 rounded-[48px] bg-white text-black flex items-center justify-between">
     <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center"><Palette size={20} className="text-white" /></div>
        <div>
           <p className="font-bold tracking-tight">Live: {theme}</p>
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Draft Preview Mode</p>
        </div>
     </div>
     <button className="h-12 px-6 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-widest">Publish</button>
  </div>
);

// 17. AdvancedSearchModalDesktop
export const AdvancedSearchModalDesktop = ({ isOpen, onClose }: any) => (
   <AnimatePresence>
     {isOpen && (
       <div className="fixed inset-0 z-[200] flex items-center justify-center p-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-4xl bg-white/5 border border-white/10 rounded-[60px] p-20 shadow-2xl">
             <input autoFocus placeholder="Find items, pages, or collectors..." className="w-full bg-transparent text-6xl font-bold tracking-tighter placeholder:opacity-10 focus:outline-none italic" />
             <div className="mt-20 grid grid-cols-3 gap-12 text-left">
                <div>
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-6">Trending Pages</h4>
                   <div className="space-y-4 font-bold tracking-tight opacity-40 hover:opacity-100 transition-opacity cursor-pointer">/streetwear</div>
                </div>
                <div>
                   <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-6">Aesthetics</h4>
                   <div className="space-y-4 font-bold tracking-tight opacity-40">#noir #cyberpunk #vapor</div>
                </div>
             </div>
          </motion.div>
       </div>
     )}
   </AnimatePresence>
);

// 18. CreatorInsightCard
export const CreatorInsightCard = ({ label, chart }: any) => (
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

// 19. ItemDetailSidebarDesktop
export const ItemDetailSidebarDesktop = ({ item }: any) => (
  <div className="space-y-12">
     <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10" />
        <p className="font-bold tracking-tight opacity-40 italic">Managed by {item.owner || "Trustee"}</p>
     </div>
     <div className="p-10 rounded-[40px] border border-white/5 space-y-4">
        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20">Ownership Records</h4>
        <p className="text-sm font-medium opacity-40 leading-relaxed italic">This aesthetic piece was curated on March 2026. Part of the Digital Renaissance collection.</p>
     </div>
  </div>
);

// 20. MultiTabNavigationDesktop
export const MultiTabNavigationDesktop = ({ tabs, active, onSelect }: any) => (
  <div className="flex items-center gap-12 border-b border-white/5 px-10">
     {tabs.map((t: any) => (
        <button 
           key={t.id} 
           onClick={() => onSelect(t.id)}
           className={cn("h-20 text-xs font-bold uppercase tracking-[0.3em] transition-all relative", active === t.id ? "text-white" : "opacity-20 hover:opacity-100")}
        >
           {t.label}
           {active === t.id && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full" />}
        </button>
     ))}
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

// 22. UserProfileMiniDesktop
export const UserProfileMiniDesktop = ({ user }: any) => (
  <div className="flex items-center gap-6 p-6 rounded-[32px] bg-white/5 border border-white/5">
     <div className="w-14 h-14 rounded-2xl bg-white/10" />
     <div className="flex-1">
        <p className="font-bold tracking-tight">@{user?.username}</p>
        <p className="text-[10px] opacity-20 uppercase font-bold tracking-widest">Collector Level IV</p>
     </div>
     <button className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center"><Plus size={18} /></button>
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

// 24. AestheticSettingsModalDesktop
export const AestheticSettingsModalDesktop = () => (
  <div className="p-10 rounded-[48px] bg-white/5 border border-white/5 flex flex-col gap-6">
     <h3 className="text-xl font-bold tracking-tighter italic">Global Visual Policy</h3>
     <div className="space-y-4">
        {['Override Default Fonts', 'Enable Grain FX', 'Force Dark Perspective'].map(p => (
           <div key={p} className="flex justify-between items-center">
              <span className="text-xs font-bold opacity-40">{p}</span>
              <div className="w-10 h-5 rounded-full bg-white/10 p-1 flex justify-end"><div className="w-3 h-3 rounded-full bg-white" /></div>
           </div>
        ))}
     </div>
  </div>
);

// 25. StorefrontFooterDesktop
export const StorefrontFooterDesktop = () => (
   <footer className="px-20 py-20 border-t border-white/5 grid grid-cols-4 gap-20">
      <div className="col-span-2 space-y-8">
         <h2 className="text-3xl font-bold tracking-tighter italic">Artsy Creator</h2>
         <p className="text-white/20 text-sm leading-relaxed max-w-md font-medium">The world's first high-depth aesthetic commerce protocol. Curate, host, and trade digital and physical assets in specialized visual spaces.</p>
      </div>
      <div className="space-y-6">
         <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20">Network</h4>
         <div className="space-y-2 text-sm font-bold opacity-40">
            <p>Explore</p><p>Connect</p><p>Govern</p>
         </div>
      </div>
      <div className="space-y-6 text-right">
         <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20">© 2026 Artsy</h4>
         <p className="text-[10px] opacity-10 uppercase tracking-widest leading-loose">Visual Integrity Guaranteed<br/>SSL SECURE ENDPOINT</p>
      </div>
   </footer>
);
