"use client";

import React from "react";
import { IOSSearch } from "@/components/ui/ios/ios-search";
import { IOSGrid } from "@/components/ui/ios/ios-grid";
import { IOSBottomNav } from "@/components/ui/ios/ios-bottom-nav";
import { IOSNavBar } from "@/components/ui/ios/ios-navbar";

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
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Web view overlay - visible only on medium screens and up */}
      <div className="hidden md:flex fixed inset-0 z-50 bg-[#F5F2EE] items-center justify-center p-8 text-center">
        <div className="max-w-4xl w-full">
          <h1 className="text-6xl font-bold mb-6 tracking-tight text-[#2C2C2C]">ARTSY</h1>
          <p className="text-xl text-[#2C2C2C]/60 mb-8">The premium aesthetic platform for creators.</p>
          <div className="p-12 border border-black/5 bg-white rounded-2xl shadow-xl">
            <p className="text-[#2C2C2C]">Please visit from a mobile device to experience the iOS design system.</p>
          </div>
        </div>
      </div>

      <IOSNavBar title="ARTSY" />
      <IOSSearch />
      
      <main className="flex-1 overflow-y-auto pt-2">
        <div className="px-4 mb-4">
          <h2 className="text-2xl font-bold tracking-tight text-text">For You</h2>
          <p className="text-text/50 text-sm">Curated aesthetics based on your vibe</p>
        </div>
        
        <IOSGrid items={MOCK_ITEMS} />
      </main>
      
      <IOSBottomNav />
    </div>
  );
}
