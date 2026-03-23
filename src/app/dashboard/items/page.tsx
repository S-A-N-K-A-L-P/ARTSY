'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Edit, Trash2 } from 'lucide-react';

export default function ItemsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    const fetchAll = async () => {
      try {
        const pagesRes = await fetch('/api/creator/page');
        const pagesData = await pagesRes.json();
        if (!pagesData.success) return;
        setPages(pagesData.pages || []);

        const allItems: any[] = [];
        for (const page of pagesData.pages) {
          const itemsRes = await fetch(`/api/creator/item?pageId=${page._id}`);
          const itemsData = await itemsRes.json();
          if (itemsData.success) {
            allItems.push(...(itemsData.items || []).map((i: any) => ({ ...i, pageName: page.name, pageId: page._id })));
          }
        }
        setItems(allItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [session]);

  const handleDelete = async (itemId: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
    setItems(items.filter(i => i._id !== itemId));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Items</h2>
          <p className="text-sm text-zinc-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} across all pages</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-sm">No items yet. Add items from your pages.</p>
        </div>
      ) : (
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Item</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Page</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Price</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Tags</th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item._id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.images?.[0] ? (
                        <img src={item.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-zinc-800" />
                      )}
                      <span className="text-sm font-medium text-white">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => router.push(`/dashboard/page/${item.pageId}`)} className="text-sm text-zinc-400 hover:text-white transition-colors">
                      {item.pageName}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">₹{item.price || '0'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {item.tags?.slice(0, 2).map((tag: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => router.push(`/dashboard/item/${item._id}/edit`)}
                        className="p-1.5 text-zinc-500 hover:text-white rounded-md hover:bg-zinc-800 transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 rounded-md hover:bg-zinc-800 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
