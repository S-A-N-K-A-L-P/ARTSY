'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Package, Plus, Search, Filter as FilterIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StatsStrip } from '@/components/inventory/StatsStrip';
import { InventoryProductCard } from '@/components/inventory/InventoryProductCard';
import { FilterSidebar } from '@/components/inventory/FilterSidebar';
import { CategoryBar } from '@/components/inventory/CategoryBar';

export default function ItemsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [status, setStatus] = useState('all');

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

  const handleDelete = async (itemId: string) => {
    if (!confirm('Permanently de-archive this item?')) return;
    await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
    setItems(items.filter(i => i._id !== itemId));
  };

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.tags?.[0] || 'Uncategorized'));
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.pageName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || (item.tags?.[0] || 'Uncategorized') === selectedCategory;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesStatus = status === 'all' || (status === 'synced' && item.isForSale); // Simplified logic
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, priceRange, status]);

  const totalValue = items.reduce((acc, item) => acc + (item.price || 0), 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-white shadow-xl"
        >
          <Package size={24} />
        </motion.div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">Synchronizing Manifest...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-10 pb-40">
      {/* Top Section: Navigation & Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pt-4">
        <div className="space-y-1">
          <h1 className="text-5xl font-black tracking-tighter text-neutral-900 italic leading-[0.8]">Inventory Sovereignty</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">Discovery Node Management</p>
        </div>
        <StatsStrip 
          totalItems={items.length} 
          totalValue={totalValue} 
          syncHealth="100%" 
        />
      </div>

      {/* Hero Action Bar (Amazon Style Search) */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 group w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-neutral-900 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search your global archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 h-16 bg-white border border-neutral-100 rounded-3xl text-sm font-medium focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all shadow-sm outline-none"
            />
         </div>
         <button 
           onClick={() => router.push('/dashboard/item/create')}
           className="h-16 px-10 bg-neutral-900 text-white rounded-3xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-all shadow-2xl active:scale-95 w-full md:w-auto overflow-hidden relative group"
         >
            <Plus size={18} /> 
            <span>Create Manifest</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
         </button>
      </div>

      {/* Marketplace Layout */}
      <div className="flex gap-10">
        {/* Sidebar Filters */}
        <FilterSidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            status={status}
            onStatusChange={setStatus}
        />

        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
            <CategoryBar 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <InventoryProductCard 
                            key={item._id}
                            item={item}
                            onEdit={(id) => router.push(`/dashboard/item/${id}/edit`)}
                            onDelete={handleDelete}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-32 flex flex-col items-center text-center space-y-8"
                >
                    <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-100 shadow-inner relative overflow-hidden">
                        <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-0 opacity-[0.03] bg-gradient-to-tr from-neutral-900 to-transparent"
                        />
                        <Search size={32} className="text-neutral-200" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black tracking-tighter text-neutral-900 italic">No Artifacts Manifested</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mt-2">Adjust your filters to reveal hidden nodes</p>
                    </div>
                    <button 
                        onClick={() => {
                            setSelectedCategory('All');
                            setPriceRange([0, Infinity]);
                            setStatus('all');
                            setSearchQuery('');
                        }}
                        className="px-8 py-4 rounded-2xl border border-neutral-100 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 hover:border-neutral-900 transition-all"
                    >
                        Reset All Parameters
                    </button>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
}
