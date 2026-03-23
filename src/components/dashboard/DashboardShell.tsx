'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-6 h-6 border-2 border-t-accent rounded-full animate-spin" style={{ borderColor: 'var(--border-subtle)' }} />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <DashboardTopbar />
        <main className="p-4 pb-24 transition-all">{children}</main>
        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 h-20 backdrop-blur-xl border-t flex items-center justify-around z-50 px-6" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 85%, transparent)', borderColor: 'var(--border-subtle)' }}>
          <a href="/dashboard" className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-xl">📄</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Pages</span>
          </a>
          <a href="/dashboard/create" className="flex flex-col items-center gap-1 p-3 rounded-2xl -mt-8 shadow-xl" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
            <span className="text-xl">➕</span>
          </a>
          <a href="/dashboard/settings" className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-xl">⚙️</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Settings</span>
          </a>
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardTopbar />
        <main className="flex-1 p-8 transition-all overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
