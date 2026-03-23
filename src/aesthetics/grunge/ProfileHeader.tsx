'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Globe, Hash, Zap, Shield } from 'lucide-react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="relative h-[550px] bg-[#1a1a1a] text-[#d1d1d1] overflow-hidden flex items-end p-20 border-b-8 border-[#2a2a2a] group">
      {/* Analog Noise & Texture Background */}
      <div className="absolute inset-0 grayscale contrast-125 brightness-[0.4] opacity-40 group-hover:scale-105 transition-transform duration-[5000ms]">
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="" 
        />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-1 bg-[#4A5D4E]/20" />

      <div className="relative w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-end justify-between gap-12">
        <div className="flex flex-col lg:flex-row items-end gap-12">
          {/* Rough-Cut Avatar */}
          <motion.div 
            initial={{ rotate: -2, opacity: 0 }}
            animate={{ rotate: 1, opacity: 1 }}
            className="w-56 h-56 border-4 border-[#2a2a2a] p-1 bg-[#1a1a1a] shadow-2xl relative"
          >
            <div className="absolute -top-6 -left-2 px-4 py-2 bg-[#4A5D4E] text-white text-[10px] font-black uppercase tracking-[0.2em] -rotate-3">
               RAW_SOURCE
            </div>
            <div className="w-full h-full overflow-hidden grayscale contrast-150">
               <img 
                 src={user?.image || 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400'} 
                 className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                 alt="" 
               />
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                 <Hash size={16} className="text-[#4A5D4E]" />
                 <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40 italic">Aesthetic / Grunge Elite</span>
              </div>
              <h1 className="text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-6">
                 @{user?.username || 'grunge'}<span className="text-[#4A5D4E]">_</span>
              </h1>
              <p className="text-[#d1d1d1]/40 font-mono text-sm max-w-lg leading-relaxed italic">
                 {user?.bio || "Finding beauty in the broken and truth in the textured. A raw perspective on digital curation and analog soul."}
              </p>
            </motion.div>

            <div className="flex gap-4">
               {[Instagram, Linkedin, Globe].map((Icon, i) => (
                 <button key={i} className="px-6 py-3 rounded-none border-2 border-[#2a2a2a] bg-transparent hover:bg-[#2a2a2a] hover:text-white transition-all flex items-center gap-4 group/btn">
                    <Icon size={14} className="opacity-40 group-hover/btn:opacity-100" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest">{Icon.name === 'Instagram' ? 'gram' : Icon.name === 'Linkedin' ? 'link' : 'web'}</span>
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Textured Status Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden xl:block min-w-[320px] border-4 border-[#2a2a2a] p-10 bg-[#0a0a0a]/80 backdrop-blur-md relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-2 opacity-5">
              <Zap size={100} />
           </div>
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2a2a]">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Status Report</span>
              <Shield size={16} className="text-[#4A5D4E]" />
           </div>
           
           <div className="space-y-6">
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-2">Stability</p>
                 <div className="w-full h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-[#4A5D4E] animate-pulse" />
                 </div>
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-2">Authenticity</p>
                 <p className="text-2xl font-black italic tracking-tighter">CERTIFIED_RAW</p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};
