'use client';

import React from 'react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import { themes, ThemeName } from '@/lib/theme/themes';
import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';

export default function AestheticSettingsPage() {
  const { aesthetic, setAesthetic } = useAesthetic();

  // Explicitly mapping themes to colors for the preview
  const themeList = Object.entries(themes) as [ThemeName, any][];

  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tighter mb-2">Visual Identity</h2>
        <p className="text-zinc-500 text-sm">Choose the global aesthetic for your storefront and dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themeList.map(([name, theme]) => (
          <button
            key={name}
            onClick={() => setAesthetic(name)}
            className={cn(
              "group relative overflow-hidden rounded-[32px] border-2 transition-all text-left p-8",
              aesthetic === name 
                ? "border-white bg-white/5" 
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
            )}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-white capitalize">{name}</h3>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-bold">Aesthetic Model</p>
              </div>
              {aesthetic === name ? (
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <Check size={16} className="text-black" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-zinc-700 group-hover:border-zinc-500 transition-colors" />
              )}
            </div>

            <div className="flex gap-2">
               <div className="w-12 h-2 rounded-full" style={{ backgroundColor: theme["--accent"] || '#fff' }} />
               <div className="w-12 h-2 rounded-full opacity-40" style={{ backgroundColor: theme["--text"] || '#fff' }} />
               <div className="w-12 h-2 rounded-full" style={{ backgroundColor: theme["--bg"] || '#000' }} />
            </div>

            {aesthetic === name && (
               <div className="absolute top-0 right-0 p-4">
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
               </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}