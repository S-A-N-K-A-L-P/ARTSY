'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Plus, MoreHorizontal, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
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
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Your Pages</h2>
          <p className="text-sm text-zinc-500 mt-1">{pages.length} page{pages.length !== 1 ? 's' : ''} created</p>
        </div>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
        >
          <Plus size={16} />
          Create Page
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        </div>
      ) : pages.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-sm mb-4">No pages yet. Create your first page to get started.</p>
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
          >
            <Plus size={16} />
            Create Page
          </Link>
        </div>
      ) : (
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Slug</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Items</th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page: any) => (
                <tr
                  key={page._id}
                  className="border-b border-zinc-800/50 hover:bg-zinc-900/30 cursor-pointer transition-colors"
                  onClick={() => router.push(`/dashboard/page/${page._id}`)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {page.coverImage ? (
                        <img src={page.coverImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                          {page.name?.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm font-medium text-white">{page.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">{page.type || 'gallery'}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-500">/{page.slug}</td>
                  <td className="px-4 py-3 text-sm text-zinc-500">{page.items?.length || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1.5 text-zinc-500 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}