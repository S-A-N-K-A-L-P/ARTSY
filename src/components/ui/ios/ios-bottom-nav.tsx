"use client";

import React from "react";
import { Home, Search, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: <Home size={24} />, label: "Home", href: "/" },
  { icon: <Search size={24} />, label: "Search", href: "/explore" },
  { icon: <Heart size={24} />, label: "Likes", href: "/likes" },
  { icon: <User size={24} />, label: "Profile", href: "/user" },
];

export function IOSBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center py-2 px-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-accent" : "text-text/40 hover:text-text/60"
              )}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
