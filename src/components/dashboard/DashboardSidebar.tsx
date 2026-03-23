'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, FileText, BarChart3, Settings, Plus, LogOut, Home } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const NAV = [
  { href: '/home', label: 'Daily Feed', icon: Home },
  { href: '/dashboard', label: 'Pages', icon: LayoutGrid },
  { href: '/dashboard/items', label: 'Items', icon: FileText },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col border-r transition-all duration-500" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
            <span className="font-bold text-sm italic" style={{ color: 'var(--accent)' }}>A</span>
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>Artsy</span>
        </Link>
      </div>

      {/* Create button */}
      <div className="px-4 pt-6 pb-4">
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 w-full h-11 px-4 rounded-2xl text-sm font-bold transition-all active:scale-95 shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
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
                "flex items-center gap-4 px-4 h-11 rounded-2xl text-sm font-semibold transition-all duration-200 group relative",
                isActive ? "" : "opacity-60 hover:opacity-100 hover:bg-[var(--bg-tertiary)]"
              )}
              style={{
                 backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                 color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                 border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent'
              }}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className="tracking-tight">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-1 w-1 h-5 rounded-full" 
                  style={{ backgroundColor: 'var(--accent)' }} 
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shadow-inner" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--accent)' }}>
            {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>{session?.user?.name || 'User'}</p>
            <p className="text-[9px] opacity-40 truncate" style={{ color: 'var(--text-muted)' }}>{session?.user?.email}</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="p-2 opacity-30 hover:opacity-100 transition-all"
            style={{ color: 'var(--text-primary)' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
