'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  ChevronLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- SCHEMAS ---
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// --- MAIN PAGE COMPONENT ---
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { register: loginReg, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { register: registerReg, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/home');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Registration failed');
      } else {
        await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        router.push('/onboarding');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const formElement = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm z-10 mx-auto"
    >
      <div className="text-center mb-10 md:mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[22px] mx-auto mb-6 flex items-center justify-center shadow-2xl"
        >
          <span className="text-3xl font-bold tracking-tighter italic">A</span>
        </motion.div>
        <motion.h1 
          className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
        >
          {isLogin ? 'Welcome back' : 'Join the Collective'}
        </motion.h1>
        <p className="text-white/40 mt-2 text-sm font-medium tracking-wide px-4 leading-relaxed">
          {isLogin ? 'Discover unique aesthetics and connect with fellow creators.' : 'Create your digital identity and start curating your world.'}
        </p>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-[32px] border border-white/[0.08] rounded-[32px] p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="p-6">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleLoginSubmit(onLogin)}
                className="space-y-4"
              >
                <div className="space-y-3">
                  <IOSInput
                    placeholder="Email Address"
                    icon={<Mail size={18} />}
                    {...loginReg('email')}
                    error={loginErrors.email?.message as string}
                  />
                  <IOSInput
                    placeholder="Password"
                    type="password"
                    icon={<Lock size={18} />}
                    {...loginReg('password')}
                    error={loginErrors.password?.message as string}
                  />
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-400 font-medium text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-white text-black font-bold h-14 rounded-2xl transition-all shadow-xl shadow-white/5 active:bg-white/90 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      Continue
                      <ArrowRight size={18} className="opacity-60" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleRegisterSubmit(onRegister)}
                className="space-y-4"
              >
                <div className="space-y-3">
                  <IOSInput
                    placeholder="Your Full Name"
                    icon={<User size={18} />}
                    {...registerReg('name')}
                    error={registerErrors.name?.message as string}
                  />
                  <IOSInput
                    placeholder="Email Address"
                    icon={<Mail size={18} />}
                    {...registerReg('email')}
                    error={registerErrors.email?.message as string}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <IOSInput
                      placeholder="Phone"
                      icon={<Phone size={18} />}
                      {...registerReg('phone')}
                    />
                    <IOSInput
                      placeholder="Location"
                      icon={<MapPin size={18} />}
                      {...registerReg('address')}
                    />
                  </div>
                  <IOSInput
                    placeholder="Security Password"
                    type="password"
                    icon={<Lock size={18} />}
                    {...registerReg('password')}
                    error={registerErrors.password?.message as string}
                  />
                  <IOSInput
                    placeholder="Confirm Password"
                    type="password"
                    icon={<Lock size={18} />}
                    {...registerReg('confirmPassword')}
                    error={registerErrors.confirmPassword?.message as string}
                  />
                </div>

                {error && <p className="text-sm text-red-400 font-medium text-center">{error}</p>}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full bg-white text-black font-bold h-14 rounded-2xl transition-all shadow-xl shadow-white/5 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      Get Started
                      <Sparkles size={18} className="opacity-60" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          type="button"
          className="w-full py-5 bg-white/[0.02] border-t border-white/[0.05] text-sm font-semibold tracking-wide hover:bg-white/[0.04] transition-colors flex items-center justify-center gap-2"
        >
          {isLogin ? (
            <>
              <span className="opacity-40 font-normal">Don't have an account?</span>
              <span className="text-white">Register</span>
            </>
          ) : (
            <>
              <ChevronLeft size={16} className="opacity-40" />
              <span className="opacity-40 font-normal">Back to</span>
              <span className="text-white">Login</span>
            </>
          )}
        </button>
      </div>

      <p className="mt-10 md:mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
        © 2026 ARTSY COLLECTIVE • SECURED ACCESS
      </p>
    </motion.div>
  );

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
                <div key={i} className={`w-12 h-12 rounded-full border-2 border-[#050505] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md`}>
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-[#050505] bg-white/10 backdrop-blur-md flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <p className="text-sm text-white/40 font-medium">Join thousands of creators already on board.</p>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center p-12 relative overflow-y-auto">
          {formElement}
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

        {formElement}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function IOSInput({ placeholder, icon, error, ...props }: any) {
  return (
    <div className="space-y-1.5 w-full">
      <div className={cn(
        "relative group transition-all duration-300",
        error ? "ring-1 ring-red-500/50" : "focus-within:ring-1 focus-within:ring-white/20"
      )}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white/60 transition-colors">
          {icon}
        </div>
        <input
          placeholder={placeholder}
          className={cn(
            "w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl h-13 pl-12 pr-4",
            "text-[15px] font-medium placeholder:text-white/20 text-white",
            "focus:outline-none focus:bg-white/[0.06] transition-all",
            "selection:bg-white/20"
          )}
          {...props}
        />
      </div>
      {error && <motion.p initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="text-[11px] text-red-400 font-semibold ml-4">{error}</motion.p>}
    </div>
  );
}
