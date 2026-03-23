'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Settings, 
  Image as ImageIcon, 
  PlusCircle, 
  Sparkles,
  Command,
  Save,
  Trash2,
  Box,
  Palette,
  ShoppingBag,
  Layers,
  ArrowRight,
  ExternalLink,
  Loader2,
  Layout,
  CheckCircle2,
  Globe,
  Tag,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeName } from '@/lib/theme/themes';
import { useRouter } from 'next/navigation';

// --- Types ---
type WorkflowView = 'DASHBOARD' | 'CREATE_PAGE' | 'MANAGE_PAGE' | 'ADD_ITEM' | 'EDIT_ITEM';

// --- Sub-Components ---

// 1. Progress Indicator
const WorkflowProgress = ({ current, total, label }: { current: number, total: number, label: string }) => (
  <div className="flex flex-col items-end gap-3">
     <p className="text-[9px] font-black uppercase tracking-widest opacity-20">{label}</p>
     <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i + 1 <= current ? "bg-white w-12" : "bg-white/10 w-4"
            )} 
          />
        ))}
     </div>
  </div>
);

// 2. Dashboard Entry (Screen 1)
const PageDashboard = ({ pages, onCreatePage, onManagePage }: any) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
    <div className="flex items-center justify-between">
       <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter italic uppercase">Identity Lab</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">Manage your aesthetic command centers</p>
       </div>
       <button 
         onClick={onCreatePage}
         className="h-16 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-white/10"
       >
         <Plus size={18} /> Create New Space
       </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {pages.map((page: any) => (
         <motion.div 
           key={page._id} 
           whileHover={{ y: -8 }}
           className="group relative h-80 rounded-[48px] overflow-hidden border border-white/5 bg-white/5 cursor-pointer"
           onClick={() => onManagePage(page)}
         >
            <img src={page.coverImage} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" alt="" />
            <div className="absolute inset-0 p-10 flex flex-col justify-between">
               <div className="flex items-center justify-between">
                  <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-3xl text-[9px] font-black uppercase tracking-[0.3em] border border-white/5">
                     {page.type}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                     <ArrowRight size={18} />
                  </div>
               </div>
               <div>
                  <h3 className="text-3xl font-black tracking-tighter italic uppercase truncate mb-1">{page.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-20 italic">Aesthetic: {page.aesthetic}</p>
               </div>
            </div>
         </motion.div>
       ))}

       {/* Empty/Add Placeholder */}
       <button 
         onClick={onCreatePage}
         className="h-80 rounded-[48px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-6 opacity-40 hover:opacity-100 hover:border-white/20 transition-all group"
       >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
             <Plus size={24} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Deploy New Space</span>
       </button>
    </div>
  </motion.div>
);

// 3. Create Page - Step 1: Basic Info (Screen 2)
const StepCreatePageBasic = ({ form, onChange, onNext, onCancel }: any) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-2xl mx-auto py-12">
     <div className="space-y-2">
        <h3 className="text-4xl font-black tracking-tighter italic uppercase">Identity Basics</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">Define the core parameters of your space</p>
     </div>

     <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Space Name</label>
              <input 
                placeholder="e.g. Streetwear Vault" 
                className="w-full h-20 bg-white/5 border border-white/5 rounded-3xl px-8 font-bold tracking-tight focus:outline-none focus:border-white/20 transition-all"
                value={form.name}
                onChange={(e) => onChange({...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
              />
           </div>
           <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">URL Slug</label>
              <input 
                placeholder="streetwear-vault" 
                className="w-full h-20 bg-white/5 border border-white/5 rounded-3xl px-8 font-bold font-mono text-xs opacity-40 pointer-events-none"
                value={form.slug}
                readOnly
              />
           </div>
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Description</label>
           <textarea 
             placeholder="What is this space about?" 
             className="w-full h-32 bg-white/5 border border-white/5 rounded-3xl p-8 font-medium tracking-tight focus:outline-none focus:border-white/20 transition-all resize-none"
             value={form.description}
             onChange={(e) => onChange({...form, description: e.target.value})}
           />
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Space Type</label>
           <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'gallery', icon: Box, label: 'Gallery' },
                { id: 'store', icon: ShoppingBag, label: 'Storefront' },
                { id: 'portfolio', icon: Layers, label: 'Archive' }
              ].map(t => (
                 <button 
                   key={t.id}
                   onClick={() => onChange({...form, type: t.id})}
                   className={cn(
                     "h-28 rounded-[40px] border flex flex-col items-center justify-center gap-3 transition-all",
                     form.type === t.id ? "bg-white text-black border-white shadow-2xl" : "bg-white/5 border-white/5 opacity-40 hover:opacity-100"
                   )}
                 >
                    <t.icon size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                 </button>
              ))}
           </div>
        </div>
     </div>

     <div className="pt-8 flex items-center justify-between border-t border-white/5">
        <button onClick={onCancel} className="text-xs font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all underline underline-offset-8">Cancel Creation</button>
        <button 
          disabled={!form.name}
          onClick={onNext}
          className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
        >
          Visual Identity <ChevronRight size={18} />
        </button>
     </div>
  </motion.div>
);

// 4. Create Page - Step 2: Select Aesthetic (Screen 3)
const StepSelectAesthetic = ({ form, onChange, onNext, onBack }: any) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-4xl mx-auto py-12">
     <div className="space-y-2 text-center">
        <h3 className="text-4xl font-black tracking-tighter italic uppercase text-center">Aesthetic DNA</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 text-center">Choose the visual frequency for this space</p>
     </div>

     <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {['Noir', 'Minimal', 'Cyberpunk', 'Vaporwave', 'Brutalist', 'Grunge'].map(a => (
           <button 
             key={a}
             onClick={() => onChange({ ...form, aesthetic: a.toLowerCase() as ThemeName })}
             className={cn(
                "relative h-48 rounded-[48px] border overflow-hidden transition-all group",
                form.aesthetic === a.toLowerCase() ? "border-white border-2 scale-105 shadow-2xl" : "border-white/5 opacity-40 hover:opacity-100"
             )}
           >
              <div className={cn(
                "absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity",
                a === 'Noir' && "bg-black",
                a === 'Minimal' && "bg-gray-100",
                a === 'Cyberpunk' && "bg-purple-900",
                a === 'Vaporwave' && "bg-pink-100",
                a === 'Brutalist' && "bg-gray-400",
                a === 'Grunge' && "bg-amber-900"
              )} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs font-black uppercase tracking-[0.5em]">{a}</span>
              </div>
              {form.aesthetic === a.toLowerCase() && (
                <div className="absolute top-6 right-6">
                   <CheckCircle2 size={24} className="text-white" />
                </div>
              )}
           </button>
        ))}
     </div>

     <div className="pt-8 flex items-center justify-between border-t border-white/5">
        <button onClick={onBack} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all">
           <ChevronLeft size={18} /> Basic Info
        </button>
        <button 
          onClick={onNext}
          className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 active:scale-95 transition-all"
        >
          Review & Deploy <ChevronRight size={18} />
        </button>
     </div>
  </motion.div>
);

