'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Plus, 
  Layout, 
  ArrowRight, 
  Settings, 
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAesthetic } from '@/aesthetics/AestheticProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { aesthetic } = useAesthetic();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      if (!session?.user) return;
      try {
        setLoading(true);
        const res = await fetch('/api/creator/page');
        const data = await res.json();
        if (data.success) {
          setPages(data.pages || []);
        }
      } catch (err) {
        console.error('Fetch Pages Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, [session]);

  return (
    <div className="pb-24 md:pb-10 transition-colors duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b pb-12" style={{ borderColor: 'var(--border-subtle)' }}>
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[9px] font-black uppercase tracking-widest mb-4">
              <Settings size={10} /> Management
            </div>
            <h1 className="text-5xl font-black tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>Creator Studio</h1>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] opacity-40">Orchestrate your aesthetic presence</p>
         </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-10 rounded-[48px] border transition-all shadow-soft group hover:shadow-medium relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-2" style={{ color: 'var(--text-muted)' }}>Deployed Archetypes</p>
          <div className="flex items-end gap-3">
             <span className="text-5xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>{pages.length}</span>
             <div className="w-2 h-2 rounded-full bg-[var(--accent)] absolute top-10 right-10 animate-pulse shadow-[0_0_15px_var(--accent-soft)]" />
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-5 translate-y-4 group-hover:translate-y-0 transition-transform">
             <Layout size={100} />
          </div>
        </div>
        
        <div className="p-10 rounded-[48px] border transition-all shadow-soft group hover:shadow-medium relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-2" style={{ color: 'var(--text-muted)' }}>Active Identity</p>
          <span className="text-2xl font-black tracking-tighter capitalize italic" style={{ color: 'var(--text-primary)' }}>{aesthetic}</span>
          <div className="absolute -bottom-4 -right-4 opacity-5 translate-y-4 group-hover:translate-y-0 transition-transform">
             <Sparkles size={100} />
          </div>
        </div>

        <Link 
          href="/dashboard/create" 
          className="p-10 rounded-[48px] border border-dashed hover:border-solid transition-all group flex flex-col justify-between hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent-soft)]"
          style={{ borderColor: 'var(--border-strong)', backgroundColor: 'transparent' }}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40" style={{ color: 'var(--text-muted)' }}>Forge New Space</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Create Identity</span>
            <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] transition-all">
              <Plus size={24} />
            </div>
          </div>
        </Link>
      </div>

      {/* Pages Section */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-3xl font-black tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>Physical Manifestations</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="w-10 h-10 border-2 border-t-accent rounded-full animate-spin" style={{ borderColor: 'var(--border-subtle)' }} />
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-[64px] border border-dashed p-32 text-center flex flex-col items-center gap-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="w-24 h-24 rounded-[40px] flex items-center justify-center opacity-20 shadow-inner" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-strong)' }}>
            <Layout size={48} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div className="max-w-xs">
            <p className="text-2xl font-black tracking-tighter mb-2" style={{ color: 'var(--text-primary)' }}>No static data detected</p>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed" style={{ color: 'var(--text-muted)' }}>Your presence is felt, but your spaces remain unformed. Begin the ritual of creation.</p>
          </div>
          <Link
            href="/dashboard/create"
            className="h-14 px-12 rounded-2xl font-black text-[10px] uppercase tracking-[.3em] transition-all active:scale-95 shadow-2xl bg-[var(--accent)] text-[var(--bg-primary)] flex items-center justify-center"
          >
            Deploy First Space
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-10">
          {pages.map((page: any) => (
            <CollectionCard key={page._id} page={page} />
          ))}
        </div>
      )}
    </div>
  );
}

function CollectionCard({ page }: { page: any }) {
  const router = useRouter();

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      onClick={() => router.push(`/dashboard/page/${page._id}`)}
      className="group relative h-[280px] md:h-[500px] rounded-[32px] md:rounded-[64px] overflow-hidden cursor-pointer border transition-all duration-700 shadow-soft hover:shadow-medium"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
    >
      <img 
        src={page.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'} 
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
        alt={page.name} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-12 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 transition-all duration-700">
        <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-6">
            <span className="px-3 md:px-5 py-1 md:py-2 rounded-full bg-white/10 backdrop-blur-md text-[7px] md:text-[9px] uppercase font-black tracking-widest text-white border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">{page.type || 'gallery'}</span>
            <span className="px-3 md:px-5 py-1 md:py-2 rounded-full bg-white/10 backdrop-blur-md text-[7px] md:text-[9px] uppercase font-black tracking-widest text-white border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">{page.aesthetic?.theme || page.aesthetic || 'minimal'}</span>
        </div>
        <h3 className="text-xl md:text-5xl font-black tracking-tighter text-white drop-shadow-2xl">{page.name}</h3>
        <p className="hidden md:block text-[12px] font-bold text-white/40 mt-6 line-clamp-2 italic leading-relaxed uppercase tracking-widest max-w-[80%]">{page.description || 'A unique spatial convergence produced by artistic intent.'}</p>
        
        <div className="mt-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all delay-100">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white">
            Access Artifact <ArrowRight size={16} className="text-[var(--accent)]" />
          </div>
        </div>
      </div>
      
      {/* Top Overlay Actions */}
      <div className="absolute top-10 right-10 flex flex-col gap-4">
        <button 
          onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/settings/${page._id}`); }}
          className="w-14 h-14 rounded-3xl backdrop-blur-xl bg-black/20 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent-soft)] hover:scale-110 transition-all"
        >
           <Settings size={22} />
        </button>
      </div>
    </motion.div>
  );
}