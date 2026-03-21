"use client";

import React from "react";
import Masonry from "react-masonry-css";
import { IOSFeedCard } from "./ios-feed-card";
import "./ios-grid.css";

export function IOSGrid({ items }: { items: any[] }) {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 2
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-3 px-3 pb-24"
      columnClassName="flex flex-col gap-3"
    >
      {items.map((item: any, i: number) => (
        <IOSFeedCard 
          key={item.id || i} 
          image={item.image || item.mediaUrls?.[0]} 
          title={item.title}
          price={item.price ? `₹${item.price}` : undefined}
        />
      ))}
    </Masonry>
  );
}
