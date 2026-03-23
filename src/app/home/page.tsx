"use client";

import React from "react";
import { IOSSearch } from "@/components/ui/ios/ios-search";
import { IOSGrid } from "@/components/ui/ios/ios-grid";
import { IOSBottomNav } from "@/components/ui/ios/ios-bottom-nav";
import { IOSNavBar } from "@/components/ui/ios/ios-navbar";
import { cn } from "@/lib/utils";

// Mock items for demonstration
const MOCK_ITEMS = [
  { id: 1, image: "https://images.unsplash.com/photo-1515405299443-41a6b0932470?q=80&w=600", title: "Soft Aesthetic", price: 299 },
  { id: 2, image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=600", title: "Midnight Noir", price: 899 },
  { id: 3, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600", title: "Cyber Dreams", price: 450 },
  { id: 4, image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600", title: "Minimal Arch", price: 1200 },
  { id: 5, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600", title: "Ocean Breeze", price: 350 },
  { id: 6, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600", title: "Fantasy Peaks", price: 599 },
];

export default function MobileHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg selection:bg-accent/30 overflow-hidden">
      {/* Web view overlay */}
      <div className="hidden md:flex fixed inset-0 z-50 bg-[#F5F2EE] items-center justify-center p-8 text-center overscroll-none">
        <div className="max-w-4xl w-full">
          <h1 className="text-7xl font-bold mb-8 tracking-tighter text-[#2C2C2C] italic">ARTSY</h1>
          <p className="text-xl text-[#2C2C2C]/60 mb-10 font-medium">The premium aesthetic platform for creators.</p>
          <div className="p-16 border border-black/5 bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            <p className="text-[#2C2C2C] text-lg">Please visit from a mobile device to experience the iOS design system.</p>
          </div>
        </div>
      </div>

      <IOSNavBar title="ARTSY" />
      
      <main className="flex-1 overflow-y-auto pt-2 pb-24 scroll-smooth">
        <div className="px-5 mb-6">
          <div className="flex items-end justify-between mb-1">
            <h2 className="text-3xl font-bold tracking-tight text-text">For You</h2>
            <button className="text-accent text-[14px] font-semibold mb-1">See All</button>
          </div>
          <p className="text-text/40 text-[14px] font-medium">Curated aesthetics based on your vibe</p>
        </div>

        {/* Categories / Quick Filters */}
        <div className="flex gap-2.5 overflow-x-auto px-5 mb-8 no-scrollbar pb-1">
          {["All", "Minimal", "Cyber", "Nature", "Art"].map((cat, i) => (
            <button key={cat} className={cn(
              "px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all active:scale-95",
              i === 0 ? "bg-white text-black shadow-lg shadow-white/10" : "bg-white/5 text-text/60 hover:bg-white/10"
            )}>
              {cat}
            </button>
          ))}
        </div>
        
        <div className="px-1">
          <IOSGrid items={MOCK_ITEMS} />
        </div>
      </main>
      
      <IOSBottomNav />
    </div>
  );
}
