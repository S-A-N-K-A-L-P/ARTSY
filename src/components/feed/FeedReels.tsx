'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Share2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import AestheticRenderer from '@/components/aesthetics/AestheticRenderer';
import { cn } from '@/lib/utils';

interface FeedItem {
  id: string;
  title: string;
  author: string;
  image: string;
  price: number;
  aesthetic: string;
  description?: string;
  likes: number;
  comments: number;
}

export default function FeedReels() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/items');
        const data = await res.json();
        if (data.success) {
          setItems(data.items);
        }
      } catch (err) {
        console.error('Feed Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center opacity-20">
        <div className="w-10 h-10 border-2 border-t-accent rounded-full animate-spin" style={{ borderColor: 'var(--border-subtle)' }} />
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] w-full max-w-md mx-auto overflow-y-scroll snap-y snap-mandatory hide-scrollbar rounded-[48px] shadow-2xl border transition-all duration-500"
      style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
    >
      {items.map((item) => (
        <ReelCard key={item.id} item={item} />
      ))}

      {items.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-40">
           <ShoppingBag size={48} className="mb-4" />
           <p className="font-bold tracking-tighter italic">No artifacts found in the void.</p>
        </div>
      )}
    </div>
  );
}

function ReelCard({ item }: { item: FeedItem }) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);

  return (
    <div className="h-full w-full snap-start relative overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Aesthetic Overlay Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-10 pointer-events-none">
        
        {/* Bottom Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-4 max-w-[80%]"
        >
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 text-[9px] font-black uppercase tracking-widest text-white/80 border border-white/5">
              {item.aesthetic}
            </span>
            <span className="text-[10px] font-bold text-white/40 italic">@{item.author}</span>
          </div>

          <div>
            <h3 className="text-3xl font-bold tracking-tighter text-white drop-shadow-lg">{item.title}</h3>
            {item.description && (
              <p className="text-xs text-white/60 line-clamp-2 mt-2 leading-relaxed italic">{item.description}</p>
            )}
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
             <span className="text-lg font-bold text-white tracking-tighter">${item.price}</span>
             <button 
               onClick={() => addToCart(item)}
               className="h-10 px-6 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
             >
               Add to Bag
             </button>
          </div>
        </motion.div>
      </div>

      {/* Right Action Bar */}
      <div className="absolute right-6 bottom-12 z-20 flex flex-col gap-6 items-center">
        <ActionButton 
          active={liked} 
          onClick={() => setLiked(!liked)}
          icon={<Heart size={24} className={liked ? "fill-red-500 text-red-500" : "text-white"} />}
          label={item.likes + (liked ? 1 : 0)}
        />
        <ActionButton 
          icon={<MessageCircle size={24} className="text-white" />}
          label={item.comments}
        />
        <ActionButton 
          icon={<Share2 size={24} className="text-white" />}
        />
        <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.author}`} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick, active }: any) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button 
        onClick={onClick}
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/10 hover:bg-white/20 transition-all active:scale-90",
          active && "bg-white/30"
        )}
      >
        {icon}
      </button>
      {label !== undefined && (
        <span className="text-[10px] font-bold text-white drop-shadow-md">{label}</span>
      )}
    </div>
  );
}
