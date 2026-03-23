'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, PlusSquare, TrendingUp, User, Bell, Settings, LogOut,
  Heart, Grid, ArrowRight, ShieldCheck, Zap, Palette, ChevronRight, UserCircle, Check, Sparkles, Layout
} from 'lucide-react';
import Masonry from 'react-masonry-css';
import { cn } from '@/lib/utils';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { ThemeName } from '@/lib/theme/themes';
import CreationConsole from '@/components/creator/CreationConsole';
import { useSession } from 'next-auth/react';

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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { aesthetic, setAesthetic } = useAesthetic();

  const { data: session } = useSession();

  useEffect(() => { setMounted(true); }, []);

  const masonryItems = useMemo(() => {
    const images = [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518621736915-f3b1c41136f6?q=80&w=500&auto=format&fit=crop',
    ];
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      height: 280 + Math.floor(Math.random() * 180),
      image: images[i % images.length],
      title: ['Ethereal Flow', 'Cyber Pulse', 'Silent Peak', 'Organic Chaos', 'Neon Dreams', 'Void Bloom', 'Digital Glitch', 'Abstract Harmony'][i % 8],
      author: ['Nova', 'Koda', 'Soma', 'Luna', 'Vector', 'Echo', 'Aura', 'Pixel'][i % 8]
    }));
  }, []);

  if (!mounted) return null;

  const masonryBreakpoints = { default: 3, 1100: 2, 700: 2, 500: 1 };

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 p-8 z-50" style={{ backgroundColor: 'var(--bg)', borderRight: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
            <span className="font-bold italic" style={{ color: 'var(--accent)' }}>A</span>
          </div>
          <span className="font-bold tracking-tight text-xl">Artsy</span>
        </div>
        <nav className="space-y-1.5 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 transition-all duration-300 font-bold group text-sm",
                activeTab === item.id ? "shadow-lg" : "opacity-40 hover:opacity-100"
              )}
              style={{
                borderRadius: 'var(--radius)',
                backgroundColor: activeTab === item.id ? 'var(--accent)' : 'transparent',
                color: activeTab === item.id ? 'var(--bg)' : 'var(--text)',
              }}
            >
              <item.icon size={22} />
              <span className="tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="pt-8 space-y-1" style={{ borderTop: '1px solid var(--border)' }}>
          <button onClick={() => setSettingsOpen(true)} className="w-full flex items-center gap-4 px-4 py-3 opacity-40 hover:opacity-100 transition-all font-bold text-sm">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-red-400/60 hover:text-red-400 transition-all font-bold text-sm">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="md:ml-72 min-h-screen pb-24 md:pb-0">
        <header className="sticky top-0 z-40 backdrop-blur-3xl px-6 md:px-10 h-20 flex items-center justify-between" style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)', borderBottom: '1px solid var(--border)' }}>
          <h1 className="text-2xl font-bold tracking-tighter">{NAV_ITEMS.find(n => n.id === activeTab)?.label}</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 opacity-40 hover:opacity-100 transition-colors" style={{ borderRadius: 'var(--radius)' }}>
              <Bell size={20} />
            </button>
            <button onClick={() => setSettingsOpen(true)} className="md:hidden p-2.5 opacity-40">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="px-6 md:px-10 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {/* Feed Grid — uses AestheticRenderer */}
                <Masonry breakpointCols={masonryBreakpoints} className="flex -ml-6 w-auto" columnClassName="pl-6 space-y-6">
                  {masonryItems.map((item) => (
                    <AestheticRenderer
                      key={item.id}
                      component="ItemCard"
                      props={item}
                      fallback={
                        <div className="rounded-2xl overflow-hidden" style={{ height: item.height, backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                          <img src={item.image} className="w-full h-full object-cover opacity-50" alt="" />
                        </div>
                      }
                    />
                  ))}
                </Masonry>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AestheticRenderer component="ProfileHeader" fallback={<div className="h-64 rounded-3xl" style={{ backgroundColor: 'var(--card)' }} />} />
              </motion.div>
            )}

            {activeTab !== 'home' && activeTab !== 'profile' && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] opacity-10 uppercase tracking-[0.4em] font-bold text-xs">
                Expanding Collection...
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Tab Bar */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-18 backdrop-blur-3xl px-8 flex justify-between items-center z-50 shadow-2xl" style={{ backgroundColor: 'color-mix(in srgb, var(--card) 80%, transparent)', border: '1px solid var(--border)', borderRadius: '2.5rem' }}>
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

      {/* Settings Bottom Sheet with Aesthetic Picker */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSettingsOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative w-full max-w-lg overflow-hidden p-8"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '40px' }}
            >
              <div className="w-12 h-1.5 rounded-full mx-auto mb-8" style={{ backgroundColor: 'var(--border)' }} />

              <h2 className="text-2xl font-bold tracking-tighter mb-6">Choose Aesthetic</h2>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {AESTHETIC_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAesthetic(opt.id)}
                    className={cn(
                      "relative p-4 rounded-2xl transition-all text-left group overflow-hidden",
                      aesthetic === opt.id ? "ring-2 shadow-lg" : "opacity-60 hover:opacity-100"
                    )}
                    style={{
                      backgroundColor: 'var(--bg)',
                      borderColor: aesthetic === opt.id ? 'var(--accent)' : 'var(--border)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${opt.color} mb-3 shadow-lg`} />
                    <p className="text-xs font-bold tracking-tight">{opt.label}</p>
                    <p className="text-[9px] opacity-40 mt-0.5">{opt.desc}</p>
                    {aesthetic === opt.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}>
                        <Check size={12} strokeWidth={3} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSettingsOpen(false)}
                className="w-full h-14 font-bold transition-transform active:scale-[0.98]"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', borderRadius: 'var(--radius)' }}
              >
                Apply & Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}