'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  X, 
  ChevronRight, 
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
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeName } from '@/lib/theme/themes';

// 1. DynamicFieldBuilder
export const DynamicFieldBuilder = ({ fields, onAdd, onRemove, onChange }: any) => {
  const [newKey, setNewKey] = useState('');

  const handleAdd = () => {
    if (!newKey) return;
    onAdd(newKey);
    setNewKey('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/20">Product Attributes</h3>
        <div className="flex items-center gap-2">
           <input 
             value={newKey}
             onChange={(e) => setNewKey(e.target.value)}
             placeholder="Add custom field (e.g. Material)"
             className="bg-white/5 border border-white/5 rounded-xl px-4 h-10 text-xs font-bold focus:outline-none focus:border-white/20"
           />
           <button 
             onClick={handleAdd}
             className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:scale-105 transition-all"
           >
             <Plus size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(fields).map(([key, value]: any) => (
          <div key={key} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 group">
             <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-white/20 mb-1">{key}</p>
                <input 
                  value={value}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="w-full bg-transparent font-bold tracking-tight focus:outline-none"
                  placeholder={`Value for ${key}`}
                />
             </div>
             <button onClick={() => onRemove(key)} className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all">
                <Trash2 size={14} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. CreationConsole (Main Wrapper)
export default function CreationConsole() {
  const [step, setStep] = useState(1); // 1: Page, 2: Item
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState({
    name: '',
    slug: '',
    type: 'gallery',
    aesthetic: 'minimal' as ThemeName,
    description: ''
  });

  const [itemData, setItemData] = useState({
    title: '',
    description: '',
    price: '',
    aesthetic: '' as ThemeName,
    attributes: {} as any
  });

  const addAttribute = (key: string) => {
    setItemData(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: '' }
    }));
  };

  const removeAttribute = (key: string) => {
    const newAttrs = { ...itemData.attributes };
    delete newAttrs[key];
    setItemData(prev => ({ ...prev, attributes: newAttrs }));
  };

  const updateAttribute = (key: string, value: string) => {
    setItemData(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [key]: value }
    }));
  };

  const [activePageId, setActivePageId] = useState<string | null>(null);

  const handlePublish = async () => {
    setLoading(true);
    try {
      const res = await fetch(step === 1 ? '/api/creator/page' : '/api/creator/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step === 1 ? pageData : { ...itemData, pageId: activePageId })
      });
      const data = await res.json();
      if (data.success) {
        if (step === 1) {
          setActivePageId(data.page._id);
          setStep(2);
        } else {
          alert('Published Successfully!');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-40">
       {/* Header */}
       <div className="flex items-center justify-between p-10 bg-white/5 border border-white/5 rounded-[48px]">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-black">
                <Command size={24} />
             </div>
             <div>
                <h2 className="text-3xl font-bold tracking-tighter italic">Creation Console</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-20 mt-1">Deploy New Aesthetic Identity</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
             {[1, 2].map(s => (
                <div key={s} className={cn("w-12 h-1 rounded-full transition-all", step >= s ? "bg-white" : "bg-white/10")} />
             ))}
          </div>
       </div>

       {/* Step 1: Page Setup */}
       {step === 1 && (
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 p-10">
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Space Name</label>
                  <input 
                    placeholder="e.g. Streetwear Vault" 
                    className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 font-bold tracking-tight focus:outline-none focus:border-white/20"
                    value={pageData.name}
                    onChange={(e) => setPageData({...pageData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-20 ml-2">Unique Slug</label>
                  <input 
                    placeholder="streetwear-vault" 
                    className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 font-bold font-mono text-xs opacity-60 pointer-events-none"
                    value={pageData.slug}
                    readOnly
                  />
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               {['gallery', 'store', 'portfolio'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setPageData({...pageData, type: t as any})}
                    className={cn(
                      "h-24 rounded-3xl border flex flex-col items-center justify-center gap-2 transition-all",
                      pageData.type === t ? "bg-white text-black border-white" : "bg-white/5 border-white/5 opacity-40 hover:opacity-100"
                    )}
                  >
                     {t === 'gallery' && <Box size={20} />}
                     {t === 'store' && <ShoppingBag size={20} />}
                     {t === 'portfolio' && <Layers size={20} />}
                     <span className="text-[10px] font-bold uppercase tracking-widest">{t}</span>
                  </button>
               ))}
            </div>

            <div className="pt-4">
               <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20 mb-4 ml-1">Space Aesthetic</h4>
               <div className="flex flex-wrap gap-2">
                  {['Noir', 'Minimal', 'Cyberpunk', 'Vaporwave', 'Brutalist'].map(a => (
                     <button 
                       key={a}
                       onClick={() => setPageData({ ...pageData, aesthetic: a.toLowerCase() as ThemeName })}
                       className={cn(
                          "px-6 h-10 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                          pageData.aesthetic === a.toLowerCase() ? "bg-white text-black border-white" : "bg-white/5 border-white/5 hover:border-white/20"
                       )}
                     >
                       {a}
                     </button>
                  ))}
               </div>
            </div>

            <div className="pt-8 flex justify-end">
               <button 
                 disabled={loading}
                 onClick={handlePublish}
                 className="h-16 px-10 rounded-2xl bg-white text-black font-extrabold uppercase tracking-widest text-xs flex items-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50"
               >
                 {loading ? 'Deploying...' : 'Next: Curate Content'} <ChevronRight size={18} />
               </button>
            </div>
         </motion.div>
       )}

       {/* Step 2: Item Setup */}
       {step === 2 && (
         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Left: Basics */}
               <div className="space-y-8">
                  <div className="aspect-[4/5] rounded-[48px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-10 text-center group hover:border-white/20 transition-all cursor-pointer">
                     <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                        <ImageIcon size={28} className="opacity-20 group-hover:opacity-100 transition-all" />
                     </div>
                     <p className="font-bold tracking-tight text-white/40">Drop high-depth images here</p>
                     <p className="text-[10px] uppercase font-bold tracking-widest opacity-10 mt-2">Max 10MB per visual</p>
                  </div>
               </div>

               {/* Right: Details */}
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Title</label>
                     <input 
                       value={itemData.title}
                       onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
                       placeholder="Black Wool Overcoat" 
                       className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 font-bold tracking-tighter text-xl focus:outline-none focus:border-white/20"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest opacity-20">Access Price (Optional)</label>
                     <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold italic opacity-40">INR</span>
                        <input 
                          value={itemData.price}
                          onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
                          placeholder="0.00" 
                          type="number"
                          className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 font-bold tracking-tighter text-xl focus:outline-none focus:border-white/20"
                        />
                     </div>
                  </div>
                  
                  <div className="pt-4">
                     <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-20 mb-4 ml-1">Visual Identity</h4>
                     <div className="flex flex-wrap gap-2">
                        {['Noir', 'Minimal', 'Cyberpunk', 'Vaporwave', 'Brutalist'].map(a => (
                           <button 
                             key={a}
                             onClick={() => setItemData({ ...itemData, aesthetic: a.toLowerCase() as ThemeName })}
                             className={cn(
                                "px-6 h-10 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all",
                                itemData.aesthetic === a.toLowerCase() ? "bg-white text-black border-white" : "bg-white/5 border-white/5 hover:border-white/20"
                             )}
                           >
                             {a}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <DynamicFieldBuilder 
               fields={itemData.attributes}
               onAdd={addAttribute}
               onRemove={removeAttribute}
               onChange={updateAttribute}
            />

            <div className="pt-12 border-t border-white/5 flex items-center justify-between">
               <button onClick={() => setStep(1)} className="text-xs font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all">Back to Space Setup</button>
               <button 
                 disabled={loading}
                 onClick={handlePublish}
                 className="h-16 px-12 rounded-2xl bg-white text-black font-extrabold uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl shadow-white/10 active:scale-[0.98] transition-all disabled:opacity-50"
               >
                  {loading ? 'Publishing...' : 'Sign & Publish'} <Save size={18} />
               </button>
            </div>
         </motion.div>
       )}
    </div>
  );
}
