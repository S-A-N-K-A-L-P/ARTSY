"use client";

import React from "react";
import { Settings, Grid, Bookmark, Tag, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface IOSProfileProps {
  user: {
    name: string;
    username: string;
    image: string;
    bio: string;
    stats: {
      posts: number;
      followers: number;
      following: number;
    };
  };
}

export function IOSProfile({ user }: IOSProfileProps) {
  const [activeTab, setActiveTab] = React.useState("posts");

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-xl border-b border-white/5 px-4 h-11 flex items-center justify-between">
        <div className="w-8" />
        <h1 className="text-[17px] font-semibold tracking-tight">{user.username}</h1>
        <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <Settings size={22} className="text-text/80" />
        </button>
      </header>

      {/* Profile Info */}
      <div className="px-5 pt-4 pb-6">
        <div className="flex items-center gap-8 mb-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-purple-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <img 
              src={user.image} 
              alt={user.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-white/10 relative z-10 shadow-xl"
            />
          </div>
          
          <div className="flex-1 flex justify-around">
            <StatItem label="Posts" value={user.stats.posts} />
            <StatItem label="Followers" value={user.stats.followers} />
            <StatItem label="Following" value={user.stats.following} />
          </div>
        </div>

        <div className="space-y-1 mb-5">
          <h2 className="text-base font-bold leading-tight">{user.name}</h2>
          <p className="text-[14px] text-text/80 leading-normal max-w-xs">{user.bio}</p>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-white text-black h-9 rounded-lg text-[14px] font-semibold active:scale-[0.98] transition-transform">
            Edit Profile
          </button>
          <button className="flex-1 bg-white/10 text-text h-9 rounded-lg text-[14px] font-semibold active:scale-[0.98] transition-transform">
            Share Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        <TabButton 
          icon={<Grid size={22} />} 
          isActive={activeTab === "posts"} 
          onClick={() => setActiveTab("posts")} 
        />
        <TabButton 
          icon={<Bookmark size={22} />} 
          isActive={activeTab === "saved"} 
          onClick={() => setActiveTab("saved")} 
        />
        <TabButton 
          icon={<Tag size={22} />} 
          isActive={activeTab === "tagged"} 
          onClick={() => setActiveTab("tagged")} 
        />
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-3 gap-[1px] pt-[1px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-white/5 hover:bg-white/10 transition-colors relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[16px] font-bold leading-none">{value}</span>
      <span className="text-[12px] text-text/40">{label}</span>
    </div>
  );
}

function TabButton({ icon, isActive, onClick }: { icon: React.ReactNode; isActive: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 h-11 flex items-center justify-center transition-colors relative",
        isActive ? "text-text" : "text-text/30"
      )}
    >
      {icon}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-text" />
      )}
    </button>
  );
}
