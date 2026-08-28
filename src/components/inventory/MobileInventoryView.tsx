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
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-card">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-accent rounded-[32px] flex items-center justify-center text-white shadow-2xl"
        >
          <Package size={28} />
        </motion.div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted mt-8">Syncing Nodes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-card pb-32">
      {/* Mobile Sticky Header */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-3xl px-6 py-6 border-b border-line">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-black tracking-tighter italic text-text">Items</h1>
            <button 
                onClick={() => router.push('/dashboard/item/create')}
                className="w-12 h-12 bg-accent text-on-accent rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-transform"
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-text transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-elevated border border-line rounded-2xl text-[12px] font-medium focus:ring-4 focus:ring-[var(--accent-soft)] focus:border-accent transition-all outline-none"
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
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted italic">No artifacts revealed</p>
                  <button 
                    onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                    className="mt-4 text-[9px] font-black uppercase tracking-widest text-text underline"
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
        <div className="flex flex-col items-center justify-center py-3 bg-elevated rounded-2xl border border-line/50">
            <div className="text-text-muted mb-1">{icon}</div>
            <span className="text-xs font-black tracking-tighter italic text-text leading-none">{value}</span>
            <span className="text-[7px] font-black uppercase tracking-widest text-text-muted mt-1">{label}</span>
        </div>
    );
}
