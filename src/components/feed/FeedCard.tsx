'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiscoveryItem {
    id: string;
    title: string;
    description?: string;
    image: string;
    price?: number;
    aesthetic: string;
    pageSlug?: string;
    creator: { username: string; avatar: string };
    type: 'item' | 'page';
}

export default function FeedCard({ item }: { item: DiscoveryItem }) {
    const router = useRouter();
    const isPage = item.type === 'page';

    // Specialized geometry for "Spaces" (compact) vs "Items" (dynamic)
    const height = useMemo(() => {
        if (isPage) {
            // Smaller, more consistent range for high-density Spaces grid
            const variants = [200, 220, 240, 260];
            const seed = item.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
            return variants[seed % variants.length];
        }
        // Taller, more expressive range for Items
        const variants = [280, 320, 380, 340];
        const seed = item.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        return variants[seed % variants.length];
    }, [item.id, isPage]);

    const handleNavigate = () => {
        if (isPage && item.pageSlug) {
            router.push(`/user/${item.creator.username}/${item.pageSlug}`);
        } else {
            router.push(`/user/${item.creator.username}/${item.pageSlug || 'item'}/${item.id}`);
        }
    };

    return (
        <motion.div 
            onClick={handleNavigate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="group cursor-pointer mb-8 relative"
        >
            {/* High-Depth Image Node */}
            <div 
                className={cn(
                    "relative overflow-hidden transition-all duration-700",
                    isPage 
                        ? "rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]" 
                        : "rounded-2xl border border-neutral-100 shadow-sm"
                )}
                style={{ height: `${height}px` }}
            >
                <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ease-out" 
                    alt={item.title}
                />
                
                {/* Visual Depth Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Specialized Page Labels (Spaces) */}
                {isPage && (
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                        <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-xl">
                            <Sparkles size={10} className="text-white" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white leading-none">
                                {item.aesthetic}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                             <Layers size={14} />
                        </div>
                    </div>
                )}

                {/* Individual Item Labels */}
                {!isPage && item.price && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xl border border-white pointer-events-none">
                         <span className="text-[10px] font-black tracking-tight text-neutral-900 leading-none italic">
                            ₹{item.price.toLocaleString()}
                         </span>
                    </div>
                )}
            </div>

            {/* Quiet Metadata Convergence */}
            <div className="mt-4 px-2">
                <div className="flex items-center justify-between gap-3">
                    <h3 className={cn(
                        "font-black tracking-tight line-clamp-1 leading-tight",
                        isPage ? "text-base italic text-neutral-900" : "text-sm text-neutral-800"
                    )}>
                        {item.title}
                    </h3>
                    {isPage && <ArrowUpRight size={14} className="text-neutral-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    <div className="relative">
                        <img 
                            src={item.creator.avatar} 
                            className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-50 shadow-sm" 
                            alt={item.creator.username}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white shadow-sm" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-400 group-hover:text-neutral-900 transition-colors">
                        @{item.creator.username}
                    </span>
                    
                    {isPage && (
                        <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-1 h-1 rounded-full bg-neutral-200" />
                            <span className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest leading-none">Perspective Node</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
