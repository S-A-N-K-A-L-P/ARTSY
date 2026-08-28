'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Eye, Layout, Plus, Settings, Users } from 'lucide-react';
import Masonry from 'react-masonry-css';
import {
  Page,
  Section,
  Button,
  Stat,
  Badge,
  EmptyState,
  SkeletonGrid,
  Alert,
} from '@/components/ui';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    if (!session?.user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/creator/page');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Could not load your spaces');
      setPages(data.pages ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Derived from the spaces actually loaded, rather than the invented
  // "Elite / 4.2k impressions" that every account used to show.
  const totals = useMemo(() => {
    const followers = pages.reduce((n, p) => n + (p.stats?.followers ?? 0), 0);
    const views = pages.reduce((n, p) => n + (p.stats?.views ?? 0), 0);
    return { followers, views };
  }, [pages]);

  const compact = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);

  return (
    <Page
      title="Creator Studio"
      description="Your spaces, and how they are performing."
      width="wide"
      actions={
        <Link href="/dashboard/create">
          <Button iconLeft={<Plus size={16} />}>New space</Button>
        </Link>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3 mb-10">
        <Stat label="Spaces" value={pages.length} icon={<Layout size={16} />} />
        <Stat label="Followers" value={compact(totals.followers)} icon={<Users size={16} />} />
        <Stat label="Views" value={compact(totals.views)} icon={<Eye size={16} />} />
      </div>

      <Section title="Your spaces">
        {error && <Alert tone="error">{error}</Alert>}

        {loading ? (
          <SkeletonGrid count={4} />
        ) : pages.length === 0 ? (
          <EmptyState
            icon={<Layout size={34} />}
            title="No spaces yet"
            description="A space is a themed storefront for one body of work. Create your first to start publishing items."
            action={
              <Link href="/dashboard/create">
                <Button iconLeft={<Plus size={16} />}>Create your first space</Button>
              </Link>
            }
          />
        ) : (
          <Masonry
            breakpointCols={{ default: 4, 1536: 4, 1280: 3, 1024: 2, 640: 2 }}
            className="flex gap-4"
            columnClassName="flex flex-col"
          >
            {pages.map((page: any) => (
              <SpaceCard key={page._id} page={page} />
            ))}
          </Masonry>
        )}
      </Section>
    </Page>
  );
}

function SpaceCard({ page }: { page: any }) {
  const router = useRouter();

  // Ratios rather than fixed pixel heights, so tiles scale with the column.
  const ratio = useMemo(() => {
    const variants = ['4 / 3', '1 / 1', '3 / 4', '5 / 4'];
    let hash = 0;
    const id = String(page._id);
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return variants[hash % variants.length];
  }, [page._id]);

  const theme = page.aesthetic?.theme ?? page.aesthetic ?? 'minimal';
  const open = () => router.push(`/dashboard/page/${page._id}`);

  return (
    <article className="group mb-4">
      <div
        role="link"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        }}
        aria-label={page.name}
        className="relative w-full overflow-hidden cursor-pointer rounded-[var(--radius-lg)] bg-elevated border border-line transition-shadow duration-300 hover:shadow-[var(--elevation-medium)]"
        style={{ aspectRatio: ratio }}
      >
        {page.coverImage && (
          <img
            src={page.coverImage}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute top-3 left-3">
          <Badge tone="accent">{theme}</Badge>
        </span>
      </div>

      <div className="mt-2.5 px-0.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text line-clamp-1">{page.name}</h3>
          <p className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted mt-1">
            {page.type ?? 'gallery'}
            {page.stats?.views ? ` · ${page.stats.views} views` : ''}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/dashboard/page/${page._id}`);
          }}
          aria-label={`Manage ${page.name}`}
          className="shrink-0 p-1.5 -m-1.5 text-text-muted hover:text-text transition-colors"
        >
          <Settings size={17} />
        </button>
      </div>
    </article>
  );
}
