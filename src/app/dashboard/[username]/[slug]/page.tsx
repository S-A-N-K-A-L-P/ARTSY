'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Filter,
  Grid,
  List,
  ChevronRight,
  ShoppingBag,
  Loader2
} from 'lucide-react';
import Masonry from 'react-masonry-css';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { cn } from '@/lib/utils';

export default function CollectionViewPage() {
  const params = useParams();
  const router = useRouter();
  const { username, slug } = params as { username: string; slug: string };
  const { setAesthetic } = useAesthetic();
  
  const [page, setPage] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/page?username=${username}&slug=${slug}`);
        const data = await res.json();
        if (data.success) {
          setPage(data.page);
          setItems(data.items || []);
          
          // Override aesthetic if page has its own
          if (data.page?.aesthetic) {
            setAesthetic(data.page.aesthetic);
          }
        }
      } catch (err) {
        console.error('Fetch Page Error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (username && slug) fetchPageData();
  }, [username, slug, setAesthetic]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin opacity-20" />
      </div>
    );
  }

  if (!page) return <div>Page not found</div>;

  const masonryBreakpoints = { default: 3, 1100: 2, 700: 2, 500: 1 };

  return (
    <div className="pb-20">
      {/* Header / Breadcrumbs */}
      <header className="px-6 md:px-10 h-24 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-3xl z-40 border-b border-white/5">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push(`/dashboard/${username}`)}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2 text-sm">
             <span className="opacity-20 font-bold uppercase tracking-widest text-[10px]">@{username}</span>
             <ChevronRight size={14} className="opacity-10" />
             <span className="font-bold tracking-tight">{page.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl bg-white/5 text-white/20 hover:text-white border border-white/5 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </header>

      {/* Hero / Description */}
      <div className="px-6 md:px-10 py-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{page.name}</h2>
        <p className="text-white/40 max-w-2xl font-medium leading-relaxed">{page.description}</p>
      </div>

      {/* Grid Content */}
      <div className="px-6 md:px-10">
        <Masonry
            breakpointCols={masonryBreakpoints}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 space-y-6"
        >
            {items.map((item) => (
                <AestheticRenderer 
                   key={item._id}
                   component="ItemCard"
                   props={{ 
                     ...item,
                     onClick: () => router.push(`/dashboard/${username}/${slug}/${item._id}`) 
                   }}
                   fallback={<div className="h-64 rounded-3xl bg-white/5" />}
                />
            ))}
        </Masonry>
      </div>
    </div>
  );
}
