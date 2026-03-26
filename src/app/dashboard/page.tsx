'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Plus, 
  Layout, 
  ArrowRight, 
  Settings, 
  Sparkles,
  Loader2,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import Masonry from 'react-masonry-css';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      if (!session?.user) return;
      try {
        setLoading(true);
        const res = await fetch('/api/creator/page');
        const data = await res.json();
        if (data.success) {
          setPages(data.pages || []);
        }
      } catch (err) {
        console.error('Fetch Pages Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, [session]);

  return (
    <div className="pb-24 md:pb-10 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-neutral-100 pb-10">
         <div className="flex items-center gap-4">
            {session?.user?.image && (
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 shrink-0 shadow-sm">
                  <img src={session.user.image} className="w-full h-full object-cover" alt={session.user.name || "User"} />
              </div>
            )}
            <div>
               <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Creator Studio</h1>
               <p className="mt-1 text-xs text-neutral-400 font-medium uppercase tracking-widest">
                 Management & Insights
               </p>
            </div>
         </div>
         <Link 
            href="/dashboard/create" 
            className="h-12 px-6 rounded-xl bg-neutral-900 text-white text-sm font-semibold flex items-center gap-2 hover:bg-neutral-800 transition-all active:scale-[0.98]"
         >
            <Plus size={18} /> New Space
         </Link>
      </div>

      {/* Simplified Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 transition-all group">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Total Spaces</p>
          <div className="flex items-baseline gap-2">
             <span className="text-4xl font-bold text-neutral-900">{pages.length}</span>
             <span className="text-xs font-medium text-neutral-400">deployed</span>
          </div>
        </div>
        
        <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 transition-all group">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Platform Rank</p>
          <div className="flex items-baseline gap-2">
             <span className="text-4xl font-bold text-neutral-900">Elite</span>
             <span className="text-xs font-medium text-neutral-400">verified</span>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-900 transition-all group shadow-xl shadow-neutral-100">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Discovery Reach</p>
          <div className="flex items-baseline gap-2">
             <span className="text-4xl font-bold text-white">4.2k</span>
             <span className="text-xs font-medium text-neutral-400">impressions</span>
          </div>
        </div>
      </div>

      {/* Pages Section */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900">Manifestations</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-200" />
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-[40px] border border-dashed border-neutral-200 p-24 text-center flex flex-col items-center gap-6 bg-neutral-50/50">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white border border-neutral-100 shadow-sm">
            <Layout size={32} className="text-neutral-300" />
          </div>
          <div className="max-w-xs">
            <p className="text-lg font-bold text-neutral-900 mb-1">Begin Your Manifestation</p>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium">Create your first spatial record to start sharing your perspective with the collective.</p>
          </div>
          <Link
            href="/dashboard/create"
            className="h-12 px-8 rounded-xl font-bold text-sm bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-all"
          >
            Deploy First Space
          </Link>
        </div>
      ) : (
        <Masonry
          breakpointCols={{
            default: 2,
            700: 2,
            500: 1
          }}
          className="flex gap-6 md:gap-10"
          columnClassName="flex flex-col gap-6 md:gap-10"
        >
          {pages.map((page: any) => (
            <CollectionCard key={page._id} page={page} />
          ))}
        </Masonry>
      )}
    </div>
  );
}

function CollectionCard({ page }: { page: any }) {
  const router = useRouter();

  const height = React.useMemo(() => {
    const variants = [240, 280, 340, 300];
    const seed = page._id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return variants[seed % variants.length];
  }, [page._id]);

  return (
    <div 
      onClick={() => router.push(`/dashboard/page/${page._id}`)}
      className="group cursor-pointer mb-8"
    >
      <div 
        className="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-50 shadow-sm transition-all duration-500"
        style={{ height: `${height}px` }}
      >
        <img 
          src={page.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt={page.name} 
        />
      </div>
      
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900 line-clamp-1">{page.name}</h3>
            <p className="text-xs text-neutral-400 mt-1 font-medium uppercase tracking-widest">
              {page.aesthetic?.theme || page.aesthetic || 'minimal'} • {page.type || 'gallery'}
            </p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/settings/${page._id}`); }}
            className="p-2 text-neutral-300 hover:text-neutral-900 transition-colors"
          >
             <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}