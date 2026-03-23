'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus, MoreHorizontal, Layout, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAesthetic } from '@/aesthetics/AestheticProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { aesthetic } = useAesthetic();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    fetch('/api/creator/page')
      .then(res => res.json())
      .then(data => {
        if (data.success) setPages(data.pages || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session]);

  return (
    <div className="max-w-6xl mx-auto pb-40 transition-colors duration-500">
      {/* Welcome Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tighter mb-2 italic" style={{ color: 'var(--text-primary)' }}>Creator Studio</h2>
        <p className="opacity-60 text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Manage your digital storefronts and aesthetics</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-8 rounded-[32px] border transition-all shadow-soft" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4" style={{ color: 'var(--text-muted)' }}>Total Spaces</p>
          <div className="flex items-end gap-3">
             <span className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--text-primary)' }}>{pages.length}</span>
             <span className="text-xs font-bold opacity-30 mb-1" style={{ color: 'var(--text-secondary)' }}>Active</span>
          </div>
        </div>
        <div className="p-8 rounded-[32px] border transition-all shadow-soft" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4" style={{ color: 'var(--text-muted)' }}>Current Model</p>
          <div className="flex items-center gap-2">
             <span className="text-xl font-bold tracking-tighter capitalize italic" style={{ color: 'var(--text-primary)' }}>{aesthetic}</span>
             <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
          </div>
        </div>
        <Link 
          href="/dashboard/create" 
          className="p-8 rounded-[32px] border border-dashed hover:border-solid transition-all group flex flex-col justify-between hover:bg-[var(--bg-tertiary)]"
          style={{ borderColor: 'var(--border-strong)', backgroundColor: 'transparent' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50" style={{ color: 'var(--text-muted)' }}>Quick Action</p>
          <div className="flex items-center justify-between">
            <span className="font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Create New Space</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" style={{ color: 'var(--accent)' }} />
          </div>
        </Link>
      </div>

      {/* Pages List */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>Manage Identities</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-t-accent rounded-full animate-spin" style={{ borderColor: 'var(--border-subtle)' }} />
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-[40px] border border-dashed p-20 text-center flex flex-col items-center gap-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="w-16 h-16 rounded-[24px] flex items-center justify-center opacity-40 shadow-inner" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <Layout size={32} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div>
            <p className="font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>No active spaces found</p>
            <p className="text-xs opacity-60" style={{ color: 'var(--text-muted)' }}>Start your journey by creating a unique aesthetic page.</p>
          </div>
          <Link
            href="/dashboard/create"
            className="h-12 px-8 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Deploy First Space
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map((page: any) => (
            <div
              key={page._id}
              onClick={() => router.push(`/dashboard/page/${page._id}`)}
              className="group relative rounded-[40px] border p-8 transition-all hover:shadow-medium cursor-pointer overflow-hidden shadow-soft"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
            >
              <div className="flex gap-6 items-start relative z-10">
                <div className="w-20 h-20 rounded-[24px] overflow-hidden border shadow-sm shrink-0" style={{ borderColor: 'var(--border-subtle)' }}>
                  {page.coverImage ? (
                    <img src={page.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-bold opacity-30" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                      {page.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-soft)' }}>{page.type || 'gallery'}</span>
                     <span className="text-[9px] font-bold uppercase tracking-widest opacity-40" style={{ color: 'var(--text-muted)' }}>/{page.slug}</span>
                  </div>
                  <h4 className="text-2xl font-bold tracking-tighter truncate" style={{ color: 'var(--text-primary)' }}>{page.name}</h4>
                  <p className="text-[10px] font-bold opacity-40 mt-2 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{page.items?.length || 0} Assets Deployed</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]" style={{ color: 'var(--text-secondary)' }}>
                      <ExternalLink size={16} />
                   </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--bg-tertiary)] opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}