'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

/** Section context for the breadcrumb — not the page title. */
function getSection(pathname: string): string {
  if (pathname.startsWith('/dashboard/settings')) return 'Settings';
  if (pathname.startsWith('/dashboard/analytics')) return 'Analytics';
  if (pathname.startsWith('/dashboard/items') || pathname.includes('/item/')) return 'Items';
  if (pathname.startsWith('/dashboard/create') || pathname.startsWith('/dashboard/page')) return 'Pages';
  if (pathname === '/dashboard') return 'Pages';
  return 'Dashboard';
}

/**
 * Topbar chrome.
 *
 * This used to render an <h1> with a route-derived title while every page
 * rendered its own heading too — so each screen had two h1s and showed the
 * same word twice ("Settings" over "Settings"), or a stale fallback over the
 * real title ("Dashboard" over "Visual identity") because the route map had no
 * entry for nested pages. The page owns its title; this is just orientation.
 */
export default function DashboardTopbar({ title: customTitle }: { title?: string }) {
  const pathname = usePathname();
  const section = customTitle || getSection(pathname);

  return (
    <header
      className="flex h-14 border-b backdrop-blur-3xl sticky top-0 z-40 items-center justify-between px-8"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <nav aria-label="Breadcrumb">
        <p className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
          {section}
        </p>
      </nav>

      <button
        aria-label="Notifications"
        className="p-2.5 rounded-[var(--radius-sm)] text-text-muted hover:text-text hover:bg-elevated transition-colors"
      >
        <Bell size={18} />
      </button>
    </header>
  );
}
