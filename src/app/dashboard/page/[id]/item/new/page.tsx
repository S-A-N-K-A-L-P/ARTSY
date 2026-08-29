'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ImagePlus, X } from 'lucide-react';
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
} from '@/components/ui';

const MAX_IMAGES = 8;

export default function AddItemPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;

  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagDraft, setTagDraft] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    images: [] as string[],
    tags: [] as string[],
    aesthetic: 'minimal',
    externalLinks: { instagram: '', youtube: '', website: '' },
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/creator/page');
        const data = await res.json();
        if (cancelled || !data.success) return;
        const found = data.pages.find((p: any) => p._id === pageId);
        if (found) {
          setPage(found);
          // Default to the space's own aesthetic rather than always 'minimal'.
          setForm((f) => ({
            ...f,
            aesthetic: found.aesthetic?.theme || found.aesthetic || 'minimal',
          }));
        }
      } catch {
        /* the form still works without the page's default aesthetic */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pageId]);

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

  const removeImage = (index: number) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const addTag = () => {
    const t = tagDraft.trim();
    if (!t || form.tags.includes(t)) return;
    setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagDraft('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/creator/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pageId, price: Number(form.price) || 0 }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Could not add the item');
      router.push(`/dashboard/page/${pageId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Page
      title="New item"
      description={page ? `Adding to ${page.name}.` : 'Adding to this space.'}
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
                    placeholder="Obsidian vessel"
                    autoFocus
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
                    placeholder="Material, process, dimensions…"
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
                    placeholder="0"
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
                        onClick={() => removeImage(i)}
                        aria-label={`Remove image ${i + 1}`}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}

                  {form.images.length < MAX_IMAGES && (
                    <label
                      className={cn(
                        'aspect-square rounded-[var(--radius-md)] border border-dashed border-line',
                        'flex flex-col items-center justify-center gap-1.5 cursor-pointer',
                        'text-text-muted hover:border-line-strong hover:text-text transition-colors'
                      )}
                    >
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
                <p className="text-[var(--text-caption)] text-text-muted">
                  {form.images.length} of {MAX_IMAGES}. The first image is used as the cover.
                </p>
              </div>

              <div className="space-y-2.5">
                <Label>Tags</Label>
                {/* Tags drive the category filters on the public storefront. */}
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
                        className="group"
                      >
                        <Badge icon={<X size={10} className="opacity-50 group-hover:opacity-100" />}>
                          {t}
                        </Badge>
                      </button>
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

          <div className="flex items-center justify-end gap-3">
            <Link href={`/dashboard/page/${pageId}`}>
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button type="submit" size="lg" loading={loading} disabled={!form.title}>
              Add item
            </Button>
          </div>
        </Stack>
      </form>
    </Page>
  );
}
