'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, Package, Layers, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { InventoryProductCard } from './InventoryProductCard';
import { CategoryBar } from './CategoryBar';

export function MobileInventoryView() {
  const router = useRouter();
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await fetch('/api/creator/items/all');
        const data = await res.json();
        if (data.success) {
          setItems(data.items || []);
        }
      } catch (err) {
        console.error('Failed to fetch items:', err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchAllItems();
    } else if (session === null) {
      setLoading(false);
    }
  }, [session]);

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.tags?.[0] || 'Uncategorized'));
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.pageName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || (item.tags?.[0] || 'Uncategorized') === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  const totalValue = items.reduce((acc, item) => acc + (item.price || 0), 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-neutral-900 rounded-[32px] flex items-center justify-center text-white shadow-2xl"
        >
          <Package size={28} />
        </motion.div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 mt-8">Syncing Nodes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32">
      {/* Mobile Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-3xl px-6 py-6 border-b border-neutral-50">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-black tracking-tighter italic text-neutral-900">Items</h1>
            <button 
                onClick={() => router.push('/dashboard/item/create')}
                className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-transform"
            >
                <Plus size={20} />
            </button>
        </div>

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
            <MobileStat label="Items" value={items.length} icon={<Layers size={10} />} />
            <MobileStat label="Value" value={`₹${(totalValue/1000).toFixed(1)}k`} icon={<DollarSign size={10} />} />
            <MobileStat label="Health" value="100%" icon={<TrendingUp size={10} />} />
        </div>

        {/* Amazon-style Search Bar */}
        <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-[12px] font-medium focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all outline-none"
            />
        </div>
      </div>

      {/* Category Strip */}
      <div className="px-6 py-4">
          <CategoryBar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
      </div>

      {/* Main Single-Column Feed */}
      <div className="px-6 space-y-6">
          <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                  <InventoryProductCard 
                    key={item._id}
                    item={item}
                    onEdit={(id) => router.push(`/dashboard/item/${id}/edit`)}
                    onDelete={() => {}} // Handle locally if needed
                  />
              ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
              <div className="py-20 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-300 italic">No artifacts revealed</p>
                  <button 
                    onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                    className="mt-4 text-[9px] font-black uppercase tracking-widest text-neutral-900 underline"
                  >
                    Reset Manifest
                  </button>
              </div>
          )}
      </div>
    </div>
  );
}

function MobileStat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center py-3 bg-neutral-50 rounded-2xl border border-neutral-100/50">
            <div className="text-neutral-300 mb-1">{icon}</div>
            <span className="text-xs font-black tracking-tighter italic text-neutral-900 leading-none">{value}</span>
            <span className="text-[7px] font-black uppercase tracking-widest text-neutral-300 mt-1">{label}</span>
        </div>
    );
}
