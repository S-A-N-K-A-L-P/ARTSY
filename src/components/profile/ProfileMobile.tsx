'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { StatsBarMobile, CategoryScrollerMobile } from '@/components/creator/CreatorMobileUI';

export default function ProfileMobile({ 
  creator, 
  pages, 
  loading, 
  selectedCat, 
  setSelectedCat 
}: { 
  creator: any; 
  pages: any[]; 
  loading: boolean;
  selectedCat: string;
  setSelectedCat: (cat: string) => void;
}) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin opacity-20" />
      </div>
    );
  }

  if (!creator) return null;

  return (
    <div className="space-y-12 pb-24">
      <AestheticRenderer 
        component="ProfileHeader" 
        props={{ user: creator }} 
        fallback={
          <div className="h-48 rounded-3xl bg-white/5 flex items-end p-8 mx-6 mt-6">
            <h1 className="text-3xl font-bold tracking-tighter">@{creator.username}</h1>
          </div>
        }
      />

      <div className="px-6 space-y-10">
        <StatsBarMobile user={{ ...creator, pages }} />
        
        <CategoryScrollerMobile 
          cats={['All Spaces', 'Clothing', 'Art', 'Furniture', 'Digital']} 
          selected={selectedCat}
          onSelect={setSelectedCat}
        />

        <div className="space-y-4">
           <h2 className="text-2xl font-bold tracking-tighter italic">Collections</h2>
           <div className="grid grid-cols-1 gap-6">
              {pages.map((page) => (
                <CollectionCardMobile key={page._id} page={page} username={creator.username} />
              ))}
              {pages.length === 0 && (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                  <p className="opacity-20 text-xs font-bold uppercase tracking-widest">Empty Space</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}

function CollectionCardMobile({ page, username }: { page: any; username: string }) {
  const router = useRouter();
  return (
    <motion.div 
      onClick={() => router.push(`/dashboard/${username}/${page.slug}`)}
      className="relative h-64 rounded-[32px] overflow-hidden bg-white/5 border border-white/5"
    >
      <img src={page.coverImage} className="w-full h-full object-cover opacity-60" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
        <h3 className="text-2xl font-bold tracking-tighter">{page.name}</h3>
        <p className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">{page.type} • {page.aesthetic}</p>
      </div>
    </motion.div>
  );
}
