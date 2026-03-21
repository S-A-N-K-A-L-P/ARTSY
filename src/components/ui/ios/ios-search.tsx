"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function IOSSearch({ className }: { className?: string }) {
  return (
    <div className={cn("sticky top-0 z-50 bg-bg/80 backdrop-blur-xl p-3", className)}>
      <div className="flex items-center gap-2 rounded-ios bg-card px-4 py-3 shadow-sm border border-white/5">
        <span className="text-text/50">🔍</span>
        <input
          placeholder="Search aesthetics..."
          className="bg-transparent outline-none w-full text-text placeholder:text-text/30 text-[17px]"
        />
      </div>
    </div>
  );
}
