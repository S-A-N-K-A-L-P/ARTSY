'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Settings, 
  Grid, 
  Layers, 
  ShoppingBag, 
  ArrowRight,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { cn } from '@/lib/utils';
import { 
  StatsBarMobile, 
  CategoryScrollerMobile 
} from '@/components/creator/CreatorMobileUI';
import { 
  SidebarFilterPanel, 
  MasonryGridDesktop,
  StorefrontFooterDesktop
} from '@/components/creator/CreatorDesktopUI';

export default function CreatorProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { setAesthetic } = useAesthetic();
  const [creator, setCreator] = useState<any>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All Spaces');

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/profile?username=${username}`);
        const data = await res.json();
        if (data.success) {
          setCreator(data.user);
          setPages(data.pages || []);
          
          if (data.user?.aesthetic) {
            setAesthetic(data.user.aesthetic);
          }
        }
      } catch (err) {
        console.error('Fetch Creator Profile Error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchCreatorData();
  }, [username, setAesthetic]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin opacity-20" />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold opacity-20 mb-2">Creator not found</h2>
        <p className="opacity-40 max-w-xs">The aesthetic identity you're looking for doesn't exist yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      <AestheticRenderer 
        component="ProfileHeader" 
        props={{ user: creator }} 
        fallback={
          <div className="h-64 rounded-[40px] bg-white/5 border border-white/5 flex items-end p-10">
            <h1 className="text-4xl font-bold tracking-tighter">@{creator.username}</h1>
          </div>
        }
      />

      <section className="px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Mobile/Tablet Stats */}
          <div className="xl:hidden mb-12">
            <StatsBarMobile user={{ ...creator, pages }} />
          </div>

          <div className="flex flex-col xl:flex-row gap-16">
            {/* Desktop Sidebar */}
            <div className="hidden xl:block">
               <SidebarFilterPanel 
                 categories={['All Spaces', 'Clothing', 'Art', 'Furniture', 'Digital']} 
                 selectedCat={selectedCat}
                 onSelect={setSelectedCat}
               />
            </div>

            <div className="flex-1 space-y-12">
               {/* Tablet/Mobile Scroller */}
               <div className="xl:hidden">
                  <CategoryScrollerMobile 
                    cats={['All Spaces', 'Clothing', 'Art', 'Furniture', 'Digital']} 
                    selected={selectedCat}
                    onSelect={setSelectedCat}
                  />
               </div>

               <div className="flex flex-col">
                 <h2 className="text-4xl font-bold tracking-tighter italic">Curated Collections</h2>
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mt-1">Aesthetic Archetypes</p>
               </div>

               {/* Desktop Masonry Grid */}
               <div className="hidden md:block">
                  <MasonryGridDesktop>
                    {pages.map((page) => (
                      <CollectionCard key={page._id} page={page} username={username} />
                    ))}
                  </MasonryGridDesktop>
               </div>

               {/* Mobile List View fallback or Grid */}
               <div className="md:hidden grid grid-cols-1 gap-8">
                  {pages.map((page) => (
                    <CollectionCard key={page._id} page={page} username={username} />
                  ))}
               </div>

               {pages.length === 0 && (
                 <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[60px]">
                   <p className="opacity-20 font-bold tracking-widest text-xs uppercase italic underline underline-offset-8">No active collections</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>

      <StorefrontFooterDesktop />
    </div>
  );
}

function CollectionCard({ page, username }: { page: any; username: string }) {
  const router = useRouter();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={() => router.push(`/dashboard/${username}/${page.slug}`)}
      className="group relative h-[450px] rounded-[56px] overflow-hidden cursor-pointer bg-white/5 border border-white/5 hover:border-white/20 transition-all shadow-2xl"
    >
      <img src={page.coverImage} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000" alt={page.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] uppercase font-black tracking-widest text-white/80">{page.type}</span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] uppercase font-black tracking-widest text-white/80">{page.aesthetic}</span>
        </div>
        <h3 className="text-4xl font-bold tracking-tighter">{page.name}</h3>
        <p className="text-xs text-white/40 mt-4 line-clamp-2 italic leading-relaxed">{page.description}</p>
        
        <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all delay-100">
          <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
            Enter Space <ArrowRight size={14} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
