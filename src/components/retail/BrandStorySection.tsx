'use client';

import React from 'react';
import { Quote } from 'lucide-react';

interface BrandStorySectionProps {
  title: string;
  story: string;
  image?: string;
}

export const BrandStorySection = ({ title, story, image }: BrandStorySectionProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-16 items-center py-24 border-y border-neutral-50 bg-white">
      {image && (
        <div className="w-full md:w-1/2 aspect-square rounded-[40px] overflow-hidden border border-neutral-100 shadow-2xl">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="w-full md:w-1/2 space-y-8 px-10">
        <div className="flex items-center gap-4 text-neutral-200">
           <Quote size={48} strokeWidth={1} />
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-black tracking-tighter text-neutral-900 leading-tight italic">{title}</h3>
          <p className="text-lg text-neutral-500 leading-relaxed font-medium">
            {story}
          </p>
        </div>
        
        <div className="pt-8 border-t border-neutral-50">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">Astal Archives • 2026</p>
        </div>
      </div>
    </div>
  );
};
