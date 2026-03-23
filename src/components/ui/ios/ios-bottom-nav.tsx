"use client";

import React from "react";
import { Home, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: <Home size={22} />, label: "Home", href: "/home" },
  { icon: <TrendingUp size={22} />, label: "Trend", href: "/trending" },
  { icon: <User size={22} />, label: "Profile", href: "/user" },
];

export function IOSBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-3xl border-t border-white/5 pb-8">
      <div className="flex justify-around items-center h-16 px-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90",
                isActive ? "text-[var(--accent)]" : "text-text/30 hover:text-text/50"
              )}
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all",
                isActive ? "bg-[var(--accent-soft)] shadow-inner" : ""
              )}>
                {item.icon}
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.15em]",
                isActive ? "opacity-100" : "opacity-40"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
