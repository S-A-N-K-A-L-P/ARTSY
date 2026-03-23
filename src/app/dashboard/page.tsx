'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';
import Masonry from 'react-masonry-css';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const MOCK_ARTWORKS = [
  { id: 1, title: 'Ethereal Flow', artist: 'Nova', likes: '2.4k', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'Cyber Pulse', artist: 'Koda', likes: '1.2k', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'Minimalist Void', artist: 'Soma', likes: '890', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'Organic Chaos', artist: 'Luna', likes: '3.1k', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400&auto=format&fit=crop' },
  { id: 5, title: 'Neon Dreams', artist: 'Vector', likes: '5.6k', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop' },
  { id: 6, title: 'Silent Peak', artist: 'Echo', likes: '1.5k', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop' },
];

const MOCK_TRENDING_ARTISTS = [
  { id: 1, name: 'Nova', followers: '1.2M', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Koda', followers: '800K', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
  { id: 3, name: 'Luna', followers: '1.5M', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=100&auto=format&fit=crop' },
  { id: 4, name: 'Vector', followers: '950K', avatar: 'https://images.unsplash.com/photo-1507003211169-e695c6bdd610?q=80&w=100&auto=format&fit=crop' },
];

const MOCK_RECENT_POSTS = [
  { id: 1, user: 'ArtLover22', action: 'liked', artworkTitle: 'Ethereal Flow', time: '2h ago' },
  { id: 2, user: 'CreativeMind', action: 'commented on', artworkTitle: 'Cyber Pulse', time: '4h ago' },
  { id: 3, user: 'GalleryGuru', action: 'shared', artworkTitle: 'Minimalist Void', time: '6h ago' },
  { id: 4, user: 'PixelPioneer', action: 'followed', artworkTitle: 'Nova', time: '8h ago' },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'create', label: 'Create', icon: PlusSquare },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
            <span className="font-bold italic">A</span>
          </div>
          <span className="font-bold tracking-tight text-xl">Artsy</span>
        </div>

        <nav className="space-y-2 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium group",
                activeTab === item.id 
                  ? "bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={22} className={cn("transition-transform", activeTab === item.id ? "" : "group-hover:scale-110")} />
              <span className="tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-white/40 hover:text-white transition-all font-medium">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-red-400/60 hover:text-red-400 transition-all font-medium">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-72 min-h-screen pb-24 md:pb-0">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">Collector Access</p>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/5">
              <Search size={16} className="text-white/20 mr-2" />
              <input 
                placeholder="Search collection..." 
                className="bg-transparent border-none focus:outline-none text-sm placeholder:text-white/20 w-48 font-medium"
              />
            </div>
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#050505]" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-white/10 shadow-lg cursor-pointer hover:scale-105 transition-transform" />
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-12">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-16"
              >
                {/* Hero Section */}
                <section className="relative h-80 rounded-[40px] overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    alt="Hero"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent flex flex-col justify-center p-12">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-[0.4em] mb-4">Curated Highlight</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-lg leading-tight mb-6">
                      Discover the <br />
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Neo-Brutalist</span> Era.
                    </h2>
                    <button className="w-fit px-8 py-3 bg-white text-black font-bold rounded-2xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
                      Explore Series <ArrowRight size={18} />
                    </button>
                  </div>
                </section>

                {/* Curation Grid */}
                <section>
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-bold tracking-tight">Handpicked for You</h2>
                    <div className="flex items-center gap-2">
                       <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                        <Grid size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <Masonry
                    breakpointCols={masonryBreakpoints}
                    className="flex -ml-6 w-auto"
                    columnClassName="pl-6 bg-clip-padding"
                  >
                    {MOCK_ARTWORKS.map((art) => (
                      <motion.div 
                        key={art.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group cursor-pointer mb-8 relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
                      >
                        <div className="aspect-[4/5] overflow-hidden">
                          <img 
                            src={art.image} 
                            alt={art.title}
                            className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                        <div className="p-6 flex items-center justify-between bg-gradient-to-t from-black via-black/60 to-transparent absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div>
                            <h3 className="font-bold text-lg">{art.title}</h3>
                            <p className="text-white/40 text-sm font-medium">@{art.artist}</p>
                          </div>
                          <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                            <Heart size={18} strokeWidth={3} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </Masonry>
                </section>

                {/* Trending Artists */}
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight">Rising Visionaries</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {MOCK_TRENDING_ARTISTS.map((artist) => (
                      <div key={artist.id} className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 text-center hover:bg-white/[0.04] transition-all group cursor-pointer">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full p-1 border border-white/10 group-hover:border-white/30 transition-all">
                          <img src={artist.avatar} className="w-full h-full object-cover rounded-full" alt={artist.name} />
                        </div>
                        <h3 className="font-bold tracking-tight uppercase text-xs mb-1">{artist.name}</h3>
                        <p className="text-white/20 text-[10px] uppercase font-bold tracking-[0.2em]">{artist.followers} fans</p>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto space-y-12"
              >
                <div className="bg-white/[0.02] border border-white/5 rounded-[48px] p-12 text-center">
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full p-1.5 border-2 border-dashed border-white/10 animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-white/20 flex items-center justify-center">
                      <User size={48} className="text-black" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold tracking-tighter mb-2">Anonymous Curator</h2>
                  <p className="text-white/40 font-medium mb-8">Joined March 2026 • Verified Collector</p>
                  
                  <div className="grid grid-cols-3 gap-8 max-w-md mx-auto py-8 border-y border-white/5">
                    <div>
                      <p className="text-2xl font-bold italic tracking-tighter">12</p>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">Saved</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold italic tracking-tighter">1.2k</p>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">Followers</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold italic tracking-tighter">89</p>
                      <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">Collection</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Tab Bar (iOS Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-2xl border-t border-white/5 px-6 py-4 pb-8 flex justify-between items-center z-50">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              activeTab === item.id ? "text-white" : "text-white/30"
            )}
          >
            <div className={cn(
              "p-2.5 rounded-2xl transition-all",
              activeTab === item.id ? "bg-white text-black shadow-xl" : "hover:bg-white/5"
            )}>
              <item.icon size={22} strokeWidth={activeTab === item.id ? 3 : 2} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}