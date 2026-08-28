'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Package, Plus, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { InventoryProductCard } from '@/components/inventory/InventoryProductCard';
import { FilterSidebar } from '@/components/inventory/FilterSidebar';
import { CategoryBar } from '@/components/inventory/CategoryBar';
import { Page, Stat, Button, EmptyState, SkeletonGrid, Input, Alert } from '@/components/ui';

export default function ItemsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [status, setStatus] = useState('all');

  useEffect(() => {
    if (!session?.user) {
      if (session === null) setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/creator/items/all');
        const data = await res.json();
        if (cancelled) return;
        if (!data.success) throw new Error(data.error || 'Could not load your items');
        setItems(data.items ?? []);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const handleDelete = async (itemId: string) => {
    if (!confirm('Delete this item permanently?')) return;
    await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i._id !== itemId));
  };

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.tags?.[0] || 'Uncategorized'));
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.pageName?.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === 'All' || (item.tags?.[0] || 'Uncategorized') === selectedCategory;
      const price = item.price ?? 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesStatus = status === 'all' || (status === 'synced' && item.isForSale);
      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, priceRange, status]);

  const totalValue = items.reduce((acc, item) => acc + (item.price || 0), 0);
  const money = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  if (loading) {
    return (
      <Page title="Items" description="Everything across all of your spaces." width="wide">
        <SkeletonGrid count={8} />
      </Page>
    );
  }

  return (
    <Page
      title="Items"
      description="Everything across all of your spaces."
      width="wide"
      actions={
        /* An item belongs to a space, so creation starts there. This button
           used to push /dashboard/item/create — a route that does not exist. */
        <Link href="/dashboard">
          <Button iconLeft={<Plus size={16} />}>New item</Button>
        </Link>
      }
    >
      {error && <Alert tone="error" className="mb-6">{error}</Alert>}

      {/* The old strip also reported a "100% sync health" that nothing measured. */}
      <div className="grid gap-3 sm:grid-cols-2 mb-6 max-w-md">
        <Stat label="Items" value={items.length} icon={<Package size={16} />} />
        <Stat label="Catalogue value" value={money(totalValue)} />
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search your items…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search size={16} />}
          aria-label="Search items"
        />
      </div>

      <div className="flex gap-8">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          status={status}
          onStatusChange={setStatus}
        />

        <div className="flex-1 min-w-0 space-y-6">
          <CategoryBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <InventoryProductCard
                    key={item._id}
                    item={item}
                    onEdit={(id: string) => router.push(`/dashboard/item/${id}/edit`)}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState
              icon={<Search size={34} />}
              title={items.length === 0 ? 'No items yet' : 'Nothing matches those filters'}
              description={
                items.length === 0
                  ? 'Open one of your spaces and add your first item.'
                  : 'Try widening the search or clearing the filters.'
              }
              action={
                items.length === 0 ? (
                  <Link href="/dashboard">
                    <Button iconLeft={<Plus size={16} />}>Go to spaces</Button>
                  </Link>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceRange([0, Infinity]);
                      setStatus('all');
                      setSearchQuery('');
                    }}
                  >
                    Clear filters
                  </Button>
                )
              }
            />
          )}
        </div>
      </div>
    </Page>
  );
}
