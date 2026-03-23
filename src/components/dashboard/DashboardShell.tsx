'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { IOSBottomNav } from '@/components/ui/ios/ios-bottom-nav';
import { IOSNavBar } from '@/components/ui/ios/ios-navbar';

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
      <div className="min-h-screen transition-colors duration-500 relative" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <IOSNavBar title="ARTSY" />
        <main className="p-5 pb-32 transition-all">{children}</main>
        
        <div className="fixed bottom-0 left-0 right-0 z-50">
           <IOSBottomNav />
        </div>
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
