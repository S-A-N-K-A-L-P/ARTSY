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
    const router = useRouter();
    const isPage = item.type === 'page';

    // Controlled heights for visual discovery rhythm
    const height = React.useMemo(() => {
        const variants = [240, 280, 340, 300];
        const seed = item.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        return variants[seed % variants.length];
    }, [item.id]);

    const handleNavigate = () => {
        if (item.pageSlug) {
            router.push(`/user/${item.creator.username}/${item.pageSlug}`);
        } else {
            // Future-proofing for individual items if needed
            router.push(`/user/${item.creator.username}/${item.pageSlug || 'item'}/${item.id}`);
        }
    };

    return (
        <div 
            onClick={handleNavigate}
            className="group cursor-pointer mb-6"
        >
            {/* Image Container */}
            <div 
                className="relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-50 shadow-sm transition-all duration-500"
                style={{ height: `${height}px` }}
            >
                <img 
                    src={item.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={item.title}
                />
            </div>

            {/* Quiet Metadata */}
            <div className="mt-3 px-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1 leading-tight">
                        {item.title}
                    </h3>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                    <img 
                        src={item.creator.avatar} 
                        className="w-4 h-4 rounded-full bg-neutral-100" 
                        alt={item.creator.username}
                    />
                    <span className="text-[11px] font-medium text-neutral-400">
                        @{item.creator.username}
                    </span>
                    {!isPage && item.price && (
                        <span className="text-[11px] font-semibold text-neutral-900 ml-auto">
                            ₹{item.price}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
