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
  Loader2,
  Maximize2
} from 'lucide-react';
import Masonry from 'react-masonry-css';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { cn } from '@/lib/utils';
import { 
  SidebarFilterPanel, 
  MasonryGridDesktop,
  StorefrontFooterDesktop,
  BreadcrumbNavigation,
  HoverPreviewCard
} from '@/components/creator/CreatorDesktopUI';
import { CategoryScrollerMobile } from '@/components/creator/CreatorMobileUI';

export default function CollectionViewPage() {
  const params = useParams();
  const router = useRouter();
  const { username, slug } = params as { username: string; slug: string };
  const { setAesthetic, aesthetic } = useAesthetic();
  
  const [page, setPage] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All Items');

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/page?username=${username}&slug=${slug}`);
        const data = await res.json();
        if (data.success) {
          setPage(data.page);
          setItems(data.items || []);
          
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

  if (!page) return (
     <div className="min-h-screen flex items-center justify-center">
        <p className="opacity-20 font-bold tracking-widest uppercase">Space not found</p>
     </div>
  );

  const masonryBreakpoints = { default: 3, 1100: 2, 700: 2, 500: 1 };

  return (
    <div className="min-h-screen transition-all duration-700" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <BreadcrumbNavigation paths={[
           { label: `@${username}`, href: `/dashboard/${username}` },
           { label: page.name }
        ]} />
      </div>

      {/* Mobile/Tablet Header */}
      <header className="md:hidden px-6 h-20 flex items-center justify-between sticky top-0 backdrop-blur-3xl z-40 border-b border-white/5">
        <button onClick={() => router.push(`/dashboard/${username}`)} className="p-2 opacity-40">
           <ArrowLeft size={20} />
        </button>
        <h1 className="text-sm font-bold tracking-tight italic">{page.name}</h1>
        <button className="p-2 opacity-40">
           <ShoppingBag size={20} />
        </button>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-10 pb-40">
         {/* Hero Section */}
         <div className="py-20 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
               <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 italic">{page.name}</h2>
               <p className="text-lg md:text-xl font-medium opacity-40 leading-relaxed max-w-2xl">{page.description}</p>
            </motion.div>
         </div>

         <div className="flex flex-col xl:flex-row gap-16">
            {/* Desktop Sidebars */}
            <div className="hidden xl:block">
               <SidebarFilterPanel 
                 categories={['All Pieces', 'Clothing', 'Art', 'Furniture', 'Digital']} 
                 selectedCat={selectedCat} 
                 onSelect={setSelectedCat} 
               />
            </div>

            <div className="flex-1 space-y-12">
               {/* Mobile Category Scroller */}
               <div className="xl:hidden">
                  <CategoryScrollerMobile 
                    cats={['All Pieces', 'Clothing', 'Art', 'Furniture', 'Digital']} 
                    selected={selectedCat} 
                    onSelect={setSelectedCat} 
                  />
               </div>

               {/* Grid Content */}
               <div className="hidden md:block">
                  <MasonryGridDesktop>
                     {items.map((item) => (
                        <HoverPreviewCard 
                          key={item._id} 
                          item={item} 
                          onClick={() => router.push(`/dashboard/${username}/${slug}/${item._id}`)} 
                        />
                     ))}
                     {items.length === 0 && (
                        <div className="col-span-full py-40 border-2 border-dashed border-white/5 rounded-[60px] flex flex-col items-center justify-center text-center">
                           <p className="opacity-20 font-bold uppercase tracking-[0.5em] text-xs underline underline-offset-8">No pieces found in this vibe</p>
                        </div>
                     )}
                  </MasonryGridDesktop>
               </div>

               {/* Mobile/Layout View fallback */}
               <div className="md:hidden space-y-8">
                  <Masonry breakpointCols={masonryBreakpoints} className="flex -ml-6 w-auto" columnClassName="pl-6 space-y-6">
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
         </div>
      </main>

      <StorefrontFooterDesktop />
    </div>
  );
}
