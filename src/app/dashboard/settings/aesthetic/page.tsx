'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ChevronLeft } from 'lucide-react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import { themes, ThemeName } from '@/lib/theme/themes';
import { Page, Button, CardButton } from '@/components/ui';

export default function AestheticSettingsPage() {
  const { aesthetic, setAesthetic } = useAesthetic();
  const themeList = Object.entries(themes) as [ThemeName, Record<string, string>][];

  return (
    <Page
      title="Visual identity"
      description="The aesthetic applied across your dashboard and your public storefront."
      actions={
        <Link href="/dashboard/settings">
          <Button variant="ghost" size="sm" iconLeft={<ChevronLeft size={15} />}>
            Settings
          </Button>
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {themeList.map(([name, theme]) => {
          const selected = aesthetic === name;
          return (
            <CardButton key={name} selected={selected} onClick={() => setAesthetic(name)}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <h2 className="text-base font-bold capitalize text-text truncate">{name}</h2>
                  <p className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted mt-0.5">
                    {theme['--font']?.includes('mono') ? 'Monospace' : theme['--font']?.includes('serif') ? 'Serif' : 'Sans'}
                  </p>
                </div>
                <span
                  className={
                    selected
                      ? 'shrink-0 w-7 h-7 rounded-full bg-accent text-on-accent flex items-center justify-center'
                      : 'shrink-0 w-7 h-7 rounded-full border border-line-strong'
                  }
                >
                  {selected && <Check size={14} />}
                </span>
              </div>

              {/*
                Preview painted with that theme's own tokens, not the active
                ones. This previously read theme["--bg"], a key no theme has,
                so every swatch fell back to #000 and all nine looked identical.
              */}
              <div
                className="rounded-[var(--radius-md)] border p-4 flex items-center gap-3"
                style={{
                  backgroundColor: theme['--bg-primary'],
                  borderColor: theme['--border-subtle'],
                  fontFamily: theme['--font'],
                }}
              >
                <span
                  className="w-9 h-9 shrink-0"
                  style={{ backgroundColor: theme['--accent'], borderRadius: theme['--radius'] }}
                />
                <span className="flex-1 min-w-0 space-y-1.5">
                  <span
                    className="block h-2 rounded-full w-3/4"
                    style={{ backgroundColor: theme['--text-primary'] }}
                  />
                  <span
                    className="block h-2 rounded-full w-1/2"
                    style={{ backgroundColor: theme['--text-muted'] }}
                  />
                </span>
                <span
                  className="w-12 h-7 shrink-0"
                  style={{
                    backgroundColor: theme['--bg-secondary'],
                    border: `1px solid ${theme['--border-strong']}`,
                    borderRadius: theme['--radius'],
                  }}
                />
              </div>
            </CardButton>
          );
        })}
      </div>
    </Page>
  );
}
