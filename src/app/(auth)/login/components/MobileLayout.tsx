'use client';

import { motion } from 'framer-motion';
import { AuthForm } from './AuthForm';

export function MobileLayout() {
  return (
    <div className="md:hidden min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 overflow-hidden relative">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/30 blur-[130px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 blur-[130px] rounded-full" 
        />
      </div>

      <AuthForm />
    </div>
  );
}
