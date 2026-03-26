'use client';

import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoreAnnouncementProps {
  title: string;
  message: string;
  onClose?: () => void;
}

export const StoreAnnouncement = ({ title, message, onClose }: StoreAnnouncementProps) => {
  return (
    <div className="relative p-8 rounded-3xl bg-amber-50 border border-amber-100/50 flex gap-6 overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-900 pointer-events-none">
        <Megaphone size={120} strokeWidth={1} />
      </div>

      <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center text-amber-700 shrink-0">
         <Megaphone size={20} />
      </div>

      <div className="flex-1 space-y-2 relative z-10">
         <h4 className="text-xs font-black uppercase tracking-[0.2em] text-amber-900">{title}</h4>
         <p className="text-sm font-medium text-amber-800 leading-relaxed max-w-lg">{message}</p>
      </div>

      {onClose && (
        <button onClick={onClose} className="p-2 text-amber-300 hover:text-amber-900 transition-colors shrink-0">
          <X size={20} />
        </button>
      )}
    </div>
  );
};
