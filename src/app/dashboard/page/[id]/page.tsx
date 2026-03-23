'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, MoreHorizontal, Trash2, Edit, Eye } from 'lucide-react';

type Tab = 'feed' | 'items' | 'settings';

export default function PageHubPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;
  
  const [page, setPage] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('items');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch page details
        const pageRes = await fetch('/api/creator/page');
        const pageData = await pageRes.json();
        if (pageData.success) {
          const found = pageData.pages.find((p: any) => p._id === pageId);
          if (found) setPage(found);
        }

        // Fetch items
        const itemRes = await fetch(`/api/creator/item?pageId=${pageId}`);
        const itemData = await itemRes.json();
        if (itemData.success) setItems(itemData.items || []);

        // Fetch posts
        const postRes = await fetch(`/api/creator/post?pageId=${pageId}`);
        const postData = await postRes.json();
        if (postData.success) setPosts(postData.posts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageId]);

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
      setItems(items.filter(i => i._id !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 text-sm">Page not found</p>
        <Link href="/dashboard" className="text-sm text-white underline mt-2 inline-block">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Back */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} />
        Back to Pages
      </Link>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {page.coverImage ? (
            <img src={page.coverImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-lg font-semibold text-zinc-400">
              {page.name?.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-white">{page.name}</h2>
            <p className="text-sm text-zinc-500">/{page.slug} · {page.type || 'gallery'}</p>
          </div>
        </div>
        <Link
          href={`/user/${page.slug}`}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <Eye size={14} />
          View Public
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-zinc-800 mb-6">
        {(['feed', 'items', 'settings'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-white text-white'
                : 'border-transparent text-zinc-500 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'items' && <span className="ml-1.5 text-xs text-zinc-600">{items.length}</span>}
            {tab === 'feed' && <span className="ml-1.5 text-xs text-zinc-600">{posts.length}</span>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'items' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
            <Link
              href={`/dashboard/page/${pageId}/item/new`}
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              <Plus size={16} />
              Add Item
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center">
              <p className="text-zinc-500 text-sm mb-4">No items yet. Add your first item.</p>
              <Link
                href={`/dashboard/page/${pageId}/item/new`}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
              >
                <Plus size={16} />
                Add Item
              </Link>
            </div>
          ) : (
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-4 py-3">Title</th>
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
                      <td className="px-4 py-3 text-sm text-zinc-400">₹{item.price || '0'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {item.tags?.slice(0, 3).map((tag: string, i: number) => (
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
                            onClick={() => handleDeleteItem(item._id)}
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
      )}

      {activeTab === 'feed' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-500">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
            <Link
              href={`/dashboard/page/${pageId}/post/new`}
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              <Plus size={16} />
              Add Post
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center">
              <p className="text-zinc-500 text-sm mb-4">No posts yet. Create a post to showcase your items.</p>
              <Link
                href={`/dashboard/page/${pageId}/post/new`}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
              >
                <Plus size={16} />
                Create Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post: any) => (
                <div key={post._id} className="border border-zinc-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-white">{post.title}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{post.type || 'showcase'} · {post.itemIds?.length || 0} items</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400">{post.visibility || 'public'}</span>
                  </div>
                  {post.caption && <p className="text-sm text-zinc-400">{post.caption}</p>}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-800/50">
                    <span className="text-xs text-zinc-500">❤️ {post.engagement?.likes || 0}</span>
                    <span className="text-xs text-zinc-500">💬 {post.engagement?.comments || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-lg">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Page Name</label>
            <input
              value={page.name}
              readOnly
              className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Aesthetic</label>
            <input
              value={page.aesthetic?.theme || page.aesthetic || 'minimal'}
              readOnly
              className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Visibility</label>
            <span className="text-sm text-zinc-400">{page.settings?.isPublic !== false ? 'Public' : 'Private'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
