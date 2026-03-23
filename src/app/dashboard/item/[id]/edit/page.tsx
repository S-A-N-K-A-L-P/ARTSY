'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, X, ImageIcon, Trash2 } from 'lucide-react';

export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pageId, setPageId] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    images: [] as string[],
    tags: [] as string[],
    externalLinks: { instagram: '', youtube: '', website: '' },
    attributes: {} as Record<string, string>,
  });

  useEffect(() => {
    // We need to find the item — fetch all pages then items
    const fetchItem = async () => {
      try {
        const pagesRes = await fetch('/api/creator/page');
        const pagesData = await pagesRes.json();
        if (!pagesData.success) return;

        for (const page of pagesData.pages) {
          const itemsRes = await fetch(`/api/creator/item?pageId=${page._id}`);
          const itemsData = await itemsRes.json();
          if (itemsData.success) {
            const found = itemsData.items?.find((i: any) => i._id === itemId);
            if (found) {
              setPageId(page._id);
              setForm({
                title: found.title || '',
                description: found.description || '',
                price: found.price?.toString() || '',
                images: found.images || [],
                tags: found.tags || [],
                externalLinks: found.externalLinks || { instagram: '', youtube: '', website: '' },
                attributes: found.attributes || {},
              });
              break;
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const addImage = () => {
    if (imageUrl.trim()) {
      setForm(f => ({ ...f, images: [...f.images, imageUrl.trim()] }));
      setImageUrl('');
    }
  };

  const removeImage = (idx: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/creator/item/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/page/${pageId}`);
      } else {
        setError(data.error || 'Failed to save');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Permanently delete this item?')) return;
    try {
      await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
      router.push(`/dashboard/page/${pageId}`);
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

  return (
    <div className="max-w-5xl">
      {pageId && (
        <Link href={`/dashboard/page/${pageId}`} className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Page
        </Link>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-white">Edit Item</h2>
          <p className="text-sm text-zinc-500 mt-1">ID: {itemId}</p>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 h-9 px-4 rounded-lg border border-red-900/50 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Price (₹)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
              className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Tags (comma separated)</label>
            <input
              value={form.tags.join(', ')}
              onChange={(e) => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) }))}
              className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Images</label>
            <div className="flex gap-2 mb-3">
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                placeholder="Paste image URL"
                className="flex-1 h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              <button type="button" onClick={addImage} className="h-10 px-4 rounded-lg bg-zinc-800 text-sm text-white hover:bg-zinc-700 transition-colors">Add</button>
            </div>
            {form.images.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {form.images.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Social Links</label>
            <div className="space-y-2">
              {(['instagram', 'youtube', 'website'] as const).map(key => (
                <input
                  key={key}
                  value={(form.externalLinks as any)[key] || ''}
                  onChange={(e) => setForm(f => ({ ...f, externalLinks: { ...f.externalLinks, [key]: e.target.value } }))}
                  placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} link`}
                  className="w-full h-9 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                />
              ))}
            </div>
          </div>

          {/* Attributes */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Attributes</label>
            <div className="space-y-2">
              {Object.entries(form.attributes).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="h-9 px-3 rounded-lg bg-zinc-800 text-sm text-zinc-500 flex items-center min-w-[100px]">{key}</span>
                  <input
                    value={value}
                    onChange={(e) => setForm(f => ({ ...f, attributes: { ...f.attributes, [key]: e.target.value } }))}
                    className="flex-1 h-9 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">Preview</label>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900">
            <div className="aspect-square bg-zinc-800 flex items-center justify-center">
              {form.images[0] ? (
                <img src={form.images[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <ImageIcon size={32} className="mx-auto text-zinc-600 mb-2" />
                  <p className="text-xs text-zinc-600">No image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white">{form.title || 'Item Title'}</h3>
              {form.price && <p className="text-sm text-zinc-400 mt-1">₹{form.price}</p>}
              {form.description && <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{form.description}</p>}
              {form.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap mt-3">
                  {form.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-800">
        {pageId && (
          <Link href={`/dashboard/page/${pageId}`} className="h-9 px-4 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white flex items-center transition-colors">
            Cancel
          </Link>
        )}
        <button
          onClick={handleSave}
          disabled={saving || !form.title}
          className="h-9 px-6 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
