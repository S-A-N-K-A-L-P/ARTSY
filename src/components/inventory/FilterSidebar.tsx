'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Filter, X, ChevronDown, Check } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  status: string;
  onStatusChange: (status: string) => void;
}

export function FilterSidebar({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceChange,
  status,
  onStatusChange
}: FilterSidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 space-y-10 pr-8 border-r border-neutral-100 hidden md:block">
      {/* Category Filter */}
      <FilterSection title="Manifest Category">
        <div className="flex flex-col gap-2">
            {['All', ...categories].map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        selectedCategory === cat 
                            ? "bg-neutral-900 text-white shadow-xl" 
                            : "bg-transparent text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
                    )}
                >
                    {cat}
                    {selectedCategory === cat && <Check size={10} />}
                </button>
            ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Valuation Range">
        <div className="space-y-4">
            <PriceOption label="All Tiers" active={priceRange[1] === Infinity} onClick={() => onPriceChange([0, Infinity])} />
            <PriceOption label="₹0 — ₹500" active={priceRange[1] === 500} onClick={() => onPriceChange([0, 500])} />
            <PriceOption label="₹500 — ₹2,000" active={priceRange[0] === 500 && priceRange[1] === 2000} onClick={() => onPriceChange([500, 2000])} />
            <PriceOption label="₹2,000+" active={priceRange[0] === 2000} onClick={() => onPriceChange([2000, Infinity])} />
        </div>
      </FilterSection>

      {/* Status Filter */}
      <FilterSection title="Sync Integrity">
        <div className="flex flex-col gap-2">
            <StatusOption label="Synced Live" active={status === 'synced'} onClick={() => onStatusChange('synced')} />
            <StatusOption label="Offline Buffer" active={status === 'offline'} onClick={() => onStatusChange('offline')} />
        </div>
      </FilterSection>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 px-1">{title}</h3>
      {children}
    </div>
  );
}

function PriceOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button 
        onClick={onClick}
        className={cn(
            "w-full px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest text-left transition-all",
            active ? "bg-neutral-50 border-neutral-900 text-neutral-900" : "bg-transparent border-neutral-100 text-neutral-400 hover:border-neutral-300"
        )}
    >
        {label}
    </button>
  );
}

function StatusOption({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
      <button 
          onClick={onClick}
          className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest text-left transition-all",
              active ? "bg-neutral-50 border-neutral-900 text-neutral-900 shadow-sm" : "bg-transparent border-transparent text-neutral-400 hover:bg-neutral-50"
          )}
      >
          <div className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-emerald-500" : "bg-neutral-200")} />
          {label}
      </button>
    );
  }
