import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Globe, Sparkles, Heart } from 'lucide-react';

export const ProfileHeader = ({ user }: any) => {
  return (
    <div className="relative h-[550px] flex items-center justify-center p-20 bg-[#fafafa] overflow-hidden group">
      {/* Soft-Focus Dreamy Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px] opacity-60" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

      <div className="relative w-full max-w-[1700px] mx-auto flex flex-col items-center text-center space-y-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-48 h-48 rounded-[64px] bg-white shadow-[20px_40px_80px_-20px_rgba(0,0,0,0.15)] flex items-center justify-center p-3 relative group/avatar"
        >
           <img 
             src={user?.image || 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=400'} 
             className="w-full h-full object-cover rounded-[52px] group-hover:scale-105 transition-transform duration-700" 
             alt="" 
           />
           <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-pink-400">
              <Heart size={20} fill="currentColor" />
           </div>
        </motion.div>

        <div className="space-y-4">
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
           >
              <div className="flex items-center justify-center gap-4 mb-4">
                 <Sparkles size={16} className="text-blue-300" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-400/60">Retro Identity / {user?.aesthetic || 'Dreamscape'}</span>
                 <Sparkles size={16} className="text-blue-300" />
              </div>
              <h1 className="text-9xl font-black italic tracking-tighter text-blue-900/90 mix-blend-multiply leading-none">
                @{user?.username || 'vapor'}
              </h1>
           </motion.div>

           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-xl text-blue-900/40 font-bold tracking-tight italic max-w-xl mx-auto"
           >
             {user?.bio || "Surfing the aesthetic waves of a digital past. A collection of chrome-tinted dreams and pastel realities."}
           </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
           {[Instagram, Linkedin, Globe].map((Icon, i) => (
             <button key={i} className="px-8 py-3 rounded-full bg-white/50 backdrop-blur-xl border border-white shadow-lg shadow-pink-100 hover:scale-110 hover:-rotate-3 transition-all">
                <Icon size={18} className="text-blue-900/60" />
             </button>
           ))}
        </motion.div>
      </div>
    </div>
  );
};