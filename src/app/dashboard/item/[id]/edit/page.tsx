'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, X, ImageIcon, Trash2, Sparkles, Upload, Loader2, Plus, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItemCard } from '@/components/items/ItemCard';
import { cn } from '@/lib/utils';

type CreationStep = 'identity' | 'visuals' | 'valorization' | 'convergence' | 'review';

export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<CreationStep>('identity');

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    images: [] as string[],
    tags: [] as string[],
    aesthetic: 'minimal',
    externalLinks: { instagram: '', youtube: '', website: '' },
    attributes: {} as Record<string, string>,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pagesRes = await fetch('/api/creator/page');
        const pagesData = await pagesRes.json();
        if (!pagesData.success) return;

        let foundItem: any = null;
        let foundPage: any = null;

        for (const p of pagesData.pages) {
          const itemsRes = await fetch(`/api/creator/item?pageId=${p._id}`);
          const itemsData = await itemsRes.json();
          if (itemsData.success) {
            const item = itemsData.items?.find((i: any) => i._id === itemId);
            if (item) {
              foundItem = item;
              foundPage = p;
              break;
            }
          }
        }

        if (foundItem) {
          setPage(foundPage);
          setForm({
            title: foundItem.title || '',
            description: foundItem.description || '',
            price: foundItem.price?.toString() || '',
            images: foundItem.images || [],
            tags: foundItem.tags || [],
            aesthetic: foundPage.aesthetic?.theme || foundPage.aesthetic || 'minimal',
            externalLinks: foundItem.externalLinks || { instagram: '', youtube: '', website: '' },
            attributes: foundItem.attributes || {},
          });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch artifact data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [itemId]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setForm(f => ({ ...f, images: [...f.images, reader.result as string] }));
      setUploading(false);
    };
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
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/dashboard/page/${page?._id}`);
      } else {
        setError(data.error || 'Failed to sync modifications');
      }
    } catch (err) {
      setError('Something went wrong during synchronization');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Permanently redact this artifact from the manifest?')) return;
    try {
      await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
      router.push(`/dashboard/page/${page?._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <Loader2 className="w-8 h-8 text-white/20 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Accessing Artifact Records...</p>
      </div>
    );
  }

  const steps: CreationStep[] = ['identity', 'visuals', 'valorization', 'convergence', 'review'];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="min-h-screen pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between py-10">
        <div className="flex items-center gap-6">
          <Link href={`/dashboard/page/${page?._id}`} className="group flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--bg-tertiary)] transition-all">
                <ArrowLeft size={18} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
             </div>
          </Link>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Edit Artifact Phase</p>
              <h1 className="text-xl font-black tracking-tighter text-white">Modification Console</h1>
           </div>
        </div>

        <div className="flex items-center gap-3">
           <button 
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl border border-red-500/10 text-[9px] font-black uppercase tracking-widest text-red-500/40 hover:text-red-500 hover:bg-red-500/5 transition-all"
           >
              Redact Artifact
           </button>
           <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{form.aesthetic} Mode</span>
           </div>
        </div>
      </div>

      {/* Progress Rail */}
      <div className="flex gap-2 mb-12">
         {steps.map((step, i) => (
            <div 
               key={step} 
               className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-700",
                  i <= currentIndex ? "bg-white" : "bg-white/5"
               )} 
            />
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Step Manager */}
        <div className="lg:col-span-7">
           <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10"
              >
                {/* 1. Identity */}
                {currentStep === 'identity' && (
                  <section className="space-y-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Artifact Title</label>
                        <input
                           value={form.title}
                           onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                           placeholder="The Eternal Drape"
                           className="w-full h-16 px-6 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-lg font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Manifesto / Description</label>
                        <textarea
                           value={form.description}
                           onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                           placeholder="Describe the aesthetic significance..."
                           rows={6}
                           className="w-full p-6 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all resize-none"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Artifact Tags (Comma Separated)</label>
                        <input
                           value={form.tags.join(', ')}
                           onChange={(e) => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) }))}
                           placeholder="minimal, noir, artisan"
                           className="w-full h-14 px-6 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all"
                        />
                     </div>
                  </section>
                )}

                {/* 2. Visuals */}
                {currentStep === 'visuals' && (
                  <section className="space-y-8">
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {form.images.map((img, i) => (
                           <motion.div layout key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button onClick={() => removeImage(i)} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                 <X size={20} className="text-white" />
                              </button>
                           </motion.div>
                        ))}
                        <label className={cn(
                           "relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
                           uploading ? "opacity-30 cursor-not-allowed" : "bg-[var(--bg-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent)]"
                        )}>
                           {uploading ? <Loader2 className="animate-spin text-[var(--text-muted)]" /> : <Plus size={24} className="text-[var(--text-muted)]" />}
                           <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] mt-2">Replace Artifact</span>
                           <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} accept="image/*" />
                        </label>
                     </div>
                  </section>
                )}

                {/* 3. Valorization */}
                {currentStep === 'valorization' && (
                  <section className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Artifact Value (₹)</label>
                           <input
                              type="number"
                              value={form.price}
                              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                              placeholder="0.00"
                              className="w-full h-16 px-6 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-lg font-bold placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:outline-none focus:border-[var(--accent)] transition-all"
                           />
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Marketplace Status</p>
                              <p className="text-xs font-bold text-amber-400 mt-1">Artifact is Private / Listing Disabled</p>
                           </div>
                        </div>
                     </div>
                  </section>
                )}

                {/* 4. Convergence */}
                {currentStep === 'convergence' && (
                  <section className="space-y-8">
                     <div className="grid grid-cols-1 gap-4">
                        {['instagram', 'youtube', 'website'].map((s) => (
                           <div key={s} className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">{s} Node</label>
                              <input
                                 value={(form.externalLinks as any)[s] || ''}
                                 onChange={(e) => setForm(f => ({ ...f, externalLinks: { ...f.externalLinks, [s]: e.target.value } }))}
                                 placeholder={`${s.charAt(0).toUpperCase() + s.slice(1)} URL`}
                                 className="w-full h-14 px-6 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-bold placeholder:text-white/10 focus:outline-none focus:border-white/20 transition-all"
                              />
                           </div>
                        ))}
                     </div>
                  </section>
                )}

                {/* 5. Review */}
                {currentStep === 'review' && (
                  <section className="space-y-8">
                     <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
                        <Save className="w-12 h-12 text-white/10 mx-auto mb-4" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Modifications Staged</h3>
                        <p className="text-xs font-bold text-white/20 mt-2">Verify the artifact preview before synchronizing with the manifest.</p>
                     </div>
                  </section>
                )}
              </motion.div>
           </AnimatePresence>

           {/* Navigation */}
           <div className="pt-20 flex items-center gap-4">
              {currentIndex > 0 && (
                 <button 
                  onClick={() => setCurrentStep(steps[currentIndex - 1])}
                  className="h-16 px-8 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                 >
                    <ChevronLeft size={16} className="mr-2" /> Back
                 </button>
              )}
              
              {currentIndex < steps.length - 1 ? (
                 <button 
                    onClick={() => setCurrentStep(steps[currentIndex + 1])}
                    className="flex-1 h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-white/10 hover:scale-[1.01] transition-all"
                 >
                    Next Phase <ChevronRight size={16} className="inline ml-2" />
                 </button>
              ) : (
                 <button 
                    onClick={handleSave}
                    disabled={saving || !form.title}
                    className="flex-1 h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-white/10 hover:scale-[1.01] transition-all disabled:opacity-30"
                 >
                    {saving ? 'Synchronizing...' : 'Save Modifications'}
                 </button>
              )}
           </div>

           {error && (
              <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest">
                {error}
              </div>
           )}
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
                    id={itemId}
                    title={form.title || "The Unnamed Artifact"}
                    price={Number(form.price) || 0}
                    author={page?.ownerId?.username || "creator"}
                    image={form.images[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
                    aesthetic={form.aesthetic}
                  />
               </div>

               <div className="mt-10 space-y-4">
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Artifact Aesthetic</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">{form.aesthetic}</p>
                  </div>
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Ownership Record</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/60">@{page?.ownerId?.username || '...'}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
