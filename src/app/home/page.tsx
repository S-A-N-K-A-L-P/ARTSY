'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, PlayCircle, Sparkles, ShoppingBag } from 'lucide-react';
import FeedReels from '@/components/feed/FeedReels';
import FeedCard from '@/components/feed/FeedCard';
import { cn } from '@/lib/utils';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAesthetic } from '@/aesthetics/AestheticProvider';

export default function HomePage() {
  const { aesthetic } = useAesthetic();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'reels' | 'grid'>('reels');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/items');
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data.map((item: any) => ({
             id: item._id,
             title: item.title,
             creator: {
                username: item.ownerId?.username || 'unknown',
                avatar: item.ownerId?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.ownerId?.username || 'unknown'}`
             },
             pageSlug: item.pageId?.slug,
             image: item.images?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
             price: item.price || 0,
             aesthetic: item.aesthetic || 'minimal'
          })));
        }
      } catch (err) {
        console.error('Feed Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto">
        {/* Perspective Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
           <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[9px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={10} /> {aesthetic} Perspective
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>The Daily Feed</h1>
              <p className="mt-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">Discovery through aesthetic convergence</p>
           </div>

           <div className="flex items-center p-1.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] self-start md:self-auto">
              <button 
                onClick={() => setView('reels')}
                className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    view === 'reels' ? "bg-[var(--accent)] text-[var(--bg-primary)] shadow-lg" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                <PlayCircle size={14} /> Reels
              </button>
              <button 
                onClick={() => setView('grid')}
                className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    view === 'grid' ? "bg-[var(--accent)] text-[var(--bg-primary)] shadow-lg" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                <LayoutGrid size={14} /> Grid
              </button>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'reels' ? (
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
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               {items.map((item) => (
                  <FeedCard key={item.id} item={item} />
               ))}

               {items.length === 0 && !loading && (
                  <div className="col-span-full py-20 text-center opacity-30">
                    <ShoppingBag size={48} className="mx-auto mb-4" />
                    <p className="font-bold italic">Artifacts are being generated in the void...</p>
                  </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
}
