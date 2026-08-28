'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Layers, Package, Search, ShoppingBag, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEME_NAMES, themes, resolveTheme } from '@/lib/theme/themes';
import { useCart } from '@/components/cart/CartProvider';
import {
  Page,
  Tabs,
  Input,
  Badge,
  Avatar,
  Button,
  EmptyState,
  SkeletonGrid,
  Alert,
} from '@/components/ui';

type Mode = 'spaces' | 'items' | 'creators';
const ALL = 'all';

const money = (n?: number) => `₹${Number(n ?? 0).toLocaleString('en-IN')}`;

/** Stable per-id ratio so tiles keep their shape across renders. */
function ratioFor(id: string) {
  const variants = ['3 / 4', '1 / 1', '4 / 5', '2 / 3', '5 / 6'];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return variants[hash % variants.length];
}

/**
 * Explore.
 *
 * This route was `return <h1>Explore</h1>` while three public surfaces linked
 * to it — the marketing navbar, the hero's "Explore Creators" and the CTA's
 * "Explore Platform". It was also behind the auth matcher, so a logged-out
 * visitor following any of those links landed on /login instead.
 *
 * The organising idea is the product's own: aesthetic is the category. The
 * filter is the primary control, and every result is painted in its own
 * aesthetic so the board shows you what each one actually looks like.
 */