// 5. Create Page - Step 3: Confirm (Screen 4)
const StepConfirmPage = ({ form, onConfirm, onBack, loading }: any) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12 max-w-2xl mx-auto py-12">
     <div className="text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-8">
           <Monitor size={40} className="opacity-20" />
        </div>
        <h3 className="text-4xl font-black tracking-tighter italic uppercase">Terminal Review</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">Finalize the deployment of your new identity</p>
     </div>

     <div className="p-10 rounded-[48px] bg-white/5 border border-white/5 space-y-8">
        <div className="grid grid-cols-2 gap-12">
           <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Identity Name</p>
              <p className="text-2xl font-bold tracking-tighter uppercase">{form.name}</p>
           </div>
           <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Frequency</p>
              <p className="text-2xl font-bold tracking-tighter uppercase">{form.aesthetic}</p>
           </div>
           <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Deployment Module</p>
              <p className="text-2xl font-bold tracking-tighter uppercase">{form.type}</p>
           </div>
           <div>
              <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Endpoint Slug</p>
              <p className="text-sm font-mono opacity-40">/dashboard/{form.slug}</p>
           </div>
        </div>
        
        <div className="pt-8 border-t border-white/5">
           <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-4 text-center">Protocol Acceptance</p>
           <p className="text-xs text-center text-white/20 italic">By deploying this identity, you agree to the Artsy Aesthetic Protocols and Vanguard Guidelines.</p>
        </div>
     </div>

     <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all">
           <ChevronLeft size={18} /> Visual Identity
        </button>
        <button 
          disabled={loading}
          onClick={onConfirm}
          className="h-20 px-16 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-6 hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] disabled:opacity-20"
        >
          {loading ? 'Deploying Identitiy...' : 'Initialize Deployment'} <Sparkles size={18} />
        </button>
     </div>
  </motion.div>
);

// 6. Page Manager Hub (Screen 5 & 9)
const PageManager = ({ page, items, onAddItem, onEditItem, onDeleteItem, loading }: any) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
     {/* Page Header Area */}
     <div className="flex items-center justify-between p-12 bg-white/5 border border-white/5 rounded-[50px] relative overflow-hidden">
        <div className="flex items-center gap-10">
           <div className="w-24 h-24 rounded-[32px] overflow-hidden border border-white/10">
              <img src={page.coverImage} className="w-full h-full object-cover" alt="" />
           </div>
           <div>
              <div className="flex items-center gap-4 mb-2">
                 <h2 className="text-4xl font-black tracking-tighter italic uppercase">{page.name}</h2>
                 <span className="px-5 py-1.5 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-[0.2em]">{page.aesthetic}</span>
              </div>
              <div className="flex items-center gap-6 opacity-40">
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Globe size={14} /> artsy.com/{page.slug}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <Tag size={14} /> {items.length} Items
                 </div>
              </div>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
              <Settings size={20} className="opacity-40" />
           </button>
           <button 
             onClick={onAddItem}
             className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
           >
              <Plus size={18} /> Add Item
           </button>
        </div>
     </div>

     {/* Content Area */}
     {loading ? (
       <div className="h-96 flex flex-col items-center justify-center opacity-20">
          <Loader2 className="animate-spin mb-6" size={40} />
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing Archive...</p>
       </div>
     ) : items.length === 0 ? (
       /* Screen 5: Empty State */
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[500px] border-2 border-dashed border-white/5 rounded-[60px] flex flex-col items-center justify-center text-center p-20 group">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
             <PlusCircle size={40} className="opacity-20 group-hover:opacity-100" />
          </div>
          <h3 className="text-3xl font-black tracking-tighter italic uppercase mb-4">Space Isolated</h3>
          <p className="max-w-md text-sm text-white/20 font-medium mb-10 leading-relaxed uppercase tracking-widest text-[10px]">Your new identity is deployed but contains no physical or digital assets. Begin the curation sequence to populate this frequency.</p>
          <button 
            onClick={onAddItem}
            className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 hover:scale-105 transition-all"
          >
             Initialize First Item <ChevronRight size={18} />
          </button>
       </motion.div>
     ) : (
       /* Screen 9: Populated Grid */
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any) => (
            <motion.div 
               key={item._id} 
               layoutId={item._id}
               className="group bg-white/5 border border-white/5 rounded-[40px] p-6 space-y-6 hover:border-white/20 transition-all"
            >
               <div className="aspect-square rounded-[30px] overflow-hidden bg-black/40">
                  <img src={item.images[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt="" />
               </div>
               <div className="px-2 space-y-4">
                  <div className="flex items-center justify-between">
                     <h4 className="text-xl font-bold tracking-tighter uppercase truncate pr-4">{item.title}</h4>
                     <p className="text-lg font-black italic tracking-tighter">₹{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <button 
                       onClick={() => onEditItem(item)}
                       className="text-[9px] font-black uppercase tracking-widest opacity-20 hover:opacity-100 transition-all"
                     >
                        Edit Details
                     </button>
                     <button 
                       onClick={() => onDeleteItem(item._id)}
                       className="p-2 text-white/10 hover:text-red-500 transition-all"
                     >
                        <Trash2 size={16} />
                     </button>
                  </div>
               </div>
            </motion.div>
          ))}
          {/* Add Small Add CTA */}
          <button 
            onClick={onAddItem}
            className="aspect-square md:aspect-auto rounded-[40px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-4 opacity-20 hover:opacity-100 hover:border-white/20 transition-all group"
          >
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Plus size={20} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest">Add Item</span>
          </button>
       </div>
     )}
  </motion.div>
);

