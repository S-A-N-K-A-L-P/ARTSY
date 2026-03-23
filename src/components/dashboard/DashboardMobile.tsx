'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, PlusSquare, TrendingUp, User, Bell, Settings, LogOut,
  Heart, Grid, ArrowRight, ShieldCheck, Zap, Palette, ChevronRight, UserCircle, Check, Sparkles, Layout, Plus
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
  StatsBarMobile, 
  PagePreviewListMobile, 
  CategoryScrollerMobile, 
  AestheticThemeBadge,
  AestheticNotificationToast
} from '@/components/creator/CreatorMobileUI';

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
  { id: 'fantasy',   label: 'Fantasy',    color: 'from-violet-500 to-indigo-900',desc: 'Mystical & deep' },
  { id: 'luxury',    label: 'Luxury',     color: 'from-amber-300 to-yellow-600', desc: 'Gold & premium' },
];

export default function DashboardMobile() {
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
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      height: 250 + Math.floor(Math.random() * 100),
      image: images[i % images.length],
      title: 'Aesthetic Flow',
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
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-3xl px-6 h-20 flex items-center justify-between" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)', borderBottom: '1px solid var(--border)' }}>
        <h1 className="text-xl font-bold tracking-tighter italic">{NAV_ITEMS.find(n => n.id === activeTab)?.label}</h1>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 opacity-40">
             <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
             <Bell size={20} />
          </button>
          <button onClick={() => setSettingsOpen(true)} className="p-2.5 opacity-40">
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
               <Masonry breakpointCols={1} className="flex -ml-4 w-auto" columnClassName="pl-4 space-y-4">
                  {masonryItems.map((item) => (
                    <AestheticRenderer key={item.id} component="ItemCard" props={item} />
                  ))}
               </Masonry>
            </motion.div>
          )}

          {activeTab === 'manage' && (
            <motion.div key="manage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <CreationConsole />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 pb-20">
              <AestheticRenderer component="ProfileHeader" props={{ user: session?.user }} />
              <StatsBarMobile user={{ ...session?.user, pages: userPages }} />
              <CategoryScrollerMobile cats={['All Spaces', 'Clothing', 'Art', 'Furniture']} selected={selectedCat} onSelect={setSelectedCat} />
              <PagePreviewListMobile pages={userPages} onSelect={handlePageSelect} />
            </motion.div>
          )}

          {['trending', 'search'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] opacity-10 uppercase tracking-[0.5em] font-black text-xs">
              Discovery Mode
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 h-18 backdrop-blur-3xl px-8 flex justify-between items-center z-50 shadow-2xl" style={{ backgroundColor: 'color-mix(in srgb, var(--card) 80%, transparent)', border: '1px solid var(--border)', borderRadius: '2.5rem' }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn("p-2.5 transition-all duration-300", activeTab === item.id ? "scale-110 shadow-lg" : "opacity-30")}
            style={{
              borderRadius: 'var(--radius)',
              backgroundColor: activeTab === item.id ? 'var(--accent)' : 'transparent',
              color: activeTab === item.id ? 'var(--bg)' : 'var(--text)',
            }}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          </button>
        ))}
      </nav>

      {/* Aesthetic Notification */}
      <AestheticNotificationToast message={`${aesthetic.toUpperCase()} Aesthetic Synced`} />

      {/* Settings Panel */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSettingsOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="relative w-full max-w-lg overflow-hidden p-8"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '40px' }}
            >
              <h2 className="text-2xl font-bold tracking-tighter mb-6 italic">Aesthetic Vibe</h2>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {AESTHETIC_OPTIONS.map((opt) => (
                  <button key={opt.id} onClick={() => setAesthetic(opt.id)} className={cn("relative p-4 rounded-2xl transition-all text-left group overflow-hidden border", aesthetic === opt.id ? "ring-2" : "opacity-60")}>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${opt.color} mb-3`} />
                    <p className="text-[10px] font-bold tracking-tight">{opt.label}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setSettingsOpen(false)} className="w-full h-14 font-bold uppercase tracking-widest text-[10px]" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                Apply Vibe
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
