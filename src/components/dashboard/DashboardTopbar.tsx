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
    <header className="h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-6">
      <h1 className="text-sm font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800">
          <Bell size={16} />
        </button>
      </div>
    </header>
  );
}