// 7. Add Item - Step 1: Basic Info (Screen 6)
const StepAddItemBasic = ({ form, onChange, onNext, onCancel }: any) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-2xl mx-auto py-12">
     <div className="space-y-2">
        <h3 className="text-4xl font-black tracking-tighter italic uppercase">Asset Parameters</h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">Define the core specifications for your new item</p>
     </div>

     <div className="space-y-8">
        <div className="space-y-4">
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Item Title</label>
           <input 
             placeholder="e.g. Genesis Aesthetic Print #01" 
             className="w-full h-20 bg-white/5 border border-white/5 rounded-3xl px-8 font-bold tracking-tight focus:outline-none focus:border-white/20 transition-all"
             value={form.title}
             onChange={(e) => onChange({...form, title: e.target.value})}
           />
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Description</label>
           <textarea 
             placeholder="Deep narrative for this asset..." 
             className="w-full h-32 bg-white/5 border border-white/5 rounded-3xl p-8 font-medium tracking-tight focus:outline-none focus:border-white/20 transition-all resize-none"
             value={form.description}
             onChange={(e) => onChange({...form, description: e.target.value})}
           />
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Access Price (INR)</label>
           <input 
             placeholder="0.00" 
             type="number"
             className="w-full h-20 bg-white/5 border border-white/5 rounded-3xl px-8 font-bold tracking-tight focus:outline-none focus:border-white/20 transition-all"
             value={form.price}
             onChange={(e) => onChange({...form, price: e.target.value})}
           />
        </div>

        <div className="space-y-4">
           <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Tags (Comma separated)</label>
           <input 
             placeholder="winter, coat, luxury" 
             className="w-full h-20 bg-white/5 border border-white/5 rounded-3xl px-8 font-bold tracking-tight focus:outline-none focus:border-white/20 transition-all"
             value={form.tags?.join(', ')}
             onChange={(e) => onChange({...form, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)})}
           />
        </div>
     </div>

     <div className="pt-8 flex items-center justify-between border-t border-white/5">
        <button onClick={onCancel} className="text-xs font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all underline underline-offset-8">Abort Sequence</button>
        <button 
          disabled={!form.title}
          onClick={onNext}
          className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-all disabled:opacity-20"
        >
          Media Upload <ChevronRight size={18} />
        </button>
     </div>
  </motion.div>
);

