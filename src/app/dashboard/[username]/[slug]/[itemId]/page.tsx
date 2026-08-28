'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Package, ShoppingBag } from 'lucide-react';
import { resolveTheme } from '@/lib/theme/themes';
import { useCart } from '@/components/cart/CartProvider';
import {
  BreadcrumbNavigation,
  AttributeDataGrid,
  ItemDetailSidebarDesktop,
  StorefrontFooterDesktop,
} from '@/components/creator/CreatorDesktopUI';
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Section,
  Skeleton,
  Stack,
} from '@/components/ui';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { username, slug, itemId } = params as {
    username: string;
    slug: string;
    itemId: string;
  };
  const { addToCart } = useCart();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!itemId) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/item?id=${itemId}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.success) setItem(data.item);
      } catch (err) {
        console.error('Fetch Item Error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [itemId]);

  // Scoped, not persisted — see the note in the parent space page.
  const theme = resolveTheme(item?.aesthetic);

  const images: string[] = useMemo(
    () => (item?.images?.length ? item.images : []).filter(Boolean),
    [item]
  );

  const specs = useMemo(() => {
    const merged: Record<string, string> = { ...(item?.attributes ?? {}) };
    (item?.customFields ?? []).forEach((f: any) => {
      if (f?.value) merged[f.label || f.key] = String(f.value);
    });
    return merged;
  }, [item]);

  const money = (n?: number) => `₹${Number(n ?? 0).toLocaleString('en-IN')}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-bg px-5 md:px-10 py-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-[4/5]" />
          <Stack gap="md">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-40" />
          </Stack>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <EmptyState
          icon={<Package size={34} />}
          title="Item not found"
          description="It may have been removed from this space."
          action={
            <Link href={`/dashboard/${username}/${slug}`}>
              <Button>Back to the space</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const isPurchasable = item.isForSale !== false && (item.price ?? 0) > 0;

  return (
    <div
      data-theme={theme}
      style={{ fontFamily: 'var(--font)' }}
      className="min-h-screen bg-bg text-text"
    >
      <div className="hidden md:block px-10 pt-8">
        <BreadcrumbNavigation
          paths={[
            { label: `@${username}`, href: `/dashboard/${username}` },
            { label: slug, href: `/dashboard/${username}/${slug}` },
            { label: item.title },
          ]}
        />
      </div>

      <header className="md:hidden px-5 h-16 flex items-center gap-3 sticky top-0 bg-bg/90 backdrop-blur-xl z-40 border-b border-line">
        <button
          onClick={() => router.push(`/dashboard/${username}/${slug}`)}
          aria-label="Back to the space"
          className="p-2 -ml-2 text-text-muted hover:text-text transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-bold tracking-tight truncate">{item.title}</h1>
      </header>

      <main className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-12 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="space-y-3">
          <div className="aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-elevated border border-line">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted">
                <Package size={40} className="opacity-40" />
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === activeImage}
                  className={
                    i === activeImage
                      ? 'aspect-square rounded-[var(--radius-sm)] overflow-hidden border-2 border-accent'
                      : 'aspect-square rounded-[var(--radius-sm)] overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-opacity'
                  }
                >
                  <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <Stack gap="lg">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {item.aesthetic && <Badge tone="accent">{item.aesthetic}</Badge>}
                {(item.tags ?? []).map((t: string) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-text leading-tight">
                {item.title}
              </h2>
              {item.description && (
                <p className="mt-3 text-base text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {isPurchasable && (
              <Card>
                <div className="flex items-end justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
                      Price
                    </p>
                    <p className="mt-1 text-3xl font-black tabular-nums tracking-tight text-text">
                      {money(item.price)}
                    </p>
                  </div>
                </div>
                {/* This button was inert — "Acquire Aesthetic" with no handler,
                    under a claim of "Authenticity Guaranteed via Astl Protocol"
                    that nothing backs. It adds to the cart now. */}
                <Button
                  block
                  size="lg"
                  iconLeft={<ShoppingBag size={16} />}
                  onClick={() =>
                    addToCart({
                      id: item._id,
                      title: item.title,
                      price: item.price,
                      image: images[0],
                    })
                  }
                >
                  Add to bag
                </Button>
              </Card>
            )}

            {Object.keys(specs).length > 0 && (
              <Section title="Specifications">
                <AttributeDataGrid attributes={specs} />
              </Section>
            )}

            <ItemDetailSidebarDesktop item={{ ...item, owner: username }} />
          </Stack>
        </div>
      </main>

      <StorefrontFooterDesktop />
    </div>
  );
}
