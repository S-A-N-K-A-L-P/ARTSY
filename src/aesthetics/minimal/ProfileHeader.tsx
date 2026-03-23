import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Globe, ShieldCheck } from 'lucide-react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="relative pt-32 pb-24 px-12 md:px-24 bg-white text-black overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.02),transparent)]">
      {/* Editorial Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full border-l border-black/[0.03]" />
      
      <div className="relative max-w-[1700px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-24">
          <div className="flex-1 space-y-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 text-black/20 font-bold uppercase tracking-[0.6em] text-[10px]">
                 <span className="w-12 h-px bg-black/10" />
                 Visual Identity / {user?.aesthetic || 'Minimalist'}
              </div>
              <h1 className="text-[12vw] font-extralight tracking-tight leading-none text-black/90">
                @{user?.username || 'minimal'}<span className="text-black/10 font-black italic">!</span>
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row items-start gap-12 md:gap-24"
            >
               <div className="max-w-md space-y-6">
                  <p className="text-xl font-light text-black/60 leading-relaxed tracking-tight italic">
                    {user?.bio || "Redefining digital space through pure form and intentionality. A curation of essential aesthetics for the modern era."}
                  </p>
                  <div className="flex gap-3">
                     {[Instagram, Linkedin, Globe].map((Icon, i) => (
                       <button key={i} className="w-12 h-12 rounded-full border border-black/5 hover:bg-black/5 transition-all flex items-center justify-center opacity-40 hover:opacity-100">
                          <Icon size={18} />
                       </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-4 py-2 border-l border-black/5 pl-12 h-fit">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-20">Verified Identity</p>
                    <div className="flex items-center gap-2 mt-2">
                       <ShieldCheck size={14} className="opacity-40" />
                       <span className="text-sm font-medium tracking-tight">Authentic Creator</span>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold uppercase tracking-[0.4em] hover:underline underline-offset-8 transition-all">
                    Link Archive
                  </button>
               </div>
            </motion.div>
          </div>

          {/* High-Depth Avatar Shroud */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="hidden xl:block w-[400px] h-[600px] relative mt-12 bg-black/5 backdrop-blur-3xl p-6 shadow-2xl overflow-hidden"
          >
             <img 
               src={user?.image || 'https://images.unsplash.com/photo-1518621736915-f3b1c41136f6?q=80&w=400'} 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[3000ms]" 
               alt="" 
             />
             <div className="absolute inset-0 border-[20px] border-white/50 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};