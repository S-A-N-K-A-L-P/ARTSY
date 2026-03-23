import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Globe, ShieldCheck, Zap } from 'lucide-react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="relative h-[600px] flex items-end p-20 bg-black text-white overflow-hidden group">
      {/* Immersive Parallax Background */}
      <div className="absolute inset-0 grayscale contrast-150 brightness-[0.3] scale-105 group-hover:scale-100 transition-transform duration-[3000ms]">
        <img 
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="" 
        />
      </div>
      
      {/* High-Depth Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />

      <div className="relative w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-end justify-between gap-12">
        <div className="flex flex-col lg:flex-row items-end gap-12">
          {/* Editorial Avatar */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-56 h-72 border border-white/10 p-4 bg-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
          >
            <img 
              src={user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400'} 
              className="w-full h-full object-cover grayscale contrast-125 hover:scale-110 transition-transform duration-700" 
              alt="" 
            />
            <div className="absolute top-2 right-2">
               <ShieldCheck size={18} className="text-amber-500 shadow-xl" />
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mb-6">
                {user?.username || 'noir'}<span className="text-amber-500">.</span>
              </h1>
              <p className="text-white/40 max-w-lg text-sm font-medium leading-relaxed tracking-tight italic">
                {user?.bio || "Curating the intersection of shadow and light. A premium aesthetic designated for the minimal elite."}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
               {[
                 { icon: Instagram, label: 'instagram' },
                 { icon: Linkedin, label: 'linkedin' },
                 { icon: Globe, label: 'portfolio' }
               ].map((social, i) => (
                 <button key={i} className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3 group/btn">
                    <social.icon size={14} className="opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{social.label}</span>
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Floating Identity Card */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden xl:block p-10 rounded-[40px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl shadow-3xl min-w-[320px]"
        >
           <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Aesthetic Tier</span>
              <Zap size={16} className="text-amber-500" />
           </div>
           <p className="text-4xl font-bold tracking-tighter italic mb-1 uppercase">Vanguard</p>
           <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">Global Elite Verified</p>
           
           <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Curation</p>
                 <p className="text-xl font-bold tracking-tight">Top 0.1%</p>
              </div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest opacity-20 mb-1">Influence</p>
                 <p className="text-xl font-bold tracking-tight">Critical</p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};