'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, MapPin, ArrowRight, Loader2, Sparkles } from 'lucide-react';

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

      if (!res.ok) {
        setError(result.error || 'Registration failed');
      } else {
        // Auto sign-in after registration
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

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
          >
            ARTSY
          </motion.h1>
          <p className="text-gray-400 mt-2 text-sm font-light">Where creativity finds its rhythm.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="flex bg-black/40 p-1 rounded-xl mb-8 relative">
            <motion.div
              animate={{ x: isLogin ? 0 : '100%' }}
              className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-lg"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${isLogin ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors ${!isLogin ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLoginSubmit(onLogin)}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      {...loginReg('email')}
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  {loginErrors.email && <p className="text-xs text-red-500 ml-1">{loginErrors.email.message as string}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      {...loginReg('password')}
                      type="password"
                      placeholder="Password"
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                  {loginErrors.password && <p className="text-xs text-red-500 ml-1">{loginErrors.password.message as string}</p>}
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      Enter the Space
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegisterSubmit(onRegister)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 col-span-2">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...registerReg('name')}
                        placeholder="Full Name"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    {registerErrors.name && <p className="text-xs text-red-500 ml-1">{registerErrors.name.message as string}</p>}
                  </div>

                  <div className="space-y-1 col-span-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...registerReg('email')}
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    {registerErrors.email && <p className="text-xs text-red-500 ml-1">{registerErrors.email.message as string}</p>}
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...registerReg('phone')}
                        placeholder="Phone"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...registerReg('address')}
                        placeholder="Address"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...registerReg('password')}
                        type="password"
                        placeholder="Password"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    {registerErrors.password && <p className="text-xs text-red-500 ml-1">{registerErrors.password.message as string}</p>}
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        {...registerReg('confirmPassword')}
                        type="password"
                        placeholder="Confirm"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    {registerErrors.confirmPassword && <p className="text-xs text-red-500 ml-1">{registerErrors.confirmPassword.message as string}</p>}
                  </div>
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      Create Account
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-8 text-center text-xs text-gray-500">
            By continuing, you agree to ARTSY's 
            <span className="text-gray-300 cursor-pointer hover:underline mx-1">Terms</span>
            & 
            <span className="text-gray-300 cursor-pointer hover:underline ml-1">Privacy Policy</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
