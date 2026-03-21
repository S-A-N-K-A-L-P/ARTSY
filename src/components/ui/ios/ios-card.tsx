import React from "react";
import { cn } from "@/lib/utils";

export function IOSCard({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={cn("bg-card rounded-ios shadow-sm overflow-hidden border border-white/5", className)}>
      {children}
    </div>
  );
}
