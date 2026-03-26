'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface BrandStorySectionProps {
  title: string;
  story: string;
  image?: string;
}

export const BrandStorySection = ({ title, story, image }: BrandStorySectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row gap-20 items-center py-32 px-10 border-y border-neutral-100 bg-white"
    >
      {image && (
        <motion.div 
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 aspect-[4/5] rounded-[40px] overflow-hidden border border-neutral-100 shadow-[0_50px_100px_rgba(0,0,0,0.1)]"
        >
          <img src={image} className="w-full h-full object-cover scale-110" />
        </motion.div>
      )}
      
      <div className="w-full md:w-1/2 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 text-neutral-100"
        >
           <Quote size={64} strokeWidth={1} />
        </motion.div>
        
        <div className="space-y-6">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black tracking-tighter text-neutral-900 leading-[0.85] italic"
          >
            {title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-400 leading-relaxed font-medium max-w-lg"
          >
            {story}
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-10 border-t border-neutral-50"
        >
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-200">Astal Archives • 2026 • Manifest Zero</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
