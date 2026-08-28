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
        <h2 className="text-3xl font-bold text-text tracking-tighter mb-2">Visual Identity</h2>
        <p className="text-text-muted text-sm">Choose the global aesthetic for your storefront and dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themeList.map(([name, theme]) => (
          <button
            key={name}
            onClick={() => setAesthetic(name)}
            className={cn(
              "group relative overflow-hidden rounded-[32px] border-2 transition-all text-left p-8",
              aesthetic === name
                ? "border-accent bg-accent-soft"
                : "border-line bg-card hover:border-line-strong"
            )}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-text capitalize">{name}</h3>
                <p className="text-xs text-text-muted mt-1 uppercase tracking-widest font-bold">Aesthetic Model</p>
              </div>
              {aesthetic === name ? (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg">
                  <Check size={16} className="text-bg" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-line-strong transition-colors" />
              )}
            </div>

            {/* Live preview: a miniature of the aesthetic, painted with that
                theme's own tokens rather than the currently active ones. */}
            <div
              className="rounded-2xl border p-4 flex items-center gap-3"
              style={{
                backgroundColor: theme["--bg-primary"],
                borderColor: theme["--border-subtle"],
                fontFamily: theme["--font"],
              }}
            >
              <div
                className="w-10 h-10 shrink-0"
                style={{
                  backgroundColor: theme["--accent"],
                  borderRadius: theme["--radius"],
                }}
              />
              <div className="flex-1 min-w-0">
                <div
                  className="h-2 rounded-full w-3/4 mb-1.5"
                  style={{ backgroundColor: theme["--text-primary"] }}
                />
                <div
                  className="h-2 rounded-full w-1/2"
                  style={{ backgroundColor: theme["--text-muted"] }}
                />
              </div>
              <div
                className="w-14 h-7 shrink-0"
                style={{
                  backgroundColor: theme["--bg-secondary"],
                  border: `1px solid ${theme["--border-strong"]}`,
                  borderRadius: theme["--radius"],
                }}
              />
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