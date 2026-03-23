'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';

// Map routes to readable titles
function getPageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Pages';
  if (pathname === '/dashboard/create') return 'Create Page';
  if (pathname.includes('/item/new')) return 'Add Item';
  if (pathname.includes('/post/new')) return 'Create Post';
  if (pathname.includes('/edit')) return 'Edit Item';
  if (pathname.match(/\/dashboard\/page\/.+/)) return 'Page';
  if (pathname === '/dashboard/items') return 'Items';
  if (pathname === '/dashboard/analytics') return 'Analytics';
  if (pathname === '/dashboard/settings') return 'Settings';
  return 'Dashboard';
}

export default function DashboardTopbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const title = getPageTitle(pathname);

  return (
    <header className="h-16 border-b backdrop-blur-3xl sticky top-0 z-40 flex items-center justify-between px-8 transition-colors duration-500" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 80%, transparent)', borderColor: 'var(--border-subtle)' }}>
      <h1 className="text-xl font-bold tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>{title}</h1>
      <div className="flex items-center gap-4">
        <button className="p-2.5 opacity-40 hover:opacity-100 transition-all rounded-2xl hover:bg-[var(--bg-tertiary)]" style={{ color: 'var(--text-secondary)' }}>
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}
