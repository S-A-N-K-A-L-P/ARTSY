'use client';

import React, { useState, useEffect } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Hydration Guard
  useEffect(() => {
    setMounted(true);
  }, []);

  const { register: loginReg, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { register: registerReg, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
      </div>
    );
  }

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
        router.push('/dashboard');
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

      if (!result.success) {
        setError(result.error || 'Registration failed');
      } else {
        // Automatic login after registration
        const loginRes = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        
        if (loginRes?.error) {
          setError('Account created, but could not auto-login. Please login manually.');
        } else {
          router.push('/onboarding');
        }
      }
    } catch (err) {
      setError('Something went wrong during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row shadow-2xl">
        {/* Left Side (Desktop Only) */}
        <div className="hidden md:flex flex-col justify-between w-1/2 p-16 border-r border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-xl font-bold italic">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight">ASTAL</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-6xl font-bold tracking-tight leading-[1.1] mb-8">
              Curate your <br />
              <span className="text-white/40">digital identity.</span>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed font-medium">
              Join the world's most aesthetic collective. Discover, create, and share your vision with a community that values deep design.
            </p>
          </div>

          <div className="flex items-center gap-6 text-white/20 text-xs font-bold uppercase tracking-[0.2em]">
            <span>© 2026 Astal</span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span>Encrypted Access</span>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {isLogin ? 'Welcome back' : 'Create Account'}
              </h2>
              <p className="text-white/40 text-sm font-medium">
                {isLogin ? 'Enter your details to access your studio.' : 'Join your new creative community today.'}
              </p>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] rounded-[32px] overflow-hidden shadow-2xl">
              <div className="p-8">
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
                      
                      {error && <p className="text-xs text-red-400 font-semibold text-center">{error}</p>}

                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-white text-black font-bold h-14 rounded-2xl active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-xl shadow-white/5"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                          <>
                            Continue
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
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
                      <IOSInput
                        placeholder="Full Name"
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
                        placeholder="Create Password"
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
                      
                      {error && <p className="text-xs text-red-400 font-semibold text-center">{error}</p>}

                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-white text-black font-bold h-14 rounded-2xl active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-xl shadow-white/5"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                          <>
                            Get Started
                            <Sparkles size={18} />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => setIsLogin(!isLogin)}
                type="button"
                className="w-full py-6 bg-white/[0.02] border-t border-white/[0.05] text-sm font-semibold hover:bg-white/[0.04] transition-colors flex items-center justify-center gap-2"
              >
                {isLogin ? (
                  <>
                    <span className="opacity-40">Don't have an account?</span>
                    <span className="text-white">Register</span>
                  </>
                ) : (
                  <>
                    <ChevronLeft size={16} className="opacity-40" />
                    <span className="opacity-40">Back to</span>
                    <span className="text-white">Login</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
              Protected by SSL encryption
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function IOSInput({ placeholder, icon, error, ...props }: any) {
  return (
    <div className="space-y-1.5 w-full text-left">
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
            "w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl h-14 pl-12 pr-4",
            "text-[15px] font-medium placeholder:text-white/20 text-white",
            "focus:outline-none focus:bg-white/[0.05] transition-all",
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-red-400 font-semibold ml-4">{error}</p>}
    </div>
  );
}