export default function ExplorePage() {
  const [mode, setMode] = useState<Mode>('spaces');
  const [aesthetic, setAesthetic] = useState<string>(ALL);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Record<Mode, any[]>>({ spaces: [], items: [], creators: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (m: Mode) => {
    setLoading(true);
    setError(null);
    const url =
      m === 'spaces' ? '/api/discovery/pages' : m === 'items' ? '/api/items' : '/api/users';
    try {
      const res = await fetch(url);
      const json = await res.json();
      const list = Array.isArray(json) ? json : (json.pages ?? json.items ?? json.users ?? []);
      setData((d) => ({ ...d, [m]: list }));
    } catch {
      setError('Could not load discovery right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(mode);
  }, [mode, load]);

  const rows = data[mode];

  const themeOf = useCallback(
    (row: any): string => {
      if (mode === 'spaces') return resolveTheme(row.aesthetic?.theme ?? row.aesthetic);
      if (mode === 'items') return resolveTheme(row.aesthetic ?? row.pageId?.aesthetic?.theme);
      return resolveTheme(row.aesthetic?.name);
    },
    [mode]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row: any) => {
      if (aesthetic !== ALL && themeOf(row) !== aesthetic) return false;
      if (!q) return true;
      const haystack =
        mode === 'creators'
          ? `${row.username ?? ''} ${row.profile?.name ?? ''}`
          : `${row.name ?? row.title ?? ''} ${row.ownerId?.username ?? ''}`;
      return haystack.toLowerCase().includes(q);
    });
  }, [rows, aesthetic, query, themeOf, mode]);

  // Only offer aesthetics that actually have something behind them.
  const availableAesthetics = useMemo(() => {
    const present = new Set(rows.map(themeOf));
    return THEME_NAMES.filter((t) => present.has(t));
  }, [rows, themeOf]);

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="px-5 md:px-10 py-8 md:py-12">
        <Page
          title="Explore"
          description="Browse by aesthetic. Every space, item and creator carries its own."
          width="wide"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Tabs
              items={[
                { id: 'spaces', label: 'Spaces', icon: <Layers size={14} /> },
                { id: 'items', label: 'Items', icon: <Package size={14} /> },
                { id: 'creators', label: 'Creators', icon: <Users size={14} /> },
              ]}
              value={mode}
              onChange={(id) => setMode(id as Mode)}
            />
            <div className="flex-1 min-w-[220px]">
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${mode}…`}
                icon={<Search size={16} />}
                aria-label={`Search ${mode}`}
              />
            </div>
          </div>

          {availableAesthetics.length > 0 && (
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-8 -mx-1 px-1">
              <AestheticChip
                label="All"
                active={aesthetic === ALL}
                onClick={() => setAesthetic(ALL)}
              />
              {availableAesthetics.map((t) => (
                <AestheticChip
                  key={t}
                  label={t}
                  swatch={themes[t]['--accent']}
                  active={aesthetic === t}
                  onClick={() => setAesthetic(t)}
                />
              ))}
            </div>
          )}

          {error && <Alert tone="error" className="mb-6">{error}</Alert>}

          {loading ? (
            <SkeletonGrid count={10} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Search size={34} />}
              title={rows.length === 0 ? `No ${mode} published yet` : 'Nothing matches'}
              description={
                rows.length === 0
                  ? 'Come back once creators have published.'
                  : 'Try a different aesthetic or clear the search.'
              }
              action={
                rows.length > 0 ? (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setAesthetic(ALL);
                      setQuery('');
                    }}
                  >
                    Clear filters
                  </Button>
                ) : undefined
              }
            />
          ) : mode === 'creators' ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((u: any) => (
                <CreatorCard key={u._id} user={u} theme={themeOf(u)} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
              {filtered.map((row: any) => (
                <ResultCard key={row._id} row={row} mode={mode} theme={themeOf(row)} />
              ))}
            </div>
          )}
        </Page>
      </div>
    </div>
  );
}

function AestheticChip({
  label,
  swatch,
  active,
  onClick,
}: {
  label: string;
  swatch?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'h-10 pl-2.5 pr-4 rounded-full border shrink-0 inline-flex items-center gap-2 transition-colors',
        'text-[var(--text-label)] font-bold uppercase tracking-[0.12em]',
        active
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-line bg-card text-text-muted hover:text-text'
      )}
    >
      {swatch ? (
        <span
          className="w-4 h-4 rounded-full border border-line shrink-0"
          style={{ backgroundColor: swatch }}
        />
      ) : null}
      {label}
    </button>
  );
}

/**
 * Each card is stamped with the aesthetic it belongs to, so the grid is a
 * genuine preview of what that theme looks like rather than a uniform tile.
 */
function ResultCard({ row, mode, theme }: { row: any; mode: Mode; theme: string }) {
  const { addToCart } = useCart();
  const isSpace = mode === 'spaces';
  const owner = row.ownerId ?? {};
  const image = isSpace ? row.coverImage : row.images?.[0];
  const title = isSpace ? row.name : row.title;
  const href =
    isSpace && owner.username && row.slug
      ? `/user/${owner.username}/${row.slug}`
      : owner.username && row.pageId?.slug
        ? `/user/${owner.username}/${row.pageId.slug}`
        : owner.username
          ? `/user/${owner.username}`
          : '#';

  return (
    <Link href={href} className="group block">
      <article data-theme={theme} style={{ fontFamily: 'var(--font)' }}>
        <div
          className="relative w-full overflow-hidden rounded-2xl bg-elevated"
          style={{ aspectRatio: ratioFor(String(row._id)) }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
          <span className="absolute top-2.5 left-2.5 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge tone="accent">{theme}</Badge>
          </span>

          {!isSpace && row.price > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({
                  id: row._id,
                  title: row.title,
                  price: row.price,
                  image: row.images?.[0],
                });
              }}
              aria-label={`Add ${row.title} to bag`}
              className="absolute top-2.5 right-2.5 h-9 px-4 rounded-full flex items-center gap-1.5 text-[11px] font-bold tracking-tight active:scale-95 transition-all [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
            >
              <ShoppingBag size={14} />
              Add to bag
            </button>
          )}
          {!isSpace && row.price > 0 && (
            <span
              className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-bold tabular-nums"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
            >
              {money(row.price)}
            </span>
          )}
        </div>

        <div className="mt-2 px-0.5">
          <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 text-text">{title}</h3>
          {owner.username && (
            <p className="mt-1 text-[11px] font-medium text-text-muted truncate">
              {owner.username}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

function CreatorCard({ user, theme }: { user: any; theme: string }) {
  return (
    <Link href={`/user/${user.username}`} className="group block">
      <article
        data-theme={theme}
        style={{ fontFamily: 'var(--font)' }}
        className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-card border border-line transition-colors hover:border-line-strong"
      >
        <Avatar src={user.profile?.avatar} name={user.profile?.name ?? user.username} size="md" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text truncate">
            {user.profile?.name || user.username}
          </p>
          <p className="text-[11px] text-text-muted truncate">{user.username}</p>
        </div>
        <Badge tone="accent">{theme}</Badge>
      </article>
    </Link>
  );
}
