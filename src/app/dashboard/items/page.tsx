'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Edit, Trash2, Eye, Package, ExternalLink, Plus, Search, Filter, TrendingUp, DollarSign, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ItemsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.pageName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 pb-40">
      {/* Premium Analytics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Manifested" 
          value={items.length} 
          icon={<Layers size={20} />} 
          trend="+4% this cycle"
        />
        <StatCard 
          label="Capital Value" 
          value={`₹${totalValue.toLocaleString()}`} 
          icon={<DollarSign size={20} />} 
          trend="Calculated Live"
        />
        <StatCard 
          label="Sync Health" 
          value="100%" 
          icon={<TrendingUp size={20} />} 
          trend="All Nodes Active"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-neutral-900 italic">Inventory Sovereignty</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 mt-2">Manage your archival collection</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-hover:text-neutral-900 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Filter archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 h-14 w-80 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-neutral-900 transition-all shadow-sm"
            />
          </div>
          <button className="h-14 w-14 bg-neutral-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-xl active:scale-95">
             <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-neutral-100 shadow-[0_40px_100px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/50 border-b border-neutral-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Artifact Details</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Manifest Node</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Valuation</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Aesthetic Status</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 text-right">Synchronization</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100/50">
            <AnimatePresence>
              {filteredItems.map((item, i) => (
                <motion.tr 
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group hover:bg-neutral-50/50 transition-all cursor-default"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-100 shadow-sm relative group">
                        <img 
                          src={item.images?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'} 
                          alt="" 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                           <Eye size={20} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-black text-neutral-900 tracking-tight">{item.title}</span>
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-400 font-black uppercase tracking-widest leading-none">ID: {item._id.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => router.push(`/dashboard/page/${item.pageId}`)}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 transition-colors group/link"
                    >
                      {item.pageName}
                      <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-all translate-x-1" />
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-neutral-900 italic tracking-tight">₹{item.price?.toLocaleString() || '0'}</span>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-900 leading-none">Synced Live</span>
                     </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => router.push(`/dashboard/item/${item._id}/edit`)}
                        className="p-3 text-neutral-400 hover:text-neutral-900 bg-white border border-neutral-100 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-3 text-neutral-200 hover:text-red-500 bg-white border border-neutral-100 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="p-32 text-center space-y-6">
             <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto border border-neutral-100 shadow-inner">
                <Search size={32} className="text-neutral-200" />
             </div>
             <div>
                <p className="text-sm font-black tracking-tighter text-neutral-900 italic">The Archive is Shallow</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300 mt-2">No items match your manifestation</p>
             </div>
             <button 
                onClick={() => router.push('/dashboard/item/create')}
                className="inline-flex items-center gap-3 h-14 px-8 rounded-2xl bg-neutral-900 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all active:scale-95"
             >
                <Plus size={16} /> Create Manifest
             </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: { label: string; value: string | number; icon: React.ReactNode; trend: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-[40px] bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col gap-6 group hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-900 transition-all group-hover:bg-neutral-900 group-hover:text-white group-hover:shadow-xl group-hover:-translate-y-1">
          {icon}
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-300 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-50 group-hover:border-neutral-100 group-hover:text-neutral-900 transition-all">
          {trend}
        </div>
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-1">{label}</h4>
        <p className="text-3xl font-black text-neutral-900 tracking-tighter italic">{value}</p>
      </div>
    </motion.div>
  );
}
