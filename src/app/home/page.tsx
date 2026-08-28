'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
      <div className="max-w-[1600px] mx-auto pb-24">
        {/* Cinematic Perspective Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
           <div className="flex items-baseline gap-3 min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                {view === 'reels' ? 'Artifacts' : gridMode === 'spaces' ? 'Spaces' : 'Items'}
              </h1>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] shrink-0">
                <Sparkles size={10} /> {aesthetic}
              </span>
           </div>

           {/* Premium Tab System */}
           <div className="flex items-center p-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-[var(--elevation-soft)]">
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

        {/* The loader deliberately sits OUTSIDE AnimatePresence. It used to be
            a presence child under mode="wait", and its exit animation never
            completed -- so the incoming grid was never allowed to mount and the
            feed spun forever with data already fetched. */}
        {loading && (
          <div className="flex justify-center py-40">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
          </div>
        )}

        {/* No AnimatePresence / exit animations here. Exit never completed in
            this tree, so any presence-gated swap (loader -> grid, spaces ->
            items) deadlocked and the view never changed. Keyed enter
            animations give the same feel without anything to wait on. */}
        {loading ? null : view === 'reels' ? (
            <motion.div
              key="reels"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center"
            >
              <FeedReels />
            </motion.div>
          ) : (
            <motion.div
              key={`${view}-${gridMode}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mt-4"
            >
               {/* Pin-board density. This was capped at 2 columns with a
                   48px gutter, which reads as a two-up catalogue rather than a
                   board; real masonry needs narrow columns and a tight gutter. */}
               <Masonry
                 breakpointCols={{
                    default: 6,
                    1536: 5,
                    1280: 4,
                    1024: 3,
                    768: 3,
                    640: 2
                 }}
                 className="flex gap-3"
                 columnClassName="flex flex-col"
               >
                  {items.map((item) => (
                     <FeedCard key={item.id} item={item} />
                  ))}
               </Masonry>

               {items.length === 0 && (
                  <div className="py-40 text-center" style={{ color: 'var(--text-muted)' }}>
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-semibold text-xs uppercase tracking-widest italic opacity-40">No manifestations discovered in this node</p>
                  </div>
               )}
            </motion.div>
          )}
      </div>
    </DashboardShell>
  );
}

function TabButton({ isActive, onClick, icon, label }: { isActive: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
          "flex items-center gap-2 px-4 md:px-6 h-11 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative group",
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
      <span className="relative z-10">{label}</span>
    </button>
  );
}
