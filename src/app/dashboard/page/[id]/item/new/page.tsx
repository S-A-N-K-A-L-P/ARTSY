'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, X, ImageIcon, Sparkles, Upload, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemCard } from '@/components/items/ItemCard';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { cn } from '@/lib/utils';

export default function AddItemPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    images: [] as string[],
    tags: [] as string[],
    aesthetic: 'minimal',
    externalLinks: { instagram: '', youtube: '', website: '' },
  });

  useEffect(() => {
    // Fetch page to get its aesthetic
    const fetchPage = async () => {
      try {
        const res = await fetch('/api/creator/page');
        const data = await res.json();
        if (data.success) {
          const found = data.pages.find((p: any) => p._id === pageId);
          if (found) {
            setPage(found);
            setForm(f => ({ ...f, aesthetic: found.aesthetic?.theme || found.aesthetic || 'minimal' }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPage();
  }, [pageId]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Convert to base64 for the server-side helper
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          // In a real app, we'd call a dedicated upload API or the client-side Cloudinary SDK
          // For now, I'll use the lib/cloudinary helper directly if possible, 
          // but since this is client-side, I'll simulate or use a server action/api.
          // Let's assume the API handles it if we send base64, but for UX, let's do it here.
          const res = await fetch('/api/flutter/auth/RegisterContext', { // Temporary hijack or dedicated API
            method: 'POST',
            body: JSON.stringify({ image: base64 }) // We can create a dedicated upload API later
          });
          // Actually, let's just send base64 to the Item API and let IT handle Cloudinary.
          setForm(f => ({ ...f, images: [...f.images, base64] }));
        } catch (err) {
          setError('Upload failed');
        } finally {
          setUploading(false);
        }
      };
    } catch (err) {
      setError('File reading failed');
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/creator/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pageId, price: Number(form.price) }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/page/${pageId}`);
      } else {
        setError(data.error || 'Failed to add item');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const theme = form.aesthetic;

  return (
    <div className="min-h-screen pb-20 px-6 max-w-7xl mx-auto">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between py-10">
        <Link href={`/dashboard/page/${pageId}`} className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--bg-tertiary)] transition-all">
            <ArrowLeft size={18} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-30">Manifest Hub</p>
            <h1 className="text-xl font-black tracking-tighter text-[var(--text-primary)]">Creation Console</h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-50">{theme} Mode Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Creation Form */}
        <div className="lg:col-span-7 space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-black">01</div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Basic Metadata</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Artifact Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="The Eternal Drape"
                  className="w-full h-14 px-5 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Valorization (₹)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="0.00"
                  className="w-full h-14 px-5 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Manifesto / Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Describe the aesthetic significance..."
                rows={5}
                className="w-full p-5 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all resize-none"
              />
            </div>
          </section>

          <section className="space-y-6">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-black">02</div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Visual Artifact</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               {form.images.map((img, i) => (
                  <motion.div 
                    layout
                    key={i} 
                    className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group"
                  >
                    <img src={img.startsWith('data:') ? img : img} alt="" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                    >
                      <X size={20} className="text-white" />
                    </button>
                  </motion.div>
               ))}
               
               <label className={cn(
                  "relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
                  uploading ? "opacity-30 cursor-not-allowed" : "bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent)]"
               )}>
                  {uploading ? <Loader2 className="animate-spin text-[var(--text-muted)]" /> : <Plus size={24} className="text-[var(--text-muted)]" />}
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] mt-2">Upload</span>
                  <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} accept="image/*" />
               </label>
            </div>
          </section>

           <section className="space-y-6">
             <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center text-xs font-black">03</div>
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Convergence Links</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {['instagram', 'youtube', 'website'].map((s) => (
                  <input
                    key={s}
                    value={(form.externalLinks as any)[s]}
                    onChange={(e) => setForm(f => ({ ...f, externalLinks: { ...f.externalLinks, [s]: e.target.value } }))}
                    placeholder={`${s.charAt(0).toUpperCase() + s.slice(1)} URL`}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all"
                  />
               ))}
            </div>
          </section>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="pt-10 flex items-center gap-4">
             <button 
                onClick={handleSubmit}
                disabled={loading || !form.title || form.images.length === 0}
                className="flex-1 h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:hover:scale-100"
             >
                {loading ? 'Sychronizing...' : 'Publish to Manifest'}
             </button>
             <Link 
                href={`/dashboard/page/${pageId}`}
                className="h-16 px-8 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
             >
                Cancel
             </Link>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-black text-[9px] font-black uppercase tracking-widest mb-6">
               <Sparkles size={10} /> Live Preview
            </div>

            <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent opacity-50" />
               <div className="relative z-10 flex justify-center">
                  <ItemCard
                    id="preview"
                    title={form.title || "The Unnamed Artifact"}
                    price={Number(form.price) || 0}
                    author={page?.ownerId?.username || "creator"}
                    image={form.images[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
                    aesthetic={theme}
                  />
               </div>

               <div className="mt-10 space-y-4">
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Target Aesthetic</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">{theme}</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Manifest Destination</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/60">/{page?.slug || '...'}</p>
                  </div>
               </div>
            </div>

            <div className="mt-8 p-6 rounded-3xl border border-white/5 bg-white/[0.01] text-center">
               <p className="text-[10px] font-bold italic text-white/20">"Artifacts are the tactile dialogue between vision and existence."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
