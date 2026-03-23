'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, PlusSquare, TrendingUp, User, Bell, Settings, LogOut,
  Heart, Grid, ArrowRight, ShieldCheck, Zap, Palette, ChevronDown, ChevronRight, UserCircle, Check, Sparkles, Layout, Plus
} from 'lucide-react';
import Masonry from 'react-masonry-css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';

// Core Engine & Dashboard Components
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { ThemeName } from '@/lib/theme/themes';
import CreationConsole from '@/components/creator/CreationConsole';

// High-Depth Creator Components (25+ Suite)
import { 
  AestheticThemeBadge,
  AestheticNotificationToast
} from '@/components/creator/CreatorMobileUI';
import { 
  CreatorDashboardStats, 
  SidebarFilterPanel, 
  MasonryGridDesktop,
  StorefrontFooterDesktop
} from '@/components/creator/CreatorDesktopUI';

const NAV_ITEMS = [
  { id: 'home', label: 'For You', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'manage', label: 'Studio', icon: Layout },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'profile', label: 'Profile', icon: User },
];

const AESTHETIC_OPTIONS: { id: ThemeName; label: string; color: string; desc: string }[] = [
  { id: 'soft',      label: 'Soft',       color: 'from-amber-200 to-orange-100', desc: 'Warm & inviting' },
  { id: 'minimal',   label: 'Minimal',    color: 'from-gray-100 to-white',       desc: 'Clean & focused' },
  { id: 'noir',      label: 'Noir',       color: 'from-gray-900 to-black',       desc: 'Dark & editorial' },
  { id: 'cyberpunk', label: 'Cyberpunk',  color: 'from-teal-400 to-indigo-900',  desc: 'Neon & digital' },
  { id: 'vaporwave', label: 'Vaporwave',  color: 'from-pink-400 to-purple-900',  desc: 'Retro & dreamy' },
  { id: 'brutalist', label: 'Brutalist',  color: 'from-stone-300 to-stone-500',  desc: 'Raw & industrial' },
  { id: 'grunge',    label: 'Grunge',     color: 'from-emerald-900 to-gray-900', desc: 'Earthy & textured' },
];

