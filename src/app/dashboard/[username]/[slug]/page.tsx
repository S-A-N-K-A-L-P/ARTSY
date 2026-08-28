'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Package } from 'lucide-react';
import { resolveTheme } from '@/lib/theme/themes';
import {
  SidebarFilterPanel,
  MasonryGridDesktop,
  StorefrontFooterDesktop,
  BreadcrumbNavigation,
  HoverPreviewCard,
} from '@/components/creator/CreatorDesktopUI';
import { CategoryScrollerMobile } from '@/components/creator/CreatorMobileUI';
import { Button, EmptyState, SkeletonGrid, Skeleton, Stack } from '@/components/ui';

const ALL = 'All';

export default function CollectionViewPage() {
  const params = useParams();
  const router = useRouter();
  const { username, slug } = params as { username: string; slug: string };

  const [page, setPage] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState(ALL);

  useEffect(() => {
    if (!username || !slug) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/page?username=${username}&slug=${slug}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.success) {
          setPage(data.page);
          setItems(data.items ?? []);
        }
      } catch (err) {
        console.error('Fetch Page Error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [username, slug]);

  /*
   * Scoped to this subtree rather than pushed into global state.
   *
   * This called setAesthetic(data.page.aesthetic), which persists via
   * PUT /api/user/aesthetic — viewing a space rewrote the visitor's own saved
   * theme. It also passed the whole aesthetic object where a theme name was
   * expected, so it actually reset you to 'soft'.
   */
  const theme = resolveTheme(page?.aesthetic?.theme ?? page?.aesthetic);

  // Categories from the items that exist, not a hardcoded
  // ['All Pieces','Clothing','Art','Furniture','Digital'] that filtered nothing.
  const categories = useMemo(() => {
    const tags = new Set<string>();
    items.forEach((i: any) => (i.tags ?? []).forEach((t: string) => t?.trim() && tags.add(t.trim())));
    return [ALL, ...Array.from(tags).sort()];
  }, [items]);

  const visibleItems = useMemo(
    () =>
      selectedCat === ALL
        ? items
        : items.filter((i: any) => (i.tags ?? []).includes(selectedCat)),
    [items, selectedCat]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-bg px-6 md:px-10 py-10">
        <Stack gap="lg">
          <Skeleton className="h-14 w-80" />
          <SkeletonGrid count={6} />
        </Stack>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <EmptyState
          icon={<Package size={34} />}
          title="Space not found"
          description="This space may have been removed or made private."
          action={
            <Link href={`/dashboard/${username}`}>
              <Button>Back to profile</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      style={{ fontFamily: 'var(--font)' }}
      className="min-h-screen bg-bg text-text"
    >
      <div className="hidden md:block px-10 pt-8">
        <BreadcrumbNavigation
          paths={[{ label: `@${username}`, href: `/dashboard/${username}` }, { label: page.name }]}
        />
      </div>

      <header className="md:hidden px-5 h-16 flex items-center gap-3 sticky top-0 bg-bg/90 backdrop-blur-xl z-40 border-b border-line">
        <button
          onClick={() => router.push(`/dashboard/${username}`)}
          aria-label="Back to profile"
          className="p-2 -ml-2 text-text-muted hover:text-text transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-bold tracking-tight truncate">{page.name}</h1>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 md:px-10 pb-24">
        <div className="py-10 md:py-14 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-text">{page.name}</h2>
          {page.description && (
            <p className="mt-3 text-base text-text-secondary leading-relaxed">{page.description}</p>
          )}
        </div>

        <div className="flex flex-col xl:flex-row gap-10">
          {categories.length > 1 && (
            <SidebarFilterPanel
              categories={categories}
              selectedCat={selectedCat}
              onSelect={setSelectedCat}
            />
          )}

          <div className="flex-1 min-w-0 space-y-6">
            {categories.length > 1 && (
              <div className="xl:hidden">
                <CategoryScrollerMobile
                  cats={categories}
                  selected={selectedCat}
                  onSelect={setSelectedCat}
                />
              </div>
            )}

            {visibleItems.length > 0 ? (
              /* One grid for every width. The old page rendered a desktop
                 masonry and a second mobile masonry of the same items, so both
                 trees mounted and the item list was built twice. */
              <MasonryGridDesktop>
                {visibleItems.map((item: any) => (
                  <HoverPreviewCard
                    key={item._id}
                    item={item}
                    onClick={() => router.push(`/dashboard/${username}/${slug}/${item._id}`)}
                  />
                ))}
              </MasonryGridDesktop>
            ) : (
              <EmptyState
                icon={<Package size={34} />}
                title={items.length === 0 ? 'Nothing here yet' : `Nothing tagged “${selectedCat}”`}
                description={
                  items.length === 0
                    ? 'This space has no items published.'
                    : 'Try another category.'
                }
                action={
                  selectedCat !== ALL ? (
                    <Button variant="secondary" onClick={() => setSelectedCat(ALL)}>
                      Show everything
                    </Button>
                  ) : undefined
                }
              />
            )}
          </div>
        </div>
      </main>

      <StorefrontFooterDesktop />
    </div>
  );
}
