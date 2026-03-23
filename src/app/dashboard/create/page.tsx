'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TYPES = ['gallery', 'store', 'portfolio'];
const AESTHETICS = ['minimal', 'noir', 'cyberpunk', 'vaporwave', 'brutalist', 'soft', 'grunge'];

export default function CreatePagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    slug: '',
    type: 'gallery',
    aesthetic: 'minimal',
    description: '',
    coverImage: '',
  });

  const handleSlugify = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setForm(f => ({ ...f, name, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/creator/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/page/${data.page._id}`);
      } else {
        setError(data.error || 'Failed to create page');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      {/* Back */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-6">
        <ArrowLeft size={16} />
        Back to Pages
      </Link>

      <h2 className="text-xl font-semibold text-white mb-1">Create Page</h2>
      <p className="text-sm text-zinc-500 mb-8">Set up a new page for your content.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Name</label>
          <input
            value={form.name}
            onChange={(e) => handleSlugify(e.target.value)}
            placeholder="Streetwear Vault"
            className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Slug</label>
          <div className="flex items-center">
            <span className="h-10 px-3 flex items-center rounded-l-lg bg-zinc-800 border border-r-0 border-zinc-700 text-sm text-zinc-500">/</span>
            <input
              value={form.slug}
              onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
              placeholder="streetwear-vault"
              className="flex-1 h-10 px-3 rounded-r-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="A curated collection of..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Cover Image URL</label>
          <input
            value={form.coverImage}
            onChange={(e) => setForm(f => ({ ...f, coverImage: e.target.value }))}
            placeholder="https://..."
            className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Type</label>
          <div className="flex gap-2">
            {TYPES.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`h-9 px-4 rounded-lg text-sm font-medium transition-colors ${
                  form.type === t
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Aesthetic */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Aesthetic</label>
          <div className="flex flex-wrap gap-2">
            {AESTHETICS.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => setForm(f => ({ ...f, aesthetic: a }))}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-colors ${
                  form.aesthetic === a
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Link href="/dashboard" className="h-9 px-4 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white flex items-center transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !form.name || !form.slug}
            className="h-9 px-6 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Page'}
          </button>
        </div>
      </form>
    </div>
  );
}