// 8. Add Item - Step 2: Media (Screen 7)
const StepAddItemMedia = ({ form, onChange, onNext, onBack }: any) => {
  const [url, setUrl] = useState('');
  
  const addImage = () => {
    if (url) {
      onChange({ ...form, images: [...form.images, url] });
      setUrl('');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-4xl mx-auto py-12">
       <div className="space-y-2 text-center">
          <h3 className="text-4xl font-black tracking-tighter italic uppercase text-center">Visual Induction</h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 text-center">Incorporate high-depth captures for your asset</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="aspect-square rounded-[60px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center group hover:border-white/20 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                   <ImageIcon size={28} className="opacity-20 group-hover:opacity-100 transition-all" />
                </div>
                <p className="font-bold tracking-tight text-white/40 uppercase text-[10px] tracking-widest">Awaiting Direct Upload Module</p>
                <div className="mt-8 w-full space-y-4">
                   <input 
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     placeholder="Paste Image URL for now..."
                     className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-xs text-center focus:outline-none focus:border-white/20"
                   />
                   <button onClick={addImage} className="h-12 px-8 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Add URL</button>
                </div>
             </div>

             {/* Social Connectivity */}
             <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">Social Connectivity</h4>
                <div className="space-y-4">
                   {[
                     { key: 'instagram', label: 'Instagram' },
                     { key: 'youtube', label: 'YouTube' },
                     { key: 'website', label: 'Website' }
                   ].map((s: any) => (
                      <div key={s.key} className="flex flex-col gap-2">
                         <label className="text-[9px] font-bold uppercase tracking-widest opacity-20 ml-2">{s.label} Link</label>
                         <input 
                           value={(form.externalLinks as any)[s.key]}
                           onChange={(e) => onChange({ ...form, externalLinks: { ...form.externalLinks, [s.key]: e.target.value } })}
                           placeholder={`https://${s.key}.com/...`}
                           className="w-full h-12 bg-white/5 border border-white/5 rounded-2xl px-6 text-[10px] focus:outline-none focus:border-white/20"
                         />
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {form.images.map((img: string, i: number) => (
               <div key={i} className="relative aspect-square rounded-[32px] overflow-hidden group">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                  <button 
                    onClick={() => onChange({ ...form, images: form.images.filter((_: any, idx: number) => idx !== i) })}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                     <X size={14} />
                  </button>
               </div>
             ))}
             {form.images.length === 0 && (
               <div className="aspect-square rounded-[32px] bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-10">No Visuals Cached</span>
               </div>
             )}
          </div>
       </div>

       <div className="pt-8 flex items-center justify-between border-t border-white/5">
          <button onClick={onBack} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all">
             <ChevronLeft size={18} /> Asset Parameters
          </button>
          <button 
            disabled={form.images.length === 0}
            onClick={onNext}
            className="h-16 px-12 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:scale-105 transition-all disabled:opacity-20"
          >
            Attributes & Logic <ChevronRight size={18} />
          </button>
       </div>
    </motion.div>
  );
};

// 9. Add Item - Step 3: Attributes (Screen 8)
const StepAddItemAttributes = ({ form, onChange, onPublish, onBack, loading }: any) => {
  const [newKey, setNewKey] = useState('');

  const addAttr = () => {
    if (newKey) {
      onChange({ ...form, attributes: { ...form.attributes, [newKey]: '' } });
      setNewKey('');
    }
  };

  const removeAttr = (key: string) => {
    const newAttrs = { ...form.attributes };
    delete newAttrs[key];
    onChange({ ...form, attributes: newAttrs });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 max-w-4xl mx-auto py-12">
       <div className="space-y-2 text-center">
          <h3 className="text-4xl font-black tracking-tighter italic uppercase">Structural Detail</h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 text-center">Define high-fidelity metadata for clinical precision</p>
       </div>

       <div className="p-12 rounded-[60px] bg-white/5 border border-white/5 space-y-12">
          <div className="flex items-center justify-between">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">Dynamic Schema</h4>
             <div className="flex items-center gap-2">
                <input 
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder="Field Key (e.g. Material)"
                  className="bg-white/5 border border-white/5 rounded-xl px-4 h-10 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-white/20 transition-all"
                />
                <button 
                  onClick={addAttr}
                  className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all"
                >
                   <Plus size={18} />
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {Object.entries(form.attributes).map(([key, value]: any) => (
                <div key={key} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-6 group">
                   <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">{key}</p>
                      <input 
                        value={value}
                        onChange={(e) => onChange({...form, attributes: { ...form.attributes, [key]: e.target.value }})}
                        className="w-full bg-transparent font-bold tracking-tight text-lg focus:outline-none"
                        placeholder="..."
                      />
                   </div>
                   <button onClick={() => removeAttr(key)} className="opacity-0 group-hover:opacity-100 p-2 text-white/10 hover:text-red-500 transition-all">
                      <Trash2 size={16} />
                   </button>
                </div>
             ))}
             {Object.keys(form.attributes).length === 0 && (
               <div className="col-span-full py-12 text-center border border-dashed border-white/5 rounded-3xl opacity-20">
                  <p className="text-[10px] font-black uppercase tracking-widest">No Attributes Defined</p>
               </div>
             )}
          </div>
       </div>

       <div className="pt-8 flex items-center justify-between border-t border-white/5">
          <button onClick={onBack} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all">
             <ChevronLeft size={18} /> Visual Induction
          </button>
          <button 
            disabled={loading}
            onClick={onPublish}
            className="h-20 px-16 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-6 hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            {loading ? 'Publishing Asset...' : 'Authorize Publication'} <CheckCircle2 size={18} />
          </button>
       </div>
    </motion.div>
  );
};

// 10. Item Edit Detail (Screen 10)
const ItemEditor = ({ item, onSave, onCancel, loading }: any) => {
  const [form, setForm] = useState(item);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl p-20 flex items-center justify-center">
       <div className="w-full max-w-6xl bg-white/5 border border-white/10 rounded-[64px] overflow-hidden shadow-2xl flex flex-col h-[80vh]">
          {/* Header */}
          <div className="p-10 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-xl">
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black">
                   <Settings size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter italic uppercase leading-none">Modify Asset</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 mt-1">ID: {item._id}</p>
                </div>
             </div>
             <button onClick={onCancel} className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                <X size={20} />
             </button>
          </div>

          {/* Scrolling Content - Two Pane */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden grid grid-cols-2">
             {/* Left Pane: Preview/Media */}
             <div className="p-12 border-r border-white/5 space-y-8 bg-black/20">
                <div className="aspect-square rounded-[48px] overflow-hidden bg-black shadow-2xl">
                   <img src={form.images[0]} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                   {form.images.map((img: string, i: number) => (
                     <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-white transition-all cursor-pointer" onClick={() => setForm({...form, images: [img, ...form.images.filter((_: any, idx: number) => idx !== i)]})}>
                        <img src={img} className="w-full h-full object-cover" alt="" />
                     </div>
                   ))}
                </div>
             </div>

             {/* Right Pane: Forms */}
             <div className="p-12 space-y-12 text-white">
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Title</label>
                      <input 
                         value={form.title} 
                         onChange={(e) => setForm({...form, title: e.target.value})}
                         className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold tracking-tight text-xl focus:outline-none focus:border-white/40"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Price (INR)</label>
                      <input 
                         type="number"
                         value={form.price} 
                         onChange={(e) => setForm({...form, price: e.target.value})}
                         className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 font-bold tracking-tight text-xl focus:outline-none focus:border-white/40"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Description</label>
                      <textarea 
                         value={form.description} 
                         onChange={(e) => setForm({...form, description: e.target.value})}
                         className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 font-medium focus:outline-none focus:border-white/40 resize-none"
                      />
                   </div>
                </div>

                {/* Relational Layer */}
                <div className="space-y-8 pt-8 border-t border-white/10">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Tags (CSV)</label>
                      <input 
                         value={form.tags?.join(', ')} 
                         onChange={(e) => setForm({...form, tags: e.target.value.split(',').map((t: any) => t.trim()).filter((t: any) => t)})}
                         className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-6 font-bold focus:outline-none focus:border-white/40"
                      />
                   </div>
                   
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest opacity-20">Social Connectivity</h4>
                      {['instagram', 'youtube', 'website'].map(s => (
                         <div key={s} className="space-y-2">
                            <label className="text-[9px] font-bold uppercase tracking-widest opacity-10 ml-2">{s}</label>
                            <input 
                               value={form.externalLinks?.[s] || ''} 
                               onChange={(e) => setForm({...form, externalLinks: { ...form.externalLinks, [s]: e.target.value }})}
                               className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-6 text-xs focus:outline-none focus:border-white/20"
                            />
                         </div>
                      ))}
                   </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                   <h4 className="text-[10px] font-black uppercase tracking-widest opacity-20 mb-6">Attributes</h4>
                   <div className="space-y-3">
                      {Object.entries(form.attributes || {}).map(([key, value]: any) => (
                         <div key={key} className="flex gap-4">
                            <div className="flex-1 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center px-4 text-[10px] font-black italic uppercase opacity-40">{key}</div>
                            <input 
                               value={value} 
                               onChange={(e) => setForm({...form, attributes: { ...form.attributes, [key]: e.target.value }})}
                               className="flex-[2] h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-white/20"
                            />
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Footer */}
          <div className="p-10 border-t border-white/10 bg-white/5 backdrop-blur-xl flex justify-between items-center">
             <button className="text-xs font-black uppercase tracking-widest text-red-500 opacity-40 hover:opacity-100 transition-all">Permanently Eradicate Asset</button>
             <button 
               onClick={() => onSave(form)}
               disabled={loading}
               className="h-16 px-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-4 hover:scale-105 transition-all shadow-xl disabled:opacity-20"
             >
                {loading ? 'Committing...' : 'Commit Changes'} <Save size={18} />
             </button>
          </div>
       </div>
    </motion.div>
  );
};

// --- Main Engine ---
export default function CreationConsole() {
  const router = useRouter();
  const [view, setView] = useState<WorkflowView>('DASHBOARD');
  const [step, setStep] = useState(1);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Form States
  const [pageForm, setPageForm] = useState({
    name: '',
    slug: '',
    type: 'gallery',
    aesthetic: 'minimal' as ThemeName,
    description: ''
  });

  const [itemForm, setItemForm] = useState({
    title: '',
    description: '',
    price: '',
    images: [] as string[],
    attributes: {} as any,
    externalLinks: {
       instagram: '',
       youtube: '',
       website: ''
    },
    tags: [] as string[]
  });

  // Effects
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/creator/page');
      const data = await res.json();
      if (data.success) setPages(data.pages);
    } catch (err) { console.error(err); }
  };

  const fetchItems = async (pageId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/creator/item?pageId=${pageId}`);
      const data = await res.json();
      if (data.success) setItems(data.items);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleCreatePage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/creator/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageForm)
      });
      const data = await res.json();
      if (data.success) {
        handlePageCreated(data.page);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishItem = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/creator/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...itemForm, pageId: activePage._id })
      });
      const data = await res.json();
      if (data.success) {
        fetchItems(activePage._id);
        setView('MANAGE_PAGE');
        setItemForm({ 
          title: '', 
          description: '', 
          price: '', 
          images: [], 
          attributes: {}, 
          externalLinks: { instagram: '', youtube: '', website: '' },
          tags: []
        });
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleUpdateItem = async (updatedItem: any) => {
     setLoading(true);
     try {
       const res = await fetch(`/api/creator/item/${updatedItem._id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(updatedItem)
       });
       if (res.ok) {
         fetchItems(activePage._id);
         setView('MANAGE_PAGE');
         setSelectedItem(null);
       }
     } catch (err) { console.error(err); }
     finally { setLoading(false); }
  };

  const handleDeleteItem = async (itemId: string) => {
     if (!confirm('Are you sure you want to delete this item?')) return;
     try {
        const res = await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
        if (res.ok) fetchItems(activePage._id);
     } catch (err) { console.error(err); }
  };

  // Handlers
  const handlePageCreated = (page: any) => {
    setPages((prev: any) => [...prev, page]);
    setActivePage(page);
    setItems([]);
    setView('MANAGE_PAGE');
  };

  const navigateToManage = (page: any) => {
    setActivePage(page);
    setItems([]);
    fetchItems(page._id);
    setView('MANAGE_PAGE');
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-16 pb-40">
       {/* Global Console Header */}
       <div className="flex items-center justify-between p-12 bg-white/5 border border-white/5 rounded-[60px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-8 relative z-10">
             <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-black shadow-2xl">
                <Command size={32} />
             </div>
             <div>
                <div className="flex items-center gap-4 mb-1">
                   {view !== 'DASHBOARD' && (
                     <button 
                       onClick={() => setView('DASHBOARD')}
                       className="p-2 hover:bg-white/10 rounded-xl transition-all"
                     >
                        <ChevronLeft size={16} />
                     </button>
                   )}
                   <h2 className="text-5xl font-black tracking-tighter italic uppercase leading-none">Console</h2>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20 ml-2">Aesthetic Operations Center</p>
             </div>
          </div>

          <div className="flex items-center gap-12">
             <div className="text-right hidden xl:block">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-20">Active Identites</p>
                <p className="text-2xl font-bold tracking-tighter">{pages.length} PAGES</p>
             </div>
             <WorkflowProgress 
               current={view === 'DASHBOARD' ? 0 : step} 
               total={view === 'MANAGE_PAGE' ? 0 : 3} 
               label={view === 'ADD_ITEM' ? "Inventory Sequence" : "Deployment Status"} 
             />
          </div>
       </div>

       <AnimatePresence mode="wait">
          {view === 'DASHBOARD' && (
            <PageDashboard 
              pages={pages} 
              onCreatePage={() => { setStep(1); setView('CREATE_PAGE'); }} 
              onManagePage={navigateToManage} 
            />
          )}

          {view === 'CREATE_PAGE' && (
            <div key="create-page">
               {step === 1 && (
                 <StepCreatePageBasic 
                   form={pageForm} 
                   onChange={setPageForm} 
                   onNext={() => setStep(2)} 
                   onCancel={() => setView('DASHBOARD')} 
                 />
               )}
               {step === 2 && (
                 <StepSelectAesthetic 
                   form={pageForm} 
                   onChange={setPageForm} 
                   onNext={() => setStep(3)} 
                   onBack={() => setStep(1)} 
                 />
               )}
               {step === 3 && (
                 <StepConfirmPage 
                   form={pageForm} 
                   onConfirm={handleCreatePage} 
                   onBack={() => setStep(2)} 
                   loading={loading}
                 />
               )}
            </div>
          )}

          {view === 'MANAGE_PAGE' && (
            <PageManager 
              page={activePage} 
              items={items} 
              onAddItem={() => { setStep(1); setView('ADD_ITEM'); }} 
              onEditItem={(item: any) => { setSelectedItem(item); setView('EDIT_ITEM'); }}
              onDeleteItem={handleDeleteItem}
              loading={loading}
            />
          )}

          {view === 'ADD_ITEM' && (
            <div key="add-item">
               {step === 1 && (
                 <StepAddItemBasic 
                   form={itemForm} 
                   onChange={setItemForm} 
                   onNext={() => setStep(2)} 
                   onCancel={() => setView('MANAGE_PAGE')} 
                 />
               )}
               {step === 2 && (
                 <StepAddItemMedia 
                   form={itemForm} 
                   onChange={setItemForm} 
                   onNext={() => setStep(3)} 
                   onBack={() => setStep(1)} 
                 />
               )}
               {step === 3 && (
                 <StepAddItemAttributes 
                   form={itemForm} 
                   onChange={setItemForm} 
                   onPublish={handlePublishItem} 
                   onBack={() => setStep(2)} 
                   loading={loading}
                 />
               )}
            </div>
          )}

          {view === 'EDIT_ITEM' && selectedItem && (
            <ItemEditor 
              item={selectedItem} 
              onSave={handleUpdateItem} 
              onCancel={() => setView('MANAGE_PAGE')} 
              loading={loading}
            />
          )}
       </AnimatePresence>
    </div>
  );
}