export default function DashboardDesktop() {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userPages, setUserPages] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All Spaces');
  
  const { aesthetic, setAesthetic } = useAesthetic();

  useEffect(() => { 
    setMounted(true); 
    if (session?.user) {
      fetch('/api/creator/page')
        .then(res => res.json())
        .then(data => {
          if (data.success) setUserPages(data.pages);
        });
    }
  }, [session]);

  const masonryItems = useMemo(() => {
    const images = [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop',
    ];
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      height: 300 + Math.floor(Math.random() * 200),
      image: images[i % images.length],
      title: 'Museum Piece',
      author: 'Nova'
    }));
  }, []);

  if (!mounted) return null;

  const handlePageSelect = (slug: string) => {
    if (session?.user?.name) {
       router.push(`/dashboard/${session.user.name}/${slug}`);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Persistent Desktop Sidebar */}
      <aside className="w-80 h-screen sticky top-0 p-10 flex flex-col z-50" style={{ backgroundColor: 'var(--bg)', borderRight: '1px solid var(--border)' }}>
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group hover:border-white/20 transition-all">
             <span className="font-bold italic text-xl" style={{ color: 'var(--accent)' }}>A</span>
          </div>
          <p className="font-black tracking-tighter text-2xl italic uppercase">Artsy</p>
        </div>

        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-5 px-6 py-4.5 rounded-2xl transition-all duration-300 font-bold text-sm tracking-tight",
                activeTab === item.id ? "bg-white text-black shadow-2xl scale-[1.02]" : "opacity-30 hover:opacity-100 hover:bg-white/5"
              )}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-10 space-y-4 border-t border-white/5">
           <AestheticThemeBadge theme={aesthetic} />
           <button onClick={() => setSettingsOpen(true)} className="w-full h-14 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 flex items-center gap-4 px-6 text-sm font-bold opacity-40 hover:opacity-100 transition-all">
              <Settings size={18} />
              <span>Identity Settings</span>
           </button>
        </div>
      </aside>

      {/* Primary Content Area */}
      <main className="flex-1 min-h-screen relative">
        <header className="h-24 px-12 flex items-center justify-between sticky top-0 backdrop-blur-3xl z-40" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)', borderBottom: '1px solid var(--border)' }}>
           <h2 className="text-3xl font-black tracking-tighter italic uppercase">{NAV_ITEMS.find(n => n.id === activeTab)?.label}</h2>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
                 <div className="w-2 h-2 rounded-full bg-emerald-400" />
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Live Node: Alpha</span>
              </div>
              <button className="p-3 opacity-20 hover:opacity-100 transition-all"><Bell size={20} /></button>
              <div className="w-12 h-12 rounded-2xl bg-white/10" />
           </div>
        </header>

        <div className="p-12">
          <AnimatePresence mode="wait">
             {activeTab === 'home' && (
                <motion.div key="home" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="text-5xl font-bold tracking-tighter italic">Curation / Feed</h3>
                      <button className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px]">Enter Museum Mode</button>
                   </div>
                   <MasonryGridDesktop>
                      {masonryItems.map((item) => (
                         <div key={item.id} className="group relative rounded-[48px] overflow-hidden bg-white/5 border border-white/5 hover:border-white/15 transition-all cursor-pointer" style={{ height: item.height }}>
                            <img src={item.image} className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all">
                               <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Perspective #{item.id}</p>
                               <h4 className="text-3xl font-bold tracking-tighter italic">{item.title}</h4>
                            </div>
                         </div>
                      ))}
                   </MasonryGridDesktop>
                </motion.div>
             )}

             {activeTab === 'manage' && (
                <motion.div key="manage" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-16">
                   <div className="max-w-5xl">
                      <CreatorDashboardStats stats={{ sales: '₹12,40,500', items: userPages.length }} />
                      <div className="mt-16 bg-white/5 border border-white/5 rounded-[60px] p-20 shadow-2xl">
                         <CreationConsole />
                      </div>
                   </div>
                </motion.div>
             )}

             {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-20 pb-40">
                   <AestheticRenderer component="ProfileHeader" props={{ user: session?.user }} />
                   
                   <div className="flex gap-16 max-w-[1600px]">
                      <SidebarFilterPanel 
                         categories={['All Spaces', 'Clothing', 'Art', 'Furniture', 'Digital']} 
                         selectedCat={selectedCat} 
                         onSelect={setSelectedCat} 
                      />
                      <div className="flex-1 space-y-12">
                         <div className="flex items-center justify-between">
                            <h3 className="text-4xl font-bold tracking-tighter italic">Personal Archetypes</h3>
                            <button onClick={() => setActiveTab('manage')} className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-white/5 active:scale-95 transition-all">Deploy New Space</button>
                         </div>
                         <MasonryGridDesktop>
                            {userPages.map((p: any) => (
                               <div key={p._id} onClick={() => handlePageSelect(p.slug)} className="group relative h-[450px] rounded-[56px] overflow-hidden bg-white/5 border border-white/5 cursor-pointer hover:border-white/20 transition-all">
                                  <img src={p.coverImage} className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" alt="" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all">
                                     <div className="flex gap-2 mb-3">
                                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">{p.type}</span>
                                     </div>
                                     <h4 className="text-4xl font-bold tracking-tighter">{p.name}</h4>
                                  </div>
                               </div>
                            ))}
                            {userPages.length === 0 && Array.from({ length: 3 }).map((_, i) => (
                               <div key={i} className="h-[450px] rounded-[56px] border-2 border-dashed border-white/5 flex items-center justify-center opacity-10 hover:opacity-20 transition-all"><Plus size={48} /></div>
                            ))}
                         </MasonryGridDesktop>
                      </div>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
        </div>

        <StorefrontFooterDesktop />
      </main>

      <AestheticNotificationToast message={`${aesthetic.toUpperCase()} Preset Verified`} />

      {/* Desktop Settings Modal */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSettingsOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl bg-white/5 border border-white/10 rounded-[60px] p-24 shadow-2xl overflow-hidden">
               <h2 className="text-6xl font-black tracking-tighter mb-12 italic uppercase">Aesthetic Core</h2>
               <div className="grid grid-cols-4 gap-4 mb-16">
                 {AESTHETIC_OPTIONS.map((opt) => (
                   <button key={opt.id} onClick={() => setAesthetic(opt.id)} className={cn("relative p-8 rounded-3xl transition-all text-left bg-white/5 border border-white/5 hover:border-white/20", aesthetic === opt.id ? "ring-4 ring-white/10 opacity-100" : "opacity-40")}>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${opt.color} mb-6`} />
                      <p className="font-bold tracking-tight text-lg mb-1">{opt.label}</p>
                      <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{opt.desc}</p>
                   </button>
                 ))}
               </div>
               <button onClick={() => setSettingsOpen(false)} className="h-20 w-full bg-white text-black font-black uppercase tracking-[0.4em] text-xs active:scale-[0.98] transition-all">Commit Neural Aesthetic</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
