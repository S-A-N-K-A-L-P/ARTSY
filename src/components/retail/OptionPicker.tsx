'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface OptionPickerProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
  type?: 'button' | 'color'; // button for size/type, color for swatches
}

export const OptionPicker = ({ label, options, selected, onChange, type = 'button' }: OptionPickerProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{label}</span>
        <span className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest">{selected}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "transition-all active:scale-95",
              type === 'button' ? (
                cn(
                  "px-6 h-12 rounded-xl text-[11px] font-bold uppercase tracking-widest border",
                  selected === opt 
                    ? "bg-neutral-900 border-neutral-900 text-white shadow-xl shadow-black/10" 
                    : "bg-white border-neutral-100 text-neutral-400 hover:border-neutral-900 hover:text-neutral-900"
                )
              ) : (
                cn(
                  "w-10 h-10 rounded-full border-2 p-0.5 transition-all",
                  selected === opt ? "border-neutral-900" : "border-transparent"
                )
              )
            )}
            style={type === 'color' ? { backgroundColor: opt } : {}}
          >
            {type === 'button' ? opt : (
              <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: opt }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
