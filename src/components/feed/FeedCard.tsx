'use client';

import React, { useMemo } from 'react';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface DiscoveryItem {
    id: string;
    title: string;
    image: string;
    price?: number;
    aesthetic: string;
    pageSlug?: string;
    creator: { username: string; avatar: string };
    type: 'item' | 'page';
}

export default function FeedCard({ item }: { item: DiscoveryItem }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleNavigate = () => {
        if (item.pageSlug) {
            router.push(`/user/${item.creator.username}/${item.pageSlug}`);
        }
    };

    const isPage = item.type === 'page';

    const randomHeight = useMemo(() => {
        // Stable pseudo-random height between 250 and 450
        const seed = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return 250 + (seed % 200);
    }, [item.id]);

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={handleNavigate}
            className="group relative rounded-2xl md:rounded-[32px] overflow-hidden cursor-pointer bg-black/20"
            style={{ height: `${randomHeight}px` }}
        >
            {/* IMAGE */}
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* TOP TAG - Always semi-visible, more visible on hover */}
            <div className="absolute top-3 left-3 md:top-5 md:left-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/90 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] group-hover:border-transparent transition-all">
                <Sparkles size={10} className="text-[var(--accent)] group-hover:text-[var(--bg-primary)]" />
                {item.aesthetic}
            </div>

            {/* BOTTOM INFO - Hover Reveal */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-bold text-sm md:text-lg tracking-tight leading-tight line-clamp-2 mb-2 italic">
                    {item.title}
                </p>
                <div className="flex items-center gap-2">
                    <Avatar 
                        src={item.creator.avatar} 
                        sx={{ width: 18, height: 18, border: '1px solid rgba(255,255,255,0.2)' }} 
                    />
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                        @{item.creator.username}
                    </p>
                </div>
                
                {!isPage && item.price && (
                    <p className="mt-4 text-white font-black text-sm tracking-tighter">
                        ₹{item.price}
                    </p>
                )}
            </div>
            
            {/* PRICE TAG - Visible always but subtle */}
            {!isPage && item.price && (
                <div className="absolute top-3 right-3 md:top-5 md:right-5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-white text-[10px] font-black tracking-tighter group-hover:opacity-0 transition-opacity">
                    ₹{item.price}
                </div>
            )}
        </motion.div>
    );
}
