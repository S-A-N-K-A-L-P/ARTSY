'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ImagePlus, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { THEME_NAMES, themes } from '@/lib/theme/themes';
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
  Badge,
  Skeleton,
  EmptyState,
} from '@/components/ui';

const MAX_IMAGES = 8;

/**
 * Edit an item.
 *
 * This was a five-step wizard ('identity' → 'visuals' → 'valorization' →
 * 'convergence' → 'review'), which is a creation pattern: to change one price
 * you had to walk the whole sequence. Editing is a single form you save.
 *
 * It also located the item by listing every page and then requesting each
 * page's items in turn. It now reads GET /api/creator/item/[id] directly.
 */
export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [page, setPage] = useState<any>(null);
  const [tagDraft, setTagDraft] = useState('');
  const [attrDraft, setAttrDraft] = useState({ key: '', value: '' });

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    images: [] as string[],
    tags: [] as string[],
    aesthetic: 'minimal',
    externalLinks: { instagram: '', youtube: '', website: '' },
    attributes: {} as Record<string, string>,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/creator/item/${itemId}`);
        const data = await res.json();
        if (cancelled) return;
        if (!data.success || !data.item) {
          setNotFound(true);
          return;
        }
        const it = data.item;
        setPage(data.page ?? null);
        setForm({
          title: it.title ?? '',
          description: it.description ?? '',
          price: it.price?.toString() ?? '',
          images: it.images ?? [],
          tags: it.tags ?? [],
          aesthetic: it.aesthetic ?? data.page?.aesthetic?.theme ?? 'minimal',
          externalLinks: {
            instagram: it.externalLinks?.instagram ?? '',
            youtube: it.externalLinks?.youtube ?? '',
            website: it.externalLinks?.website ?? '',
          },
          attributes: it.attributes ?? {},
        });
      } catch {
        if (!cancelled) setError('Could not load this item');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [itemId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string].slice(0, MAX_IMAGES),
        }));
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const addTag = () => {
    const t = tagDraft.trim();
    if (!t || form.tags.includes(t)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagDraft('');
  };

  const addAttribute = () => {
    const { key, value } = attrDraft;
    if (!key.trim() || !value.trim()) return;
    setForm((f) => ({ ...f, attributes: { ...f.attributes, [key.trim()]: value.trim() } }));
    setAttrDraft({ key: '', value: '' });
  };

  const removeAttribute = (key: string) =>
    setForm((f) => {
      const next = { ...f.attributes };
      delete next[key];
      return { ...f, attributes: next };
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch(`/api/creator/item/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) || 0 }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Could not save this item');
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this item permanently?')) return;
    setDeleting(true);
    await fetch(`/api/creator/item/${itemId}`, { method: 'DELETE' });
    router.push(page ? `/dashboard/page/${page._id}` : '/dashboard/items');
  };

  const backHref = page ? `/dashboard/page/${page._id}` : '/dashboard/items';

  if (loading) {
    return (
      <Page title="Edit item" width="narrow">
        <Stack gap="md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-40 w-full" />
        </Stack>
      </Page>
    );
  }

  if (notFound) {
    return (
      <Page width="narrow">
        <EmptyState
          icon={<Trash2 size={34} />}
          title="Item not found"
          description="It may have been deleted, or it belongs to another account."
          action={
            <Link href="/dashboard/items">
              <Button>Back to items</Button>
            </Link>
          }
        />
      </Page>
    );
  }

  return (
    <Page
      title="Edit item"
      description={page ? `In ${page.name}.` : undefined}
      width="narrow"
      actions={
        <Link href={backHref}>
          <Button variant="ghost" size="sm" iconLeft={<ChevronLeft size={15} />}>
            Back
          </Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          {error && <Alert tone="error">{error}</Alert>}
          {saved && <Alert tone="success">Item saved.</Alert>}

          <Card>
            <Stack gap="md">
              <Field label="Title" required>
                {(id) => (
                  <Input
                    id={id}
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  />
                )}
              </Field>

              <Field label="Description">
                {(id) => (
                  <Textarea
                    id={id}
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  />
                )}
              </Field>

              <Field label="Price" hint="Leave at 0 if this piece is not for sale.">
                {(id, describedBy) => (
                  <Input
                    id={id}
                    aria-describedby={describedBy}
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  />
                )}
              </Field>
            </Stack>
          </Card>

          <Card>
            <Stack gap="md">
              <div className="space-y-2.5">
                <Label>Images</Label>
                <div className="grid grid-cols-4 gap-3">
                  {form.images.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-[var(--radius-md)] overflow-hidden border border-line group"
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, images: f.images.filter((_, x) => x !== i) }))
                        }
                        aria-label={`Remove image ${i + 1}`}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                  {form.images.length < MAX_IMAGES && (
                    <label className="aspect-square rounded-[var(--radius-md)] border border-dashed border-line flex flex-col items-center justify-center gap-1.5 cursor-pointer text-text-muted hover:border-line-strong hover:text-text transition-colors">
                      <ImagePlus size={18} />
                      <span className="text-[var(--text-label)] font-bold uppercase tracking-[0.12em]">
                        Add
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagDraft}
                    onChange={(e) => setTagDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="ceramics"
                    aria-label="Add a tag"
                  />
                  <Button type="button" variant="secondary" onClick={addTag}>
                    Add
                  </Button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {form.tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }))
                        }
                        aria-label={`Remove tag ${t}`}
                      >
                        <Badge icon={<X size={10} className="opacity-50" />}>{t}</Badge>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                <Label>Specifications</Label>
                {/* These surface on the public item detail as the specs table. */}
                <div className="flex gap-2">
                  <Input
                    value={attrDraft.key}
                    onChange={(e) => setAttrDraft((a) => ({ ...a, key: e.target.value }))}
                    placeholder="Material"
                    aria-label="Specification name"
                  />
                  <Input
                    value={attrDraft.value}
                    onChange={(e) => setAttrDraft((a) => ({ ...a, value: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addAttribute();
                      }
                    }}
                    placeholder="Stoneware"
                    aria-label="Specification value"
                  />
                  <Button type="button" variant="secondary" onClick={addAttribute}>
                    Add
                  </Button>
                </div>
                {Object.keys(form.attributes).length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {Object.entries(form.attributes).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between gap-3 px-3 h-11 rounded-[var(--radius-sm)] bg-elevated"
                      >
                        <span className="text-[var(--text-label)] font-bold uppercase tracking-[0.12em] text-text-muted">
                          {k}
                        </span>
                        <span className="text-sm text-text flex-1 truncate">{v}</span>
                        <button
                          type="button"
                          onClick={() => removeAttribute(k)}
                          aria-label={`Remove ${k}`}
                          className="text-text-muted hover:text-text transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                <Label>Aesthetic</Label>
                <div className="flex flex-wrap gap-2">
                  {THEME_NAMES.map((a) => {
                    const selected = form.aesthetic === a;
                    return (
                      <button
                        key={a}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setForm((f) => ({ ...f, aesthetic: a }))}
                        className={cn(
                          'h-10 pl-2 pr-4 rounded-full border inline-flex items-center gap-2 transition-colors',
                          'text-[var(--text-label)] font-bold uppercase tracking-[0.12em]',
                          selected
                            ? 'border-accent bg-accent-soft text-accent-text'
                            : 'border-line bg-card text-text-muted hover:text-text'
                        )}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-line shrink-0"
                          style={{ backgroundColor: themes[a]['--accent'] }}
                        />
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Stack>
          </Card>

          <Card>
            <Stack gap="md">
              <Label>External links</Label>
              {(['instagram', 'youtube', 'website'] as const).map((k) => (
                <Field key={k} label={k}>
                  {(id) => (
                    <Input
                      id={id}
                      value={form.externalLinks[k]}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          externalLinks: { ...f.externalLinks, [k]: e.target.value },
                        }))
                      }
                      placeholder="https://…"
                      inputMode="url"
                    />
                  )}
                </Field>
              ))}
            </Stack>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              loading={deleting}
              iconLeft={<Trash2 size={15} />}
            >
              Delete
            </Button>
            <div className="flex items-center gap-3">
              <Link href={backHref}>
                <Button variant="ghost">Cancel</Button>
              </Link>
              <Button type="submit" size="lg" loading={saving} disabled={!form.title}>
                Save changes
              </Button>
            </div>
          </div>
        </Stack>
      </form>
    </Page>
  );
}
