'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, PlayCircle, Sparkles, ShoppingBag, Loader2, Layers, Package } from 'lucide-react';
import Masonry from 'react-masonry-css';
import FeedReels from '@/components/feed/FeedReels';
import FeedCard from '@/components/feed/FeedCard';
import { cn } from '@/lib/utils';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAesthetic } from '@/aesthetics/AestheticProvider';

export default function HomePage() {
  const { aesthetic } = useAesthetic();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'reels' | 'grid'>('grid');
  const [gridMode, setGridMode] = useState<'spaces' | 'items'>('spaces');

  const fetchDiscovery = useCallback(async (mode: 'spaces' | 'items') => {
    setLoading(true);
    try {
      if (mode === 'spaces') {
        const res = await fetch('/api/discovery/pages');
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data.map((page: any) => ({
             id: page._id,
             title: page.name,
             type: 'page',
             creator: {
                username: page.ownerId?.username || 'unknown',
                avatar: page.ownerId?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${page.ownerId?.username || 'unknown'}`
             },
             pageSlug: page.slug,
             image: page.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
             aesthetic: page.aesthetic?.theme || page.aesthetic || 'minimal'
          })));
        }
      } else {
        const res = await fetch('/api/items');
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data.map((item: any) => ({
             id: item._id,
             title: item.title,
             description: item.description,
             type: 'item',
             creator: {
                username: item.ownerId?.username || 'unknown',
                avatar: item.ownerId?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.ownerId?.username || 'unknown'}`
             },
             image: item.images?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
             price: item.price,
             aesthetic: item.aesthetic || item.pageId?.aesthetic || 'minimal',
             pageSlug: item.pageId?.slug
          })));
        }
      }
    } catch (err) {
      console.error('Discovery Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (view === 'grid') {
      fetchDiscovery(gridMode);
    }
  }, [view, gridMode, fetchDiscovery]);

  const handleTabChange = (newView: 'reels' | 'grid', mode?: 'spaces' | 'items') => {
    setView(newView);
    if (mode) setGridMode(mode);
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto pb-40">
        {/* Cinematic Perspective Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
           <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[9px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={10} /> {aesthetic} Perspective
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none" style={{ color: 'var(--text-primary)' }}>
                {view === 'reels' ? 'Artifacts' : gridMode === 'spaces' ? 'Spaces' : 'Items'}
              </h1>
              <p className="mt-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] opacity-40">Discovery through aesthetic convergence</p>
           </div>

           {/* Premium Tab System */}
           <div className="flex items-center p-1.5 rounded-[28px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] self-start md:self-auto shadow-2xl backdrop-blur-3xl">
              <TabButton 
                isActive={view === 'reels'} 
                onClick={() => handleTabChange('reels')}
                icon={<PlayCircle size={14} />}
                label="Artifacts"
              />
              <TabButton 
                isActive={view === 'grid' && gridMode === 'spaces'} 
                onClick={() => handleTabChange('grid', 'spaces')}
                icon={<Layers size={14} />}
                label="Spaces"
              />
              <TabButton 
                isActive={view === 'grid' && gridMode === 'items'} 
                onClick={() => handleTabChange('grid', 'items')}
                icon={<Package size={14} />}
                label="Items"
              />
           </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
               key="loader"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex justify-center py-40"
            >
               <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
            </motion.div>
          ) : view === 'reels' ? (
            <motion.div
              key="reels"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex justify-center"
            >
              <FeedReels />
            </motion.div>
          ) : (
            <motion.div
              key={`${view}-${gridMode}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mt-4"
            >
               <Masonry
                 breakpointCols={{
                    default: 2,
                    1100: 2,
                    700: 2,
                    500: 1
                 }}
                 className="flex gap-4 md:gap-12"
                 columnClassName="flex flex-col gap-4 md:gap-12"
               >
                  {items.map((item) => (
                     <FeedCard key={item.id} item={item} />
                  ))}
               </Masonry>

               {items.length === 0 && (
                  <div className="py-40 text-center text-neutral-300">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-semibold text-xs uppercase tracking-widest italic opacity-40">No manifestations discovered in this node</p>
                  </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
}

function TabButton({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative group",
          isActive ? "text-[var(--bg-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      )}
    >
      {isActive && (
        <motion.div 
          layoutId="activeTab" 
          className="absolute inset-0 bg-[var(--accent)] rounded-2xl shadow-xl shadow-[var(--accent-soft)]" 
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10 hidden md:block">{label}</span>
      
      {/* Tooltip for mobile */}
      {!isActive && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-white text-[9px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:hidden uppercase tracking-widest whitespace-nowrap">
           {label}
        </span>
      )}
    </button>
  );
}
