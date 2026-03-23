'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, FileText, BarChart3, Settings, Plus, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';

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
    <aside className="w-64 h-screen sticky top-0 flex flex-col border-r transition-all duration-500" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
            <span className="font-bold text-sm italic" style={{ color: 'var(--accent)' }}>A</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Artsy</span>
        </Link>
      </div>

      {/* Create button */}
      <div className="px-4 pt-6 pb-4">
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 w-full h-11 px-4 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-lg"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
        >
          <Plus size={18} strokeWidth={2.5} />
          Create Space
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {NAV.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 h-12 rounded-2xl text-sm font-bold transition-all duration-300 group",
                isActive ? "shadow-md" : "opacity-40 hover:opacity-100 hover:bg-white/5"
              )}
              style={{
                 backgroundColor: isActive ? 'var(--card)' : 'transparent',
                 color: isActive ? 'var(--accent)' : 'var(--text)',
                 border: isActive ? '1px solid var(--border)' : '1px solid transparent'
              }}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-inner" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
            {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">{session?.user?.name || 'User'}</p>
            <p className="text-[10px] opacity-40 truncate">{session?.user?.email}</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-2 opacity-40 hover:opacity-100 hover:text-red-400 transition-all"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
