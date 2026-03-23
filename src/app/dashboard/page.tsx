'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Search, 
  PlusSquare, 
  TrendingUp, 
  User, 
  Bell, 
  Settings, 
  LogOut,
  Heart,
  Grid,
  ArrowRight,
  ShieldCheck,
  Zap,
  Palette,
  Layers,
  Sparkles,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import Masonry from 'react-masonry-css';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const NAV_ITEMS = [
  { id: 'home', label: 'For You', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'create', label: 'Create', icon: PlusSquare },
  { id: 'profile', label: 'Profile', icon: User },
];

const MOCK_TRENDING_ARTISTS = [
  { id: 1, name: 'Nova', followers: '1.2M', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Koda', followers: '800K', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
  { id: 3, name: 'Luna', followers: '1.5M', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=100&auto=format&fit=crop' },
  { id: 4, name: 'Vector', followers: '950K', avatar: 'https://images.unsplash.com/photo-1507003211169-e695c6bdd610?q=80&w=100&auto=format&fit=crop' },
];

// --- MAIN DASHBOARD ---
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [mounted, setMounted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      'https://images.unsplash.com/photo-1506748687220-b119d0d13e2a?q=80&w=500&auto=format&fit=crop',
    ];

    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      height: 250 + Math.floor(Math.random() * 200),
      image: images[i % images.length],
      title: `Art Piece ${i + 1}`,
      author: ['Nova', 'Koda', 'Soma', 'Luna', 'Vector', 'Echo'][i % 6]
    }));
  }, []);

  if (!mounted) return null;

  const masonryBreakpoints = {
    default: 3,
    1100: 2,
    700: 2,
    500: 1
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-[#050505] border-r border-white/5 p-8 z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
            <span className="font-bold italic">A</span>
          </div>
          <span className="font-bold tracking-tight text-xl">Artsy</span>
        </div>

        <nav className="space-y-1.5 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold group",
                activeTab === item.id 
                  ? "bg-white text-black shadow-xl" 
                  : "text-white/30 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={22} className="transition-transform group-hover:scale-110" />
              <span className="tracking-tight text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-1">
          <button 
            onClick={() => setSettingsOpen(true)}
            className="w-full flex items-center gap-4 px-4 py-3 text-white/30 hover:text-white transition-all font-bold text-sm"
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-white/10 hover:text-red-400 transition-all font-bold text-sm">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-72 min-h-screen pb-24 md:pb-0">
        {/* Top bar (Desktop-only header or persistent) */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-3xl border-b border-white/5 px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tighter">
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-white/5 text-white/40 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-white rounded-full border-2 border-[#050505]" />
            </button>
            <button onClick={() => setSettingsOpen(true)} className="md:hidden p-2.5 rounded-full bg-white/5 text-white/40">
              <Settings size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors overflow-hidden">
               <UserCircle size={24} className="text-white/40" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="px-6 md:px-10 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                {/* Hero Section */}
                <section className="h-64 rounded-[40px] overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent flex flex-col justify-center p-10">
                    <h2 className="text-4xl font-bold tracking-tighter max-w-sm leading-[1.1] mb-4">
                      Curated For <br />
                      <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">Your Aesthetic.</span>
                    </h2>
                  </div>
                </section>

                {/* Feed Grid */}
                <div>
                  <Masonry
                    breakpointCols={masonryBreakpoints}
                    className="flex -ml-6 w-auto"
                    columnClassName="pl-6 space-y-6"
                  >
                    {masonryItems.map((item) => (
                      <motion.div 
                        key={item.id}
                        whileHover={{ scale: 0.985 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative rounded-[32px] overflow-hidden bg-white/[0.02] border border-white/5 cursor-pointer shadow-2xl transition-all"
                        style={{ height: item.height }}
                      >
                        <img src={item.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={item.title} />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                           <h3 className="font-bold text-sm tracking-tight">{item.title}</h3>
                           <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">@{item.author}</p>
                        </div>
                      </motion.div>
                    ))}
                  </Masonry>
                </div>
              </motion.div>
            )}

            {activeTab !== 'home' && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-white/10 uppercase tracking-[0.4em] font-bold text-xs">
                Expanding Collection...
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Tab Bar (iOS Style) */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-18 bg-white/10 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] px-8 flex justify-between items-center z-50 shadow-2xl shadow-black/50">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "p-2.5 rounded-2xl transition-all duration-300",
              activeTab === item.id ? "bg-white text-black scale-110 shadow-lg shadow-white/20" : "text-white/30"
            )}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          </button>
        ))}
      </nav>

      {/* Settings Bottom Sheet (iOS Friendly) */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSettingsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden p-8"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter mb-6">Preferences</h2>
                  <div className="space-y-1">
                    <SheetItem icon={<User size={18} />} label="Account Details" />
                    <SheetItem icon={<Bell size={18} />} label="Notification Center" />
                    <SheetItem icon={<ShieldCheck size={18} />} label="Security & Privacy" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Aesthetics</h3>
                  <div className="space-y-1">
                    <SheetItem icon={<Palette size={18} />} label="Interface Theme" trailing="Soft" />
                    <SheetItem icon={<Zap size={18} />} label="Motion Settings" trailing="Fluid" />
                  </div>
                </div>

                <button 
                  onClick={() => setSettingsOpen(false)}
                  className="w-full h-14 bg-white text-black font-bold rounded-2xl active:scale-[0.98] transition-transform"
                >
                  Save & Return
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SheetItem({ icon, label, trailing }: { icon: React.ReactNode, label: string, trailing?: string }) {
  return (
    <div className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 cursor-pointer group transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-white/20 group-hover:text-white transition-colors">{icon}</div>
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {trailing && <span className="text-xs font-bold text-white/20">{trailing}</span>}
        <ChevronRight size={16} className="text-white/10" />
      </div>
    </div>
  );
}