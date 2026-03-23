import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Globe, Box, Anchor, Layers, Triangle, Shield, Zap } from 'lucide-react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="relative h-[600px] bg-[#CACACA] border-b-[20px] border-black flex items-end p-20 overflow-hidden group">
      {/* Concrete Texture & Brutalist Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-40" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#DEDEDE] border-l-[10px] border-black/5" />
      <div className="absolute top-20 left-20 opacity-5">
         <Triangle size={400} strokeWidth={10} className="text-black" />
      </div>

      <div className="relative w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-end justify-between gap-16">
        <div className="flex flex-col lg:flex-row items-end gap-16">
          {/* Heavy Architectural Avatar */}
          <motion.div 
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 h-80 bg-black p-2 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative group-hover:shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] transition-all duration-500"
          >
            <div className="w-full h-full bg-white grayscale contrast-[1.8] brightness-[0.9]">
               <img 
                 src={user?.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400'} 
                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                 alt="" 
               />
            </div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-black flex items-center justify-center text-white">
               <Anchor size={24} />
            </div>
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-6 mb-6">
                 <Box size={24} className="text-black" />
                 <span className="text-xs font-black uppercase tracking-[0.5em] text-black italic">Structural Identity / ARCH-01</span>
              </div>
              <h1 className="text-[9rem] font-black uppercase tracking-tighter leading-[0.75] text-black">
                 @{user?.username || 'brutal'}
              </h1>
              <p className="text-black/60 font-black text-lg max-w-xl leading-none uppercase italic mt-8 border-l-[8px] border-black pl-8">
                 {user?.bio || "Form follows function. Logic follows intent. A raw exploration of digital architecture and structural integrity."}
              </p>
            </motion.div>

            <div className="flex gap-4">
               {[
                 { icon: Instagram, label: 'IG-01' },
                 { icon: Linkedin, label: 'LI-02' },
                 { icon: Globe, label: 'WEB-03' }
               ].map((social, i) => (
                 <button key={i} className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black hover:ring-4 hover:ring-black transition-all flex items-center gap-4">
                    <social.icon size={16} />
                    <span>{social.label}</span>
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Structural Detail Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden xl:grid grid-cols-2 gap-4 min-w-[360px]"
        >
           {[
             { label: 'Integrity', value: 'NOMINAL', icon: Shield },
             { label: 'Density', value: 'CRITICAL', icon: Layers },
             { label: 'Volume', value: 'HIGH', icon: Box },
             { label: 'Status', value: 'ACTIVE', icon: Zap }
           ].map((item, i) => (
             <div key={i} className="bg-black text-white p-8 flex flex-col justify-between h-40">
                <item.icon size={20} className="mb-4 opacity-50" />
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{item.label}</p>
                   <p className="text-xl font-black uppercase">{item.value}</p>
                </div>
             </div>
           ))}
        </motion.div>
      </div>
    </div>
  );
};