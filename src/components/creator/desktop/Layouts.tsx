'use client';

import React from 'react';

/** Storefront grid. Gutter matches the rest of the app's boards. */
export const MasonryGridDesktop = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
    {children}
  </div>
);
