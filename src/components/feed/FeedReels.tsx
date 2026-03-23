'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Heart, ShoppingBag, Share2, MessageCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import Image from 'next/image';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch('/api/items');
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data.map((item: any) => ({
             id: item._id,
             title: item.title,
             author: item.ownerId?.username || 'Unknown',
             image: item.images?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
             price: item.price || 0,
             aesthetic: item.aesthetic || 'minimal',
             description: item.description,
             likes: Math.floor(Math.random() * 1000),
             comments: Math.floor(Math.random() * 100)
          })));
        }
      } catch (err) {
        console.error('Feed Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  // Virtualized items: only render visible + prev/next
  const visibleItems = useMemo(() => {
    return items.map((item, index) => {
      const isVisible = Math.abs(index - activeIndex) <= 1;
      return { ...item, isVisible, index };
    });
  }, [items, activeIndex]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center opacity-20">
        <div className="w-10 h-10 border-2 border-t-accent rounded-full animate-spin" style={{ borderColor: 'var(--border-subtle)' }} />
      </div>
    );
  }

  return (
    <div 
      className="relative w-full max-w-md mx-auto h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] group/container"
    >
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar rounded-[48px] shadow-2xl border transition-all duration-500 relative z-10"
        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
      >
        {visibleItems.map((item) => (
          <div key={item.id} className="h-full w-full snap-start">
            {item.isVisible ? (
              <ReelCard item={item} isActive={item.index === activeIndex} />
            ) : (
              <div className="h-full w-full bg-black/20 animate-pulse" />
            ) }
          </div>
        ))}

        {items.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-40">
             <ShoppingBag size={48} className="mb-4" />
             <p className="font-bold tracking-tighter italic">No artifacts found in the void.</p>
          </div>
        )}
      </div>

      {/* Floating Scroll Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20 pointer-events-none opacity-0 group-hover/container:opacity-100 transition-opacity">
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity }}>
          <ChevronDown className="text-white/20" size={24} />
        </motion.div>
      </div>
    </div>
  );
}

const ReelCard = React.memo(({ item, isActive }: { item: FeedItem, isActive: boolean }) => {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    // Add haptic-like scale transition
  };

  return (
    <div className="h-full w-full relative overflow-hidden group">
      {/* Background with Next Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          className={cn(
            "object-cover transition-all duration-[2000ms]",
            isActive ? "scale-100 opacity-90" : "scale-110 opacity-40"
          )}
          priority={isActive}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Aesthetic Integration */}
      <AestheticRenderer aesthetic={item.aesthetic}>
        <div className="absolute inset-0 z-10 pointer-events-none">
           {/* Theme specific overlays can go here if needed */}
        </div>
      </AestheticRenderer>

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-10 pointer-events-none">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-[80%]"
        >
          <div className="flex items-center gap-2">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 text-[9px] font-black uppercase tracking-widest text-white/80 border border-white/5"
            >
              {item.aesthetic}
            </motion.span>
            <span className="text-[10px] font-bold text-white/40 italic">@{item.author}</span>
          </div>

          <div className="relative">
            <h3 className="text-3xl font-black tracking-tighter text-white drop-shadow-lg leading-tight">{item.title}</h3>
            {item.description && (
              <p className="text-[11px] text-white/60 line-clamp-2 mt-3 leading-relaxed font-medium italic">{item.description}</p>
            )}
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
             <span className="text-xl font-black text-white tracking-tighter">${item.price}</span>
             <motion.button 
               whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
               whileTap={{ scale: 0.95 }}
               onClick={() => addToCart(item)}
               className="h-12 px-8 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl relative overflow-hidden group/btn"
             >
               <span className="relative z-10">Add to Bag</span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
             </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Right Action Bar - Premium interactions */}
      <div className="absolute right-6 bottom-16 z-20 flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center gap-1.5 pointer-events-auto">
          <motion.button 
            whileTap={{ scale: 0.7 }}
            onClick={handleLike}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all",
              liked ? "bg-red-500/20 text-red-500" : "bg-white/10 text-white"
            )}
          >
            <AnimatePresence mode="wait">
               <motion.div
                 key={liked ? 'liked' : 'unliked'}
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 1.5, opacity: 0 }}
               >
                 <Heart size={24} className={liked ? "fill-current" : ""} />
               </motion.div>
            </AnimatePresence>
          </motion.button>
          <span className="text-[10px] font-bold text-white drop-shadow-md">{item.likes + (liked ? 1 : 0)}</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 pointer-events-auto">
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md bg-white/10 text-white"
          >
            <MessageCircle size={24} />
          </motion.button>
          <span className="text-[10px] font-bold text-white drop-shadow-md">{item.comments}</span>
        </div>

        <motion.button 
          whileTap={{ rotate: 15, scale: 0.9 }}
          onClick={() => {
             setSharing(true);
             setTimeout(() => setSharing(false), 2000);
          }}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md bg-white/10 text-white transition-colors",
            sharing && "bg-blue-500/20 text-blue-400"
          )}
        >
          <Share2 size={24} />
        </motion.button>

        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl relative"
        >
           <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.author}`} alt="" fill className="object-cover" />
        </motion.div>
      </div>
    </div>
  );
});

ReelCard.displayName = 'ReelCard';
