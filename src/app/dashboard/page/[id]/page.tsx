'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Eye, FileText, Package, Plus, Settings } from 'lucide-react';
import { ItemGrid } from '@/components/items/ItemGrid';
import {
  Page,
  Section,
  Stack,
  Card,
  Button,
  Badge,
  Tabs,
  Avatar,
  EmptyState,
  SkeletonGrid,
  Skeleton,
  Alert,
  Field,
  Input,
  Textarea,
  Label,
} from '@/components/ui';

type Tab = 'items' | 'feed' | 'settings';

export default function PageHubPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const [page, setPage] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('items');
  const [settings, setSettings] = useState({ name: '', description: '', coverImage: '' });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [pageRes, itemRes, postRes] = await Promise.all([
          fetch('/api/creator/page'),
          fetch(`/api/creator/item?pageId=${pageId}`),
          fetch(`/api/creator/post?pageId=${pageId}`),
        ]);
        const [pageData, itemData, postData] = await Promise.all([
          pageRes.json(),
          itemRes.json(),
          postRes.json(),
        ]);
        if (cancelled) return;
        if (pageData.success) {
          const found = pageData.pages.find((p: any) => p._id === pageId) ?? null;
          setPage(found);
          if (found) {
            setSettings({
              name: found.name ?? '',
              description: found.description ?? '',
              coverImage: found.coverImage ?? '',
            });
          }
        }
        if (itemData.success) setItems(itemData.items ?? []);
        if (postData.success) setPosts(postData.posts ?? []);
      } catch {
        if (!cancelled) setError('Could not load this space');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pageId]);

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setError(null);
    setSettingsSaved(false);
    try {
      const res = await fetch(`/api/creator/page/${pageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Could not save this space');
      setPage(data.page);
      setSettingsSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i._id !== itemId));
  };

  const theme = page?.aesthetic?.theme ?? page?.aesthetic ?? 'minimal';

  /*
   * The public storefront lives at /user/[username]/[slug]. The "View public"
   * link pointed at /user/[slug], which is a different route shape and 404'd.
   */
  const publicHref = useMemo(() => {
    const username = page?.ownerId?.username;
    return username && page?.slug ? `/user/${username}/${page.slug}` : null;
  }, [page]);

  if (loading) {
    return (
      <Page width="wide">
        <Stack gap="lg">
          <Skeleton className="h-16 w-72" />
          <SkeletonGrid count={6} />
        </Stack>
      </Page>
    );
  }

  if (!page) {
    return (
      <Page width="narrow">
        <EmptyState
          icon={<Package size={34} />}
          title="Space not found"
          description={error ?? 'This space may have been deleted.'}
          action={
            <Link href="/dashboard">
              <Button>Back to spaces</Button>
            </Link>
          }
        />
      </Page>
    );
  }

  const TABS = [
    { id: 'items', label: 'Items', icon: <Package size={14} /> },
    { id: 'feed', label: 'Posts', icon: <FileText size={14} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
  ];

  return (
    <Page
      width="wide"
      actions={
        <>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" iconLeft={<ChevronLeft size={15} />}>
              Spaces
            </Button>
          </Link>
          {publicHref && (
            <Link href={publicHref}>
              <Button variant="secondary" size="sm" iconLeft={<Eye size={14} />}>
                View public
              </Button>
            </Link>
          )}
        </>
      }
    >
      {error && <Alert tone="error" className="mb-6">{error}</Alert>}

      <div className="flex items-center gap-4 mb-8">
        <Avatar src={page.coverImage} name={page.name} size="lg" />
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-text truncate">
            {page.name}
          </h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <Badge tone="accent">{theme}</Badge>
            <Badge>{page.type ?? 'gallery'}</Badge>
            <Badge tone={page.settings?.isPublic !== false ? 'success' : 'neutral'}>
              {page.settings?.isPublic !== false ? 'Public' : 'Private'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Tabs items={TABS} value={activeTab} onChange={(id) => setActiveTab(id as Tab)} />
      </div>

      {activeTab === 'items' && (
        <Section
          title={`${items.length} item${items.length === 1 ? '' : 's'}`}
          actions={
            <Link href={`/dashboard/page/${pageId}/item/new`}>
              <Button size="sm" iconLeft={<Plus size={15} />}>
                Add item
              </Button>
            </Link>
          }
        >
          {items.length === 0 ? (
            <EmptyState
              icon={<Package size={34} />}
              title="No items yet"
              description="Items are the things people browse and buy in this space."
              action={
                <Link href={`/dashboard/page/${pageId}/item/new`}>
                  <Button iconLeft={<Plus size={16} />}>Add your first item</Button>
                </Link>
              }
            />
          ) : (
            <ItemGrid
              items={items.map((i) => ({
                id: i._id,
                title: i.title,
                price: i.price,
                image: i.images?.[0] || '',
                author: page.ownerId?.username || 'creator',
              }))}
              isOwner
              aesthetic={theme}
            />
          )}
        </Section>
      )}

      {activeTab === 'feed' && (
        <Section
          title={`${posts.length} post${posts.length === 1 ? '' : 's'}`}
          actions={
            <Link href={`/dashboard/page/${pageId}/post/new`}>
              <Button size="sm" iconLeft={<Plus size={15} />}>
                Add post
              </Button>
            </Link>
          }
        >
          {posts.length === 0 ? (
            <EmptyState
              icon={<FileText size={34} />}
              title="No posts yet"
              description="A post groups items into a drop, showcase or editorial."
              action={
                <Link href={`/dashboard/page/${pageId}/post/new`}>
                  <Button iconLeft={<Plus size={16} />}>Create a post</Button>
                </Link>
              }
            />
          ) : (
            <Stack gap="sm">
              {posts.map((post: any) => (
                <Card key={post._id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-text">{post.title}</h3>
                      <p className="text-[var(--text-caption)] text-text-muted mt-0.5">
                        {post.type ?? 'showcase'} · {post.itemIds?.length ?? 0} items
                      </p>
                    </div>
                    <Badge>{post.visibility ?? 'public'}</Badge>
                  </div>
                  {post.caption && (
                    <p className="text-sm text-text-secondary mt-3">{post.caption}</p>
                  )}
                  <div className="flex items-center gap-5 mt-4 pt-3 border-t border-line text-[var(--text-caption)] text-text-muted tabular-nums">
                    <span>{post.engagement?.likes ?? 0} likes</span>
                    <span>{post.engagement?.comments ?? 0} comments</span>
                  </div>
                </Card>
              ))}
            </Stack>
          )}
        </Section>
      )}

      {activeTab === 'settings' && (
        <Section title="Space settings" description="Changes apply to your public storefront.">
          {/*
            This tab used to be read-only because no endpoint existed to update
            a space — the only page-update route handled `aesthetic` alone. With
            PATCH /api/creator/page/[id] in place it is a real form, which is
            also how a space with no cover image gets one.
          */}
          <form onSubmit={saveSettings}>
            <Stack gap="md">
              {settingsSaved && <Alert tone="success">Space saved.</Alert>}

              <Card>
                <Stack gap="md">
                  <Field label="Name" required>
                    {(id) => (
                      <Input
                        id={id}
                        value={settings.name}
                        onChange={(e) => {
                          setSettingsSaved(false);
                          setSettings((f) => ({ ...f, name: e.target.value }));
                        }}
                      />
                    )}
                  </Field>

                  <Field label="Description">
                    {(id) => (
                      <Textarea
                        id={id}
                        rows={3}
                        value={settings.description}
                        onChange={(e) => {
                          setSettingsSaved(false);
                          setSettings((f) => ({ ...f, description: e.target.value }));
                        }}
                        placeholder="What lives in this space?"
                      />
                    )}
                  </Field>

                  <Field
                    label="Cover image URL"
                    hint="Shown on the feed, on Explore and at the top of your storefront."
                  >
                    {(id, describedBy) => (
                      <Input
                        id={id}
                        aria-describedby={describedBy}
                        value={settings.coverImage}
                        onChange={(e) => {
                          setSettingsSaved(false);
                          setSettings((f) => ({ ...f, coverImage: e.target.value }));
                        }}
                        placeholder="https://…"
                        inputMode="url"
                      />
                    )}
                  </Field>

                  {settings.coverImage && (
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <img
                        src={settings.coverImage}
                        alt=""
                        className="w-full max-w-xs aspect-[4/3] object-cover rounded-[var(--radius-md)] border border-line bg-elevated"
                      />
                    </div>
                  )}
                </Stack>
              </Card>

              <Card>
                <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {[
                    { label: 'URL', value: `/${page.slug}` },
                    { label: 'Type', value: page.type ?? 'gallery' },
                    { label: 'Aesthetic', value: theme },
                    { label: 'Items', value: String(items.length) },
                  ].map((d) => (
                    <div key={d.label}>
                      <dt className="text-[var(--text-label)] font-bold uppercase tracking-[0.14em] text-text-muted">
                        {d.label}
                      </dt>
                      <dd className="mt-1 text-sm text-text">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg" loading={savingSettings} disabled={!settings.name}>
                  Save changes
                </Button>
              </div>
            </Stack>
          </form>
        </Section>
      )}
    </Page>
  );
}
