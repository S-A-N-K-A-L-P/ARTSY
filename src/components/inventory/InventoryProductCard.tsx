'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, MoreHorizontal, ShoppingCart, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface InventoryProductCardProps {
  item: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function InventoryProductCard({ item, onEdit, onDelete }: InventoryProductCardProps) {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group bg-white rounded-[32px] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] transition-all duration-700"
    >
      {/* High-Dominance Image Container (80% weight) */}
      <div className="relative h-64 overflow-hidden bg-neutral-50 group-hover:scale-[0.98] transition-transform duration-700 m-2 rounded-[24px]">
        <img 
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          alt={item.title}
        />
        
        {/* Aesthetic Chip Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
            <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center gap-1.5 shadow-2xl">
                <Sparkles size={10} className="text-white" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white leading-none">
                    {item.aesthetic || 'minimal'}
                </span>
            </div>
        </div>

        {/* Quick Access Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <button 
                onClick={() => onEdit(item._id)}
                className="flex-1 h-12 bg-white text-neutral-900 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-neutral-900 hover:text-white transition-all"
            >
                <Edit size={14} /> Edit
            </button>
            <button 
                onClick={() => onDelete(item._id)}
                className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-xl flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all"
            >
                <Trash2 size={16} />
            </button>
        </div>
      </div>

      {/* Structured Details (Marketplace Style) */}
      <div className="p-6 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-black tracking-tighter text-neutral-900 line-clamp-1 leading-tight group-hover:text-neutral-600 transition-colors italic">
              {item.title}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300">
                {item.pageName || 'Universal Registry'}
            </p>
          </div>
          <p className="text-lg font-black tracking-tighter text-neutral-900 italic">
            ₹{item.price?.toLocaleString() || '0'}
          </p>
        </div>

        {/* Bottom Strip (Status/Meta) */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-50">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400">Synced Live</span>
            </div>
            <button 
                onClick={() => router.push(`/dashboard/item/${item._id}/edit`)}
                className="text-[8px] font-black uppercase tracking-widest text-neutral-300 hover:text-neutral-900 flex items-center gap-1 transition-colors"
            >
                View Node <ExternalLink size={8} />
            </button>
        </div>
      </div>
    </motion.div>
  );
}
