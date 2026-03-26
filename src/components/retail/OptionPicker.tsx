'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface OptionPickerProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
  type?: 'button' | 'color'; // button for size/type, color for swatches
}

export const OptionPicker = ({ label, options, selected, onChange, type = 'button' }: OptionPickerProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">{label}</span>
        <span className="text-[10px] font-black text-neutral-900 uppercase tracking-[0.2em]">{selected}</span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <motion.button
            key={opt}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(opt)}
            className={cn(
              "transition-all",
              type === 'button' ? (
                cn(
                  "px-8 h-12 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border",
                  selected === opt 
                    ? "bg-neutral-900 border-neutral-900 text-white shadow-xl shadow-black/10" 
                    : "bg-white border-neutral-100 text-neutral-400 hover:border-neutral-900 hover:text-neutral-900"
                )
              ) : (
                cn(
                  "w-12 h-12 rounded-full border-2 p-1 transition-all",
                  selected === opt ? "border-neutral-900" : "border-transparent"
                )
              )
            )}
            style={type === 'color' ? { backgroundColor: opt } : {}}
          >
            {type === 'button' ? opt : (
              <div className="w-full h-full rounded-full border border-black/5 shadow-inner" style={{ backgroundColor: opt }} />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
