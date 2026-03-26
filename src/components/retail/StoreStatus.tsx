'use client';

import React from 'react';
import { Clock, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoreStatusProps {
  isOpen: boolean;
  message?: string;
  className?: string;
}

export const StoreStatus = ({ isOpen, message, className }: StoreStatusProps) => {
  return (
    <div className={cn("inline-flex items-center gap-3 px-4 py-2 rounded-full border border-neutral-100 bg-white shadow-sm", className)}>
      {isOpen ? (
        <Sun size={14} className="text-amber-500" />
      ) : (
        <Moon size={14} className="text-neutral-300" />
      )}
      <div className="flex flex-col">
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-widest",
          isOpen ? "text-emerald-500" : "text-neutral-400"
        )}>
          {isOpen ? "Currently Manifesting" : "Resting State"}
        </span>
        {message && (
          <span className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest">{message}</span>
        )}
      </div>
    </div>
  );
};
