'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

export default function CreatePostPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    caption: '',
    type: 'showcase',
    layout: 'grid',
    selectedItemIds: [] as string[],
  });

  useEffect(() => {
    fetch(`/api/creator/item?pageId=${pageId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setItems(data.items || []);
      })
      .catch(console.error)
      .finally(() => setFetchingItems(false));
  }, [pageId]);

  const toggleItem = (itemId: string) => {
    setForm(f => ({
      ...f,
      selectedItemIds: f.selectedItemIds.includes(itemId)
        ? f.selectedItemIds.filter(id => id !== itemId)
        : [...f.selectedItemIds, itemId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || form.selectedItemIds.length === 0) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/creator/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          title: form.title,
          caption: form.caption,
          type: form.type,
          layout: form.layout,
          itemIds: form.selectedItemIds,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/page/${pageId}`);
      } else {
        setError(data.error || 'Failed to create post');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <Link href={`/dashboard/page/${pageId}`} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors mb-6">
        <ArrowLeft size={16} />
        Back to Page
      </Link>

      <h2 className="text-xl font-semibold text-text mb-1">Create Post</h2>
      <p className="text-sm text-text-muted mb-8">Showcase your items in a feed post.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="New Collection Drop"
            className="w-full h-10 px-3 rounded-lg bg-card border border-line text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Caption</label>
          <textarea
            value={form.caption}
            onChange={(e) => setForm(f => ({ ...f, caption: e.target.value }))}
            placeholder="Write something about this post..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-card border border-line text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        {/* Post Type */}
        <div>
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Type</label>
          <div className="flex gap-2">
            {['showcase', 'drop', 'announcement'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`h-9 px-4 rounded-lg text-sm font-medium transition-colors ${
                  form.type === t
                    ? 'bg-card text-text'
                    : 'bg-card border border-line text-text-muted hover:text-text'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div>
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">Layout</label>
          <div className="flex gap-2">
            {['grid', 'list', 'carousel'].map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setForm(f => ({ ...f, layout: l }))}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                  form.layout === l
                    ? 'bg-card text-text'
                    : 'bg-card border border-line text-text-muted hover:text-text'
                }`}
              >
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Item Selector */}
        <div>
          <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Select Items ({form.selectedItemIds.length} selected)
          </label>

          {fetchingItems ? (
            <div className="py-8 text-center">
              <div className="w-5 h-5 border-2 border-line-strong border-t-white rounded-full animate-spin mx-auto" />
            </div>
          ) : items.length === 0 ? (
            <div className="border border-dashed border-line rounded-xl p-8 text-center">
              <p className="text-sm text-text-muted">No items in this page yet.</p>
              <Link href={`/dashboard/page/${pageId}/item/new`} className="text-sm text-text underline mt-1 inline-block">Add items first</Link>
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto border border-line rounded-xl p-2">
              {items.map((item: any) => {
                const selected = form.selectedItemIds.includes(item._id);
                return (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => toggleItem(item._id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                      selected ? 'bg-elevated border border-line-strong' : 'hover:bg-card border border-transparent'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                      selected ? 'bg-card border-line' : 'border-line-strong'
                    }`}>
                      {selected && <Check size={12} className="text-text" />}
                    </div>
                    {item.images?.[0] ? (
                      <img src={item.images[0]} alt="" className="w-8 h-8 rounded-md object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-md bg-elevated" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{item.title}</p>
                      <p className="text-xs text-text-muted">₹{item.price || '0'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <Link href={`/dashboard/page/${pageId}`} className="h-9 px-4 rounded-lg border border-line text-sm text-text-muted hover:text-text flex items-center transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !form.title || form.selectedItemIds.length === 0}
            className="h-9 px-6 rounded-lg bg-card text-text text-sm font-medium hover:bg-elevated transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
