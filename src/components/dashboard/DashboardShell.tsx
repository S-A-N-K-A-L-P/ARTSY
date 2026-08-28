import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { IOSBottomNav } from '@/components/ui/ios/ios-bottom-nav';
import { IOSNavBar } from '@/components/ui/ios/ios-navbar';

/**
 * App shell.
 *
 * This used to branch on useIsMobile(), which returns null on the server and
 * on the first client render — so every page showed a full-screen spinner,
 * then swapped in an entirely different component tree. That cost a guaranteed
 * flash, a layout shift, and any SSR'd content.
 *
 * The breakpoint is now pure CSS and `children` is rendered exactly once, so
 * there is one DOM, one mount, and no swap. Both sets of chrome are in the
 * markup; only one is ever visible.
 */
export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen lg:flex"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <div className="lg:hidden">
          <IOSNavBar title="ASTL" />
        </div>
        <div className="hidden lg:block">
          <DashboardTopbar />
        </div>

        {/* pb-32 on mobile clears the fixed bottom nav */}
        <main className="flex-1 p-5 pb-32 lg:p-8 lg:pb-8">{children}</main>
      </div>

      <div className="lg:hidden">
        <IOSBottomNav />
      </div>
    </div>
  );
}
