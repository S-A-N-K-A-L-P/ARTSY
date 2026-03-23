'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Loader2, 
  Plus, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Award,
  ArrowUpRight
} from 'lucide-react';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { SidebarFilterPanel, MasonryGridDesktop, StorefrontFooterDesktop } from '@/components/creator/CreatorDesktopUI';

export default function ProfileDesktop({ 
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

  const featuredPage = pages.find(p => p.isFeatured) || pages[0];

  return (
    <div className="space-y-32 pb-40">
      <AestheticRenderer 
        component="ProfileHeader" 
        props={{ user: creator }} 
        fallback={
          <div className="h-64 rounded-[60px] bg-white/5 border border-white/5 flex items-end p-16 mx-12 mt-12 shadow-2xl">
            <h1 className="text-5xl font-bold tracking-tighter italic uppercase">@{creator.username}</h1>
          </div>
        }
      />

      {/* High-Depth Featured Section */}
      {featuredPage && (
        <section className="px-12 md:px-20 max-w-[1700px] mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="relative h-[700px] rounded-[80px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] group"
           >
              <img 
                src={featuredPage.coverImage} 
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[4000ms]" 
                alt="" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent p-24 flex flex-col justify-center">
                 <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8 max-w-2xl">
                    <span className="px-6 py-2 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.4em]">Featured Masterpiece</span>
                    <h2 className="text-8xl font-black tracking-tighter italic uppercase leading-none">{featuredPage.name}</h2>
                    <p className="text-xl text-white/60 italic leading-relaxed">{featuredPage.description}</p>
                    <div className="flex gap-4">
                       <button onClick={() => router.push(`/dashboard/${creator.username}/${featuredPage.slug}`)} className="h-20 px-12 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 hover:scale-105 transition-all">
                          Enter Space <ArrowRight size={18} />
                       </button>
                    </div>
                 </motion.div>
              </div>
              
              {/* Floating Stats Detail */}
              <div className="absolute top-12 right-12 flex flex-col gap-4">
                 {[
                   { icon: TrendingUp, label: 'Views', value: '1.2M' },
                   { icon: ShoppingBag, label: 'Items', value: '48' },
                   { icon: Award, label: 'Aesthetic', value: 'EX' }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.5 + (i * 0.1) }}
                     className="px-8 py-5 rounded-[32px] bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center gap-6 min-w-[200px]"
                   >
                      <stat.icon size={20} className="text-amber-500" />
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{stat.label}</p>
                         <p className="text-xl font-black tracking-tight">{stat.value}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </motion.div>
        </section>
      )}

      <section className="px-12 md:px-20 max-w-[1700px] mx-auto">
        <div className="flex gap-20">
          <SidebarFilterPanel 
            categories={['All Collections', 'Visual Art', 'Clothing', 'Furniture', 'Digital']} 
            selectedCat={selectedCat}
            onSelect={setSelectedCat}
          />

          <div className="flex-1 space-y-16">
            <div className="flex items-center justify-between border-b border-white/5 pb-12">
               <div className="space-y-1">
                  <h2 className="text-5xl font-black tracking-tighter italic uppercase">Archetype Gallery</h2>
                  <p className="text-[10px] uppercase font-bold tracking-[0.4em] opacity-20">Index of Curated Subjectivities</p>
               </div>
               <div className="flex items-center gap-6">
                  <div className="text-right hidden xl:block">
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-20">Exhibition Size</p>
                     <p className="text-2xl font-bold tracking-tighter">{pages.length} SPACES</p>
                  </div>
                  <div className="w-px h-12 bg-white/5 hidden xl:block" />
                  <div className="flex -space-x-4">
                     {pages.slice(0, 5).map((p, i) => (
                       <div key={i} className="w-14 h-14 rounded-full border-4 border-black overflow-hidden bg-white/10 shadow-2xl">
                          <img src={p.coverImage} className="w-full h-full object-cover" alt="" />
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <MasonryGridDesktop>
              {pages.map((page) => (
                <motion.div 
                  key={page._id}
                  whileHover={{ y: -10 }}
                  onClick={() => router.push(`/dashboard/${creator.username}/${page.slug}`)}
                  className="group relative h-[550px] rounded-[72px] overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <img src={page.coverImage} className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-70 transition-all duration-[2000ms]" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-16 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-all duration-700">
                     <div className="flex gap-3 mb-6">
                        <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-3xl text-[9px] font-black uppercase tracking-[0.2em] border border-white/5">{page.type}</span>
                        <span className="px-5 py-2 rounded-full bg-amber-500/20 text-amber-500 backdrop-blur-3xl text-[9px] font-black uppercase tracking-[0.2em] border border-amber-500/20">{page.aesthetic}</span>
                     </div>
                     <h3 className="text-5xl font-black tracking-tighter italic uppercase leading-none">{page.name}</h3>
                     <p className="text-sm text-white/30 mt-8 line-clamp-2 leading-relaxed italic tracking-tight font-medium">{page.description}</p>
                     
                     <div className="mt-12 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all delay-100">
                        <span className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-white">
                           DECODE SPACE <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </span>
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/10">
                           <ArrowUpRight size={18} />
                        </div>
                     </div>
                  </div>
                </motion.div>
              ))}
            </MasonryGridDesktop>
          </div>
        </div>
      </section>

      <StorefrontFooterDesktop />
    </div>
  );
}
