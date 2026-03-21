import React from "react";
import { cn } from "@/lib/utils";

export function IOSFeedCard({ 
  image, 
  title, 
  price,
  className 
}: { 
  image: string; 
  title?: string;
  price?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-ios overflow-hidden group active:scale-[0.98] transition-transform", className)}>
      <img
        src={image}
        alt={title || "Feed item"}
        className="w-full h-full object-cover aspect-[3/4]"
      />
      
      {(title || price) && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between items-end">
            {title && <span className="text-white text-sm font-medium truncate mr-2">{title}</span>}
            {price && <span className="text-white text-xs font-bold bg-accent/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
              {price}
            </span>}
          </div>
        </div>
      )}
    </div>
  );
}
