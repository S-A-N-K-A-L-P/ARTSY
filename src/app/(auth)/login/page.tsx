import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('./components/AuthForm').then(mod => mod.AuthForm), {
  ssr: true, // We want the form structure to be server-rendered for SEO and layout stability
});

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Desktop Layout (Split-screen) */}
      <div className="hidden md:flex min-h-screen">
        <div className="w-1/2 relative overflow-hidden flex flex-col justify-between p-12 border-r border-white/5">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-purple-600/30 blur-[130px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
                x: [0, -40, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-600/20 blur-[130px] rounded-full" 
            />
          </div>

          <div className="z-10 relative">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl mb-8">
              <span className="text-2xl font-bold tracking-tighter italic">A</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent max-w-lg leading-tight">
              Curate your digital universe.
            </h2>
            <p className="text-white/40 mt-6 text-lg max-w-md leading-relaxed font-medium">
              Join the premier collective of artists and creators. Discover aesthetics that define the modern era.
            </p>
          </div>

          <div className="z-10 relative">
            <div className="flex -space-x-4 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-2 border-[#050505] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md animate-pulse`} />
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-[#050505] bg-white/10 backdrop-blur-md flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <p className="text-sm text-white/40 font-medium tracking-wide">Join thousands of creators already on board.</p>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center p-12 relative overflow-y-auto">
          <AuthForm />
        </div>
      </div>

      {/* Mobile Layout (Centered) */}
      <div className="md:hidden min-h-screen flex items-center justify-center p-6 overflow-hidden relative">
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
    </div>
  );
}
