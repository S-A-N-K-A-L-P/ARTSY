"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function ISSheet({ 
  children, 
  trigger, 
  title, 
  description 
}: { 
  children: React.ReactNode;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" />
        <Dialog.Content 
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 max-h-[96dvh] w-full",
            "bg-card rounded-t-[20px] shadow-2xl border-t border-white/10",
            "animate-in slide-in-from-bottom duration-500 ease-out fill-mode-forwards",
            "pb-safe focus:outline-none"
          )}
        >
          <div className="flex flex-col items-center pt-3 pb-6">
            <div className="w-10 h-1 bg-text/10 rounded-full mb-4" />
            
            {title && (
              <Dialog.Title className="text-lg font-semibold px-6 text-text">{title}</Dialog.Title>
            )}
            {description && (
              <Dialog.Description className="text-sm text-text/50 px-6 mt-1">{description}</Dialog.Description>
            )}
          </div>
          
          <div className="overflow-y-auto px-6 pb-8">
            {children}
          </div>
          
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 p-2 rounded-full bg-text/5 active:scale-95 transition-transform">
              <X size={20} className="text-text/60" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
