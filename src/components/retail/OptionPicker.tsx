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
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">{label}</span>
        <span className="text-[10px] font-black text-text uppercase tracking-[0.2em]">{selected}</span>
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
                    ? "bg-accent border-accent text-bg shadow-xl shadow-black/10" 
                    : "bg-card border-line text-text-muted hover:border-accent hover:text-text"
                )
              ) : (
                cn(
                  "w-12 h-12 rounded-full border-2 p-1 transition-all",
                  selected === opt ? "border-accent" : "border-transparent"
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
