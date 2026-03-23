'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  ShoppingBag,
  Share2,
  Heart,
  Loader2,
  ChevronRight,
  Tag,
  Maximize2,
  Lock,
  Zap,
  Shield
} from 'lucide-react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import { cn } from '@/lib/utils';
import { 
  BreadcrumbNavigation, 
  AttributeDataGrid, 
  ItemDetailSidebarDesktop,
  StorefrontFooterDesktop
} from '@/components/creator/CreatorDesktopUI';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { username, slug, itemId } = params as { username: string; slug: string; itemId: string };
  const { setAesthetic, aesthetic } = useAesthetic();
  
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/item?id=${itemId}`);
        const data = await res.json();
        if (data.success) {
          setItem(data.item);
          if (data.item?.aesthetic) {
            setAesthetic(data.item.aesthetic);
          }
        }
      } catch (err) {
        console.error('Fetch Item Error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (itemId) fetchItemData();
  }, [itemId, setAesthetic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin opacity-20" />
      </div>
    );
  }

  if (!item) return (
     <div className="min-h-screen flex items-center justify-center">
        <p className="opacity-20 font-bold uppercase tracking-widest italic">Item not discovered</p>
     </div>
  );

  return (
    <div className="min-h-screen transition-all duration-1000" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <BreadcrumbNavigation paths={[
           { label: `@${username}`, href: `/dashboard/${username}` },
           { label: slug.toUpperCase(), href: `/dashboard/${username}/${slug}` },
           { label: item.title }
        ]} />
      </div>

      {/* Mobile/Tablet Header */}
      <header className="md:hidden px-6 h-20 flex items-center justify-between sticky top-0 backdrop-blur-3xl z-50 border-b border-white/5">
        <button onClick={() => router.push(`/dashboard/${username}/${slug}`)} className="p-2 opacity-40">
           <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4">
           <button className="p-2 opacity-40"><Share2 size={20} /></button>
           <button className="p-2 opacity-40"><Heart size={20} /></button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-10 py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Gallery - Column 1-7 */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="aspect-[4/5] rounded-[64px] overflow-hidden bg-white/5 group relative cursor-zoom-in"
          >
             <img 
               src={item.images?.[0] || 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop'} 
               className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
               alt={item.title} 
             />
             <div className="absolute top-10 right-10 w-14 h-14 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Maximize2 size={20} />
             </div>
          </motion.div>
          
          <div className="grid grid-cols-4 gap-6">
             {item.images?.slice(1).map((img: string, i: number) => (
                <div key={i} className="aspect-square rounded-[32px] overflow-hidden bg-white/5 cursor-pointer hover:ring-2 hover:ring-white/20 transition-all opacity-60 hover:opacity-100">
                   <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
             ))}
          </div>
        </div>

        {/* Info - Column 8-12 */}
        <div className="lg:col-span-5 space-y-16">
          <div className="sticky top-32 space-y-16">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-3 mb-6 opacity-40">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">{item.category}</span>
                 <div className="w-1 h-1 rounded-full bg-white/40" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">{item.aesthetic}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 italic leading-none">{item.title}</h1>
              <p className="text-xl font-medium opacity-40 leading-relaxed max-w-xl">{item.description}</p>
            </motion.div>

            {item.isForSale && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-10 rounded-[48px] bg-white text-black shadow-2xl space-y-8">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-1">Market Valuation</p>
                      <p className="text-5xl font-bold italic tracking-tighter leading-none">{item.currency} {item.price?.toLocaleString()}</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center">
                      <Zap size={24} className="opacity-20" />
                   </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                   <button className="h-20 w-full bg-black text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] active:scale-[0.98] transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-4 group">
                      Acquire Aesthetic <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   <p className="text-center text-[9px] font-bold uppercase tracking-widest opacity-30 flex items-center justify-center gap-2">
                      <Shield size={12} /> Authenticity Guaranteed via Artsy Protocol
                   </p>
                </div>
              </motion.div>
            )}

            <div className="space-y-12">
               <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 border-b border-white/5 pb-6">Technical Specifications</h3>
               <AttributeDataGrid attributes={item.attributes} />
               
               {item.customFields?.length > 0 && (
                 <div className="pt-8">
                    <AttributeDataGrid attributes={item.customFields.reduce((acc: any, f: any) => ({ ...acc, [f.key]: f.value }), {})} />
                 </div>
               )}
            </div>

            <ItemDetailSidebarDesktop item={{ ...item, owner: username }} />
          </div>
        </div>
      </main>

      <StorefrontFooterDesktop />
    </div>
  );
}
