'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, X, Sparkles, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const COLORS = {
  bg: '#ffffff',
  surface: '#ffffff',
  border: '#f0f0f0',
  accent: '#111111',
  text: '#111111',
  muted: '#888888',
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 mt-8">
    <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888]">
      {children}
    </span>
  </div>
);

const StyledInput = ({ label, description, ...props }: any) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-0.5">
        <label className="text-[11px] font-bold text-neutral-900 px-1">{label}</label>
        {description && <p className="text-[10px] text-neutral-400 px-1">{description}</p>}
      </div>
      <input
        {...props}
        className="w-full h-14 px-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-sm font-semibold text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-sm"
      />
    </div>
  );
};

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setUploading(true);
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ 
            ...prev, 
            images: [...prev.images, reader.result as string].slice(0, 8) 
        }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ 
        ...prev, 
        images: prev.images.filter((_, i) => i !== index) 
    }));
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

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Minimal Header */}
        <div className="flex items-center justify-between py-12 mb-8 border-b border-neutral-100">
          <Link href={`/dashboard/page/${pageId}`} className="group flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center group-hover:bg-neutral-100 transition-all">
              <ArrowLeft size={18} className="text-neutral-400 group-hover:text-neutral-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">New Item</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mt-0.5">Manifest Artifact</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-100">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Astal v2 Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-12 space-y-12">
                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Basic Info */}
                    <section>
                        <SectionLabel>Artifact Intelligence</SectionLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <StyledInput 
                                label="Title" 
                                name="title"
                                value={form.title}
                                onChange={(e: any) => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="e.g. The Glass Prism" 
                                required 
                            />
                            <StyledInput 
                                label="Inventory Value (₹)" 
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={(e: any) => setForm(f => ({ ...f, price: e.target.value }))}
                                placeholder="0" 
                                required 
                            />
                        </div>
                        <div className="mt-6 space-y-2">
                            <label className="text-[11px] font-bold text-neutral-900 px-1">Description</label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="What defines this artifact..."
                                rows={4}
                                className="w-full p-5 rounded-2xl bg-neutral-50 border border-neutral-100 text-sm font-semibold text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none shadow-sm"
                            />
                        </div>
                    </section>

                    {/* Media */}
                    <section>
                        <SectionLabel>Visual Record</SectionLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-6">
                            <AnimatePresence mode="popLayout">
                                {form.images.map((img, i) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        key={i} 
                                        className="relative aspect-square rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 group"
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-2 right-2 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                                        >
                                            <X size={12} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            {form.images.length < 8 && (
                                <label className={cn(
                                    "relative aspect-square rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer hover:border-neutral-900 hover:bg-neutral-100 transition-all",
                                    uploading && "opacity-50 cursor-not-allowed"
                                )}>
                                    {uploading ? <Loader2 className="animate-spin text-neutral-400" /> : <Plus size={24} className="text-neutral-400" />}
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mt-2">Add Proof</span>
                                    <input type="file" multiple className="hidden" onChange={handleImageChange} disabled={uploading} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </section>

                    {/* Secondary Data */}
                    <section>
                        <SectionLabel>External Connectivity</SectionLabel>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <StyledInput 
                                label="Instagram" 
                                value={form.externalLinks.instagram}
                                onChange={(e: any) => setForm(f => ({ ...f, externalLinks: { ...f.externalLinks, instagram: e.target.value } }))}
                                placeholder="@username or link" 
                            />
                            <StyledInput 
                                label="YouTube" 
                                value={form.externalLinks.youtube}
                                onChange={(e: any) => setForm(f => ({ ...f, externalLinks: { ...f.externalLinks, youtube: e.target.value } }))}
                                placeholder="Video link" 
                            />
                            <StyledInput 
                                label="Website" 
                                value={form.externalLinks.website}
                                onChange={(e: any) => setForm(f => ({ ...f, externalLinks: { ...f.externalLinks, website: e.target.value } }))}
                                placeholder="Store or portfolio" 
                            />
                        </div>
                    </section>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-500 text-[11px] font-bold uppercase tracking-widest">
                            {error}
                        </div>
                    )}

                    <div className="pt-12 flex items-center gap-4">
                        <button 
                            type="submit"
                            disabled={loading || !form.title || form.images.length === 0}
                            className="flex-1 h-14 rounded-2xl bg-neutral-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 active:scale-[0.98] transition-all disabled:opacity-20 disabled:hover:scale-100 shadow-xl shadow-neutral-100"
                        >
                            {loading ? 'Synchronizing...' : 'Deploy to Space'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
