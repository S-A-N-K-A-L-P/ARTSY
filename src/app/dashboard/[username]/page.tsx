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

export default function CreatorProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { setAesthetic } = useAesthetic();
  const [creator, setCreator] = useState<any>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be a public endpoint
        const res = await fetch(`/api/user/profile?username=${username}`);
        const data = await res.json();
        if (data.success) {
          setCreator(data.user);
          setPages(data.pages || []);
          
          // Apply creator's primary aesthetic if available
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
      {/* Dynamic Profile Header from Aesthetic Engine */}
      <AestheticRenderer 
        component="ProfileHeader" 
        props={{ user: creator }} 
        fallback={
          <div className="h-64 rounded-[40px] bg-white/5 border border-white/5 flex items-end p-10">
            <h1 className="text-4xl font-bold tracking-tighter">@{creator.username}</h1>
          </div>
        }
      />

      {/* Pages/Collections Section */}
      <section className="px-6 md:px-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight">Collections</h2>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/20 mt-1">Curated Spaces</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pages.length > 0 ? (
            pages.map((page) => (
              <CollectionCard key={page._id} page={page} username={username} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
              <p className="opacity-20 font-bold tracking-widest text-xs uppercase">No active collections</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CollectionCard({ page, username }: { page: any; username: string }) {
  const router = useRouter();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={() => router.push(`/dashboard/${username}/${page.slug}`)}
      className="group relative h-80 rounded-[40px] overflow-hidden cursor-pointer bg-white/5 border border-white/5 hover:border-white/10 transition-all"
    >
      <img src={page.coverImage} className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" alt={page.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
        <div className="flex items-center gap-3 mb-2">
            {page.type === 'store' && <ShoppingBag size={14} className="text-white/40" />}
            {page.type === 'portfolio' && <Layers size={14} className="text-white/40" />}
            {page.type === 'gallery' && <Grid size={14} className="text-white/40" />}
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">{page.type}</span>
        </div>
        <h3 className="text-3xl font-bold tracking-tighter">{page.name}</h3>
        <p className="text-xs text-white/40 mt-2 line-clamp-1">{page.description}</p>
        
        <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            Explore <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
