"use client";

import React, { useState, useEffect } from "react";
import { Settings, Grid, Sparkles, Palette, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ThemeName, themes } from "@/lib/theme/themes";
import Masonry from "react-masonry-css";

interface IOSProfileProps {
  initialUser?: any;
}

export function IOSProfile({ initialUser }: IOSProfileProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const [activeTab, setActiveTab] = useState("pages");
  const [editingAesthetic, setEditingAesthetic] = useState<string | null>(null);
  const [modifyingUserAesthetic, setModifyingUserAesthetic] = useState(false);

  useEffect(() => {
    if (!initialUser) {
      const fetchMe = async () => {
        try {
          const res = await fetch('/api/auth/me');
          const data = await res.json();
          if (data.success) {
            setUser(data.user);
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchMe();
    }
  }, [initialUser]);

  const handleUpdateUserAesthetic = async (theme: string) => {
    try {
      const res = await fetch('/api/user/aesthetic', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aesthetic: theme }),
      });
      if (res.ok) {
        setUser({ ...user, aesthetic: theme });
        setModifyingUserAesthetic(false);
        // Refresh to apply global theme changes across the app
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to update user aesthetic:', err);
    }
  };

  const handleUpdateAesthetic = async (pageId: string, theme: string) => {
    try {
      const res = await fetch(`/api/creator/page/${pageId}/aesthetic`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      });
      if (res.ok) {
        // Update local state
        setUser({
          ...user,
          pages: user.pages?.map((p: any) => p._id === pageId ? { ...p, aesthetic: { ...p.aesthetic, theme } } : p)
        });
        setEditingAesthetic(null);
      }
    } catch (err) {
      console.error('Failed to update aesthetic:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
        <Loader2 className="w-8 h-8 animate-spin text-accent opacity-20" />
      </div>
    );
  }

  if (!user) return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-bg p-6 text-center">
        <p className="text-text/40 font-black uppercase tracking-widest text-xs italic">Identity in the void...</p>
     </div>
  );

  const isOwner = !initialUser; // Simplification: if we fetch it via /me, we are the owner

  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 pb-40">
      {/* Minimal Header Section */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex items-start justify-between mb-8">
            <div className="relative">
                <img 
                    src={user.image} 
                    alt={user.name} 
                    className="w-20 h-20 rounded-2xl object-cover bg-neutral-100"
                />
            </div>
            <div className="flex gap-2">
                <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                    <Settings size={20} />
                </button>
            </div>
        </div>

        <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{user.name}</h1>
            <p className="text-sm text-neutral-400 font-medium mt-1">@{user.username}</p>
            {user.bio && (
                <p className="text-sm text-neutral-500 mt-4 leading-relaxed max-w-sm">
                    {user.bio}
                </p>
            )}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-neutral-900 text-white h-12 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-all active:scale-[0.98]">
            {isOwner ? "Edit Profile" : "Follow"}
          </button>
          {isOwner && (
            <button 
              onClick={() => isOwner && setModifyingUserAesthetic(true)}
              className="px-4 h-12 bg-neutral-50 border border-neutral-100 text-neutral-900 rounded-xl flex items-center justify-center hover:bg-neutral-100 transition-all"
            >
                <Palette size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-8 mt-2">
          <div className="flex gap-8 border-b border-neutral-100">
            <button 
                onClick={() => setActiveTab("pages")}
                className={cn(
                    "pb-4 text-sm font-semibold transition-all relative",
                    activeTab === "pages" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                )}
            >
                Spaces
                {activeTab === "pages" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />}
            </button>
            <button 
                onClick={() => setActiveTab("activity")}
                className={cn(
                    "pb-4 text-sm font-semibold transition-all relative",
                    activeTab === "activity" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                )}
            >
                Activity
                {activeTab === "activity" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />}
            </button>
          </div>
      </div>

      {/* Content - Spaces */}
      <div className="px-6">
        <Masonry
            breakpointCols={{
                default: 2,
                700: 2,
                500: 2
            }}
            className="flex gap-4"
            columnClassName="flex flex-col gap-4"
        >
            {user.pages?.map((page: any) => (
                <div 
                    key={page._id} 
                    className="group cursor-pointer mb-6"
                    onClick={() => router.push(`/user/${user.username}/${page.slug || page._id}`)}
                >
                    <div className="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-50 h-48">
                        <img 
                            src={page.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200"} 
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                            alt={page.name}
                        />
                    </div>
                    <div className="mt-3 px-1">
                        <p className="text-sm font-semibold text-neutral-900 line-clamp-1">{page.name}</p>
                        <p className="text-xs text-neutral-400 mt-0.5 font-medium uppercase tracking-widest">
                            {page.aesthetic?.theme || page.aesthetic || 'minimal'}
                        </p>
                    </div>
                </div>
            ))}
        </Masonry>

        {user.pages?.length === 0 && (
           <div className="py-20 text-center text-neutral-300">
              <p className="text-xs font-medium uppercase tracking-widest">No spaces found</p>
           </div>
        )}
      </div>

      {/* Aesthetic Picker Sheet */}
      <AnimatePresence>
          {modifyingUserAesthetic && (
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center"
              >
                  <div className="absolute inset-0" onClick={() => setModifyingUserAesthetic(false)} />
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-white rounded-t-[32px] p-10 z-10"
                  >
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">Interface Aesthetic</h3>
                      <p className="text-sm text-neutral-400 mb-8">Select your preferred visual identity</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-10">
                          {Object.keys(themes).map((theme) => (
                              <button
                                  key={theme}
                                  onClick={() => handleUpdateUserAesthetic(theme)}
                                  className={cn(
                                      "h-14 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                                      user.aesthetic === theme 
                                          ? "bg-neutral-900 text-white" 
                                          : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100"
                                  )}
                              >
                                  {theme}
                              </button>
                          ))}
                      </div>

                      <button 
                        onClick={() => setModifyingUserAesthetic(false)}
                        className="w-full h-14 rounded-xl border border-neutral-100 text-neutral-400 font-semibold text-sm hover:text-neutral-900 transition-colors"
                      >
                          Done
                      </button>
                  </motion.div>
              </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xl font-black tracking-tighter italic leading-none">{value}</span>
      <span className="text-[9px] font-black uppercase tracking-widest opacity-30">{label}</span>
    </div>
  );
}

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 h-10 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
        isActive ? "bg-[var(--accent)] text-[var(--bg-primary)] shadow-lg" : "text-text/30 hover:text-text/50"
      )}
    >
      {label}
    </button>
  );
}
