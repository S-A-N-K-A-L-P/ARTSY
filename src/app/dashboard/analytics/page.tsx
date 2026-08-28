'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { BarChart3, Eye, Layers, Package, Plus, Users } from 'lucide-react';
import {
  Page,
  Section,
  Card,
  Stat,
  Table,
  Td,
  Badge,
  Button,
  EmptyState,
  Alert,
  Skeleton,
  Stack,
} from '@/components/ui';

/**
 * Analytics.
 *
 * This route was `return <h1>Analytics</h1>` while the sidebar linked to it,
 * so the nav had a dead destination. Everything here is derived from the
 * creator's real pages and items — there is no analytics pipeline in this
 * codebase, so inventing engagement curves would be worse than showing the
 * counts that genuinely exist.
 */
export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [pages, setPages] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) {
      if (session === null) setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [pRes, iRes] = await Promise.all([
          fetch('/api/creator/page'),
          fetch('/api/creator/items/all'),
        ]);
        const [pData, iData] = await Promise.all([pRes.json(), iRes.json()]);
        if (cancelled) return;
        setPages(pData.pages ?? []);
        setItems(iData.items ?? []);
      } catch {
        if (!cancelled) setError('Could not load your analytics');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const totals = useMemo(() => {
    const views = pages.reduce((n, p) => n + (p.stats?.views ?? 0), 0);
    const followers = pages.reduce((n, p) => n + (p.stats?.followers ?? 0), 0);
    const forSale = items.filter((i) => i.isForSale !== false && (i.price ?? 0) > 0);
    const value = forSale.reduce((n, i) => n + (i.price ?? 0), 0);
    return { views, followers, value, listed: forSale.length };
  }, [pages, items]);

  const money = (n: number) => `₹${n.toLocaleString('en-IN')}`;
  const compact = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);

  // Ranked by real views so the table says something.
  const ranked = useMemo(
    () =>
      [...pages].sort((a, b) => (b.stats?.views ?? 0) - (a.stats?.views ?? 0)),
    [pages]
  );

  const itemsPerPage = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((i) => {
      const id = i.pageId?._id ?? i.pageId;
      if (id) map.set(String(id), (map.get(String(id)) ?? 0) + 1);
    });
    return map;
  }, [items]);

  if (loading) {
    return (
      <Page title="Analytics" description="How your spaces are performing." width="wide">
        <Stack gap="lg">
          <div className="grid gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
          <Skeleton className="h-64" />
        </Stack>
      </Page>
    );
  }

  return (
    <Page title="Analytics" description="How your spaces are performing." width="wide">
      {error && <Alert tone="error">{error}</Alert>}

      {pages.length === 0 ? (
        <EmptyState
          icon={<BarChart3 size={34} />}
          title="Nothing to measure yet"
          description="Analytics appear once you have a space with items in it."
          action={
            <Link href="/dashboard/create">
              <Button iconLeft={<Plus size={16} />}>Create a space</Button>
            </Link>
          }
        />
      ) : (
        <Stack gap="lg">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Total views" value={compact(totals.views)} icon={<Eye size={16} />} />
            <Stat label="Followers" value={compact(totals.followers)} icon={<Users size={16} />} />
            <Stat label="Items listed" value={totals.listed} icon={<Package size={16} />} />
            <Stat label="Catalogue value" value={money(totals.value)} icon={<Layers size={16} />} />
          </div>

          <Section
            title="Spaces by views"
            description="Ranked by the view count recorded on each space."
          >
            <Table head={['Space', 'Type', 'Aesthetic', 'Items', 'Followers', 'Views']}>
              {ranked.map((p) => (
                <tr key={p._id}>
                  <Td>
                    <Link
                      href={`/dashboard/page/${p._id}`}
                      className="font-semibold hover:text-accent transition-colors"
                    >
                      {p.name}
                    </Link>
                  </Td>
                  <Td className="text-text-secondary">{p.type ?? 'gallery'}</Td>
                  <Td>
                    <Badge tone="accent">{p.aesthetic?.theme ?? p.aesthetic ?? 'minimal'}</Badge>
                  </Td>
                  <Td className="tabular-nums">{itemsPerPage.get(String(p._id)) ?? 0}</Td>
                  <Td className="tabular-nums">{p.stats?.followers ?? 0}</Td>
                  <Td className="tabular-nums font-semibold">{p.stats?.views ?? 0}</Td>
                </tr>
              ))}
            </Table>
          </Section>

          <Card>
            <p className="text-[var(--text-caption)] text-text-secondary">
              These figures come from the counters stored on each space and item. There is no
              event-tracking pipeline behind them yet, so they will not change until something
              writes to those counters.
            </p>
          </Card>
        </Stack>
      )}
    </Page>
  );
}
