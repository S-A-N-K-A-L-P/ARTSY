'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  ShoppingBag,
  Share2,
  Heart,
  Loader2,
  ChevronRight,
  Tag
} from 'lucide-react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { username, slug, itemId } = params as { username: string; slug: string; itemId: string };
  const { setAesthetic } = useAesthetic();
  
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

  if (!item) return <div>Item not found</div>;

  return (
    <div className="min-h-screen">
      <header className="px-6 md:px-10 h-24 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-3xl z-50">
        <button 
          onClick={() => router.push(`/dashboard/${username}/${slug}`)}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-4">
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Share2 size={18} /></button>
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Heart size={18} /></button>
        </div>
      </header>

      <div className="px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/5] rounded-[48px] overflow-hidden bg-white/5 group">
             <img 
               src={item.images?.[0] || 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop'} 
               className="w-full h-full object-cover" 
               alt={item.title} 
             />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {item.images?.slice(1).map((img: string, i: number) => (
                <div key={i} className="aspect-square rounded-3xl overflow-hidden bg-white/5 cursor-pointer hover:ring-2 hover:ring-white/20 transition-all">
                   <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-10">
            <h1 className="text-5xl font-bold tracking-tighter mb-4">{item.title}</h1>
            <p className="text-white/40 text-lg font-medium leading-relaxed">{item.description}</p>
          </div>

          <div className="space-y-12">
            {/* Price section if applicable */}
            {item.isForSale && (
              <div className="flex items-center justify-between p-8 rounded-[40px] bg-white text-black">
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Price / Access</p>
                   <p className="text-3xl font-bold italic tracking-tighter">{item.currency} {item.price?.toLocaleString()}</p>
                </div>
                <button className="px-8 h-14 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                  Add to Cart <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* Specifications / Dynamic Fields */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/20 mb-6">Specifications</h3>
              <div className="grid grid-cols-2 gap-y-8">
                {item.attributes && Object.entries(item.attributes).map(([key, value]: any) => (
                  <div key={key}>
                    <p className="text-[10px] uppercase font-bold text-white/20 mb-1">{key}</p>
                    <p className="font-bold tracking-tight text-lg italic">{value}</p>
                  </div>
                ))}
                {item.customFields?.map((field: any) => (
                  <div key={field.key}>
                    <p className="text-[10px] uppercase font-bold text-white/20 mb-1">{field.key}</p>
                    <p className="font-bold tracking-tight text-lg italic">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/5">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Aesthetic ID</p>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Tag size={20} className="text-white/40" />
                   </div>
                   <div>
                      <p className="font-bold tracking-tight">{item.category || 'Visual Art'}</p>
                      <p className="text-[10px] opacity-20 uppercase font-bold">{item.aesthetic || 'Global Theme'}</p>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
