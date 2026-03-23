'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Globe, Terminal, Activity, ShieldCheck, Cpu } from 'lucide-react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="relative h-[550px] bg-[#0A0A0F] text-[#00F5D4] overflow-hidden flex items-end p-20 border-b border-[#00F5D4]/10 group">
      {/* Neon Digital Grid */}
      <div className="absolute inset-0 opacity-20" style={{ 
        backgroundImage: 'linear-gradient(#00F5D4 1px, transparent 1px), linear-gradient(90deg, #00F5D4 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
        transformOrigin: 'top'
      }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.1),transparent)]" />
      
      {/* Glitch CRT Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00F5D4 2px, #00F5D4 4px)' }} />

      <div className="relative w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-end justify-between gap-12">
        <div className="flex flex-col lg:flex-row items-end gap-12">
          {/* Glitch Avatar */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-56 h-56 border-2 border-[#00F5D4] p-2 bg-[#0A0A0F] shadow-[0_0_50px_rgba(0,245,212,0.2)]"
          >
            <div className="absolute -top-4 -left-4 px-3 py-1 bg-[#00F5D4] text-[#0A0A0F] text-[10px] font-black uppercase tracking-widest">
              Live_Node
            </div>
            <img 
              src={user?.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400'} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              alt="" 
            />
            <div className="absolute inset-0 border border-[#00F5D4]/40 animate-pulse" />
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                 <Terminal size={14} className="text-purple-500" />
                 <span className="text-[10px] font-mono tracking-[0.5em] opacity-50">CREATOR_ID_VERIFIED</span>
              </div>
              <h1 className="text-8xl font-black tracking-tighter uppercase font-mono leading-none flex items-center gap-4">
                 @{user?.username || 'cyber'}<span className="w-8 h-16 bg-[#00F5D4] animate-pulse" />
              </h1>
              <p className="text-[#00F5D4]/60 font-mono text-sm max-w-lg leading-relaxed mt-4">
                 SYSTEM_INPUT: {user?.bio || "Architecting digital realities in the neon haze. Redefining the human-interface connection one space at a time."}
              </p>
            </motion.div>

            <div className="flex gap-3">
               {[Instagram, Linkedin, Globe].map((Icon, i) => (
                 <button key={i} className="px-6 py-2 border border-[#00F5D4]/20 bg-[#0A0A0F] hover:bg-[#00F5D4]/10 transition-all flex items-center gap-3 group/btn shadow-[0_0_15px_rgba(0,245,212,0.05)]">
                    <Icon size={14} className="opacity-40 group-hover/btn:opacity-100" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{Icon.name === 'Instagram' ? 'insta' : Icon.name === 'Linkedin' ? 'link' : 'web'}</span>
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Status Dashboard Detail */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden xl:block min-w-[300px] border border-[#00F5D4]/20 p-8 bg-[#0A0A0F] space-y-8"
        >
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest opacity-40">SYSTEM_METRICS</span>
              <Activity size={16} className="text-purple-500 animate-pulse" />
           </div>
           
           <div className="space-y-6">
              {[
                { label: 'Uplink', value: '4.8 GB/s', color: 'text-[#00F5D4]' },
                { label: 'Latency', value: '2ms', color: 'text-purple-400' },
                { label: 'Sync', value: 'STABLE', color: 'text-emerald-400' }
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-end border-b border-[#00F5D4]/5 pb-2">
                   <span className="text-[9px] font-mono opacity-30">{m.label}</span>
                   <span className={`text-sm font-mono font-bold ${m.color}`}>{m.value}</span>
                </div>
              ))}
           </div>

           <div className="pt-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
              <span className="text-[10px] font-mono font-bold">NODE_ACTIVE</span>
           </div>
        </motion.div>
      </div>
    </div>
  );
};
