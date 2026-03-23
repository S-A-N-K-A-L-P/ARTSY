'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <DashboardTopbar />
        <main className="p-4 pb-20">{children}</main>
        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-zinc-950 border-t border-zinc-800 flex items-center justify-around z-50">
          <a href="/dashboard" className="flex flex-col items-center gap-1 text-zinc-400 text-xs">
            <span className="text-base">📄</span>Pages
          </a>
          <a href="/dashboard/create" className="flex flex-col items-center gap-1 text-zinc-400 text-xs">
            <span className="text-base">➕</span>Create
          </a>
          <a href="/dashboard/settings" className="flex flex-col items-center gap-1 text-zinc-400 text-xs">
            <span className="text-base">⚙️</span>Settings
          </a>
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardTopbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
