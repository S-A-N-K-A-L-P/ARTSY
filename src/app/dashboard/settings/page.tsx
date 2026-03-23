'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const SETTINGS_SECTIONS = [
  { href: '/dashboard/settings/profile', label: 'Profile', description: 'Manage your name, avatar, and bio' },
  { href: '/dashboard/settings/aesthetic', label: 'Aesthetic', description: 'Change your default theme across pages' },
];

export default function SettingsPage() {
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold text-white mb-1">Settings</h2>
      <p className="text-sm text-zinc-500 mb-8">Manage your account preferences.</p>

      <div className="space-y-2">
        {SETTINGS_SECTIONS.map(section => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-colors group"
          >
            <div>
              <p className="text-sm font-medium text-white">{section.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{section.description}</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
