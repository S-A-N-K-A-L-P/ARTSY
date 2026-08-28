'use client';

import React from 'react';

export const StorefrontFooterDesktop = () => (
  <footer className="mt-20 px-6 md:px-10 py-12 border-t border-line">
    <div className="max-w-5xl mx-auto flex flex-wrap items-baseline justify-between gap-6">
      <p className="text-sm font-bold tracking-tight text-text">astl</p>
      <p className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
        © {new Date().getFullYear()} astl
      </p>
    </div>
  </footer>
);
