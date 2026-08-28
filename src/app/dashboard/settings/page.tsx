import Link from 'next/link';
import { ChevronRight, Palette, User } from 'lucide-react';
import { Page, Stack, Card } from '@/components/ui';

const SECTIONS = [
  {
    href: '/dashboard/settings/profile',
    label: 'Profile',
    description: 'Your name, handle, avatar and bio',
    icon: User,
  },
  {
    href: '/dashboard/settings/aesthetic',
    label: 'Aesthetic',
    description: 'The theme applied across your dashboard and storefront',
    icon: Palette,
  },
];

export default function SettingsPage() {
  return (
    <Page title="Settings" description="Manage your account preferences." width="narrow">
      <Stack gap="sm">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className="block">
            <Card interactive className="flex items-center gap-4 group">
              <span className="shrink-0 w-10 h-10 rounded-[var(--radius-sm)] bg-elevated border border-line flex items-center justify-center text-text-muted">
                <s.icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text">{s.label}</p>
                <p className="text-[var(--text-caption)] text-text-secondary mt-0.5">
                  {s.description}
                </p>
              </div>
              <ChevronRight
                size={16}
                className="shrink-0 text-text-muted group-hover:translate-x-0.5 transition-transform"
              />
            </Card>
          </Link>
        ))}
      </Stack>
    </Page>
  );
}
