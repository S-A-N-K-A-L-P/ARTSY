"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function IOSNavBar({ 
  title, 
  showBack = false,
  rightAction,
  className 
}: { 
  title: string; 
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <div className={cn("sticky top-0 z-50 w-full bg-bg/80 backdrop-blur-xl border-b border-white/5", className)}>
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex-1">
          {showBack && (
            <button 
              onClick={() => router.back()}
              className="flex items-center text-accent active:opacity-50 transition-opacity"
            >
              <ChevronLeft size={28} className="-ml-2" />
              <span className="text-[17px]">Back</span>
            </button>
          )}
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 font-semibold text-[17px] text-text">
          {title}
        </div>
        
        <div className="flex-1 flex justify-end">
          {rightAction}
        </div>
      </div>
    </div>
  );
}
