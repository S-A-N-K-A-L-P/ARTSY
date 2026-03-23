"use client";

import React, { useState, useEffect } from "react";
import { Settings, Grid, Sparkles, Palette, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ThemeName, themes } from "@/lib/theme/themes";

interface IOSProfileProps {
  initialUser?: any;
}

export function IOSProfile({ initialUser }: IOSProfileProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const [activeTab, setActiveTab] = useState("pages");
  const [editingAesthetic, setEditingAesthetic] = useState<string | null>(null);

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
    <div className="flex flex-col min-h-screen bg-bg text-text pb-40">
      {/* Cover Image & Header */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={user.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200"} 
          className="w-full h-full object-cover"
          alt="Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg" />
        
        <header className="absolute top-0 left-0 right-0 z-40 px-6 h-16 flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-[17px] font-black lowercase tracking-tight text-white drop-shadow-2xl italic">@{user.username}</h1>
          <button className="w-10 h-10 bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10">
            <Settings size={20} className="text-white" />
          </button>
        </header>
      </div>

      {/* Profile Info (Overlap) */}
      <div className="px-6 -mt-16 relative z-10 pb-8">
        <div className="flex items-end gap-6 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-[var(--accent)] rounded-[32px] blur-2xl opacity-20" />
            <img 
              src={user.image} 
              alt={user.name} 
              className="w-24 h-24 rounded-[32px] object-cover border-4 border-bg relative z-10 shadow-2xl"
            />
          </div>
          
          <div className="flex-1 flex justify-around pb-2">
            <StatItem label="Artifacts" value={user.pages?.length || 0} />
            <StatItem label="Followers" value={user.stats?.followers || 0} />
            <StatItem label="Vibe" value={user.stats?.following || 0} />
          </div>
        </div>

        <div className="space-y-1 mb-8">
          <h2 className="text-2xl font-black tracking-tighter italic leading-none">{user.name}</h2>
          <p className="text-[12px] font-medium text-text/50 leading-relaxed max-w-[80%] uppercase tracking-widest">{user.bio}</p>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-[var(--accent)] text-[var(--bg-primary)] h-12 rounded-2xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-[var(--accent-soft)]">
            {isOwner ? "Edit Profile" : "Follow Space"}
          </button>
          {isOwner && (
            <button className="w-12 h-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-text rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                <Palette size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
          <div className="flex p-1.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <TabButton label="Pages" isActive={activeTab === "pages"} onClick={() => setActiveTab("pages")} />
            <TabButton label="Activity" isActive={activeTab === "activity"} onClick={() => setActiveTab("activity")} />
          </div>
      </div>

      {/* Grid Content - Pages */}
      <div className="px-6 space-y-4">
        {user.pages?.map((page: any) => (
          <motion.div 
            key={page._id} 
            layout
            className="group relative h-48 rounded-[32px] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] cursor-pointer"
            onClick={() => router.push(`/user/${user.username}/${page.slug || page._id}`)}
          >
            <img 
              src={page.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200"} 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
              alt={page.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1 block">Space Page</span>
                        <h3 className="text-xl font-black tracking-tighter text-white italic">{page.name}</h3>
                    </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); isOwner && setEditingAesthetic(page._id); }}
                      className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-2 hover:bg-white/20 transition-all"
                    >
                        <Sparkles size={10} className="text-[var(--accent)]" /> {page.aesthetic?.theme || page.aesthetic}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/page/${page._id}`); }}
                      className="p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-white hover:bg-[var(--accent)] hover:text-black transition-all"
                    >
                        <ArrowRight size={12} />
                    </button>
                </div>
            </div>

            {/* Aesthetic Picker Overlay */}
            <AnimatePresence>
                {isOwner && editingAesthetic === page._id && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-center gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Select Aesthetic</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.keys(themes).map((theme) => (
                                <button
                                    key={theme}
                                    onClick={() => handleUpdateAesthetic(page._id, theme)}
                                    className={cn(
                                        "h-10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                        (page.aesthetic?.theme || page.aesthetic) === theme 
                                            ? "bg-[var(--accent)] text-black" 
                                            : "bg-white/5 text-white/40 hover:bg-white/10"
                                    )}
                                >
                                    {theme}
                                </button>
                            ))}
                        </div>
                        <button 
                          onClick={() => setEditingAesthetic(null)}
                          className="mt-4 text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white"
                        >
                            Cancel
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        ))}

        {user.pages?.length === 0 && (
           <div className="py-20 text-center opacity-30">
              <p className="text-xs font-black uppercase tracking-[0.3em] italic">No physical manifests detected.</p>
           </div>
        )}
      </div>
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
