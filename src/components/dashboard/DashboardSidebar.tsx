'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, FileText, BarChart3, Settings, Plus, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const NAV = [
  { href: '/dashboard', label: 'Pages', icon: LayoutGrid },
  { href: '/dashboard/items', label: 'Items', icon: FileText },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-60 h-screen sticky top-0 flex flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Brand */}
      <div className="h-14 flex items-center px-5 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-sm">A</span>
          </div>
          <span className="font-semibold text-white text-sm tracking-tight">Artsy</span>
        </Link>
      </div>

      {/* Create button */}
      <div className="px-3 pt-4 pb-2">
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 w-full h-9 px-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors"
        >
          <Plus size={16} />
          Create Page
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {NAV.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 h-9 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-zinc-800 text-white font-medium' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
            {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{session?.user?.name || 'User'}</p>
            <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-1.5 text-zinc-500 hover:text-white transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
