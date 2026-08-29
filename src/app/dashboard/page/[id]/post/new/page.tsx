'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ChevronLeft, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Page,
  Stack,
  Card,
  Field,
  Input,
  Textarea,
  Button,
  Label,
  Alert,
  EmptyState,
  Skeleton,
} from '@/components/ui';

const TYPES = ['showcase', 'drop', 'gallery', 'editorial'];
const LAYOUTS = ['grid', 'list', 'masonry', 'carousel'];

export default function CreatePostPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    caption: '',
    type: 'showcase',
    layout: 'grid',
    selectedItemIds: [] as string[],
  });

  useEffect(() => {
    fetch(`/api/creator/item?pageId=${pageId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setItems(data.items ?? []);
      })
      .catch(() => setError('Could not load this space’s items'))
      .finally(() => setFetchingItems(false));
  }, [pageId]);

  const toggleItem = (itemId: string) =>
    setForm((f) => ({
      ...f,
      selectedItemIds: f.selectedItemIds.includes(itemId)
        ? f.selectedItemIds.filter((id) => id !== itemId)
        : [...f.selectedItemIds, itemId],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || form.selectedItemIds.length === 0) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/creator/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          title: form.title,
          caption: form.caption,
          type: form.type,
          layout: form.layout,
          itemIds: form.selectedItemIds,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Could not create the post');
      router.push(`/dashboard/page/${pageId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  const Chips = ({
    options,
    value,
    onChange,
    label,
  }: {
    options: string[];
    value: string;
    onChange: (v: string) => void;
    label: string;
  }) => (
    <div className="space-y-2.5">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = value === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(o)}
              className={cn(
                'h-10 px-4 rounded-full border transition-colors',
                'text-[var(--text-label)] font-bold uppercase tracking-[0.12em]',
                selected
                  ? 'border-accent bg-accent-soft text-accent-text'
                  : 'border-line bg-card text-text-muted hover:text-text'
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Page
      title="New post"
      description="A post groups items into a drop, showcase or editorial."
      width="narrow"
      actions={
        <Link href={`/dashboard/page/${pageId}`}>
          <Button variant="ghost" size="sm" iconLeft={<ChevronLeft size={15} />}>
            Space
          </Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          {error && <Alert tone="error">{error}</Alert>}

          <Card>
            <Stack gap="md">
              <Field label="Title" required>
                {(id) => (
                  <Input
                    id={id}
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Winter drop"
                    autoFocus
                  />
                )}
              </Field>

              <Field label="Caption">
                {(id) => (
                  <Textarea
                    id={id}
                    rows={3}
                    value={form.caption}
                    onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
                    placeholder="What ties these pieces together?"
                  />
                )}
              </Field>

              <Chips
                label="Type"
                options={TYPES}
                value={form.type}
                onChange={(v) => setForm((f) => ({ ...f, type: v }))}
              />
              <Chips
                label="Layout"
                options={LAYOUTS}
                value={form.layout}
                onChange={(v) => setForm((f) => ({ ...f, layout: v }))}
              />
            </Stack>
          </Card>

          <Card>
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <Label>Items</Label>
              <span className="text-[var(--text-caption)] text-text-muted tabular-nums">
                {form.selectedItemIds.length} selected
              </span>
            </div>

            {fetchingItems ? (
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <EmptyState
                icon={<FileText size={30} />}
                title="No items to feature"
                description="Add items to this space before grouping them into a post."
                action={
                  <Link href={`/dashboard/page/${pageId}/item/new`}>
                    <Button>Add an item</Button>
                  </Link>
                }
              />
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {items.map((item: any) => {
                  const selected = form.selectedItemIds.includes(item._id);
                  return (
                    <button
                      key={item._id}
                      type="button"
                      aria-pressed={selected}
                      aria-label={item.title}
                      onClick={() => toggleItem(item._id)}
                      className={cn(
                        'relative aspect-square rounded-[var(--radius-md)] overflow-hidden border-2 transition-colors',
                        selected ? 'border-accent' : 'border-transparent hover:border-line-strong'
                      )}
                    >
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="w-full h-full bg-elevated flex items-center justify-center text-[var(--text-caption)] text-text-muted px-2 text-center">
                          {item.title}
                        </span>
                      )}
                      {selected && (
                        <span className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-accent text-on-accent flex items-center justify-center">
                          <Check size={13} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </Card>

          <div className="flex items-center justify-end gap-3">
            <Link href={`/dashboard/page/${pageId}`}>
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button
              type="submit"
              size="lg"
              loading={loading}
              disabled={!form.title || form.selectedItemIds.length === 0}
            >
              Create post
            </Button>
          </div>
        </Stack>
      </form>
    </Page>
  );
}
