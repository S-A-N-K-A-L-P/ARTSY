'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
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
  Alert,
  Label,
} from '@/components/ui';

const TYPES = [
  { id: 'gallery', label: 'Gallery', hint: 'Showcase work' },
  { id: 'store', label: 'Store', hint: 'Sell items' },
  { id: 'portfolio', label: 'Portfolio', hint: 'Personal record' },
];

export default function CreatePagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    slug: '',
    type: 'gallery',
    aesthetic: 'minimal',
    description: '',
    coverImage: '',
  });

  const setName = (name: string) =>
    setForm((f) => ({
      ...f,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/creator/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Could not create the space');
      router.push(`/dashboard/page/${data.page._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <Page
      title="New space"
      description="A space is a themed storefront for one body of work."
      width="narrow"
      actions={
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" iconLeft={<ChevronLeft size={15} />}>
            Spaces
          </Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          {error && <Alert tone="error">{error}</Alert>}

          <Card>
            <Stack gap="md">
              <Field label="Name" required>
                {(id) => (
                  <Input
                    id={id}
                    value={form.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Design Sanctum"
                    autoFocus
                  />
                )}
              </Field>

              <Field label="URL" hint={`/user/…/${form.slug || 'your-space'}`} required>
                {(id, describedBy) => (
                  <Input
                    id={id}
                    aria-describedby={describedBy}
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    placeholder="design-sanctum"
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                )}
              </Field>

              <Field label="Description">
                {(id) => (
                  <Textarea
                    id={id}
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="What lives in this space?"
                  />
                )}
              </Field>

              <Field label="Cover image URL">
                {(id) => (
                  <Input
                    id={id}
                    value={form.coverImage}
                    onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
                    placeholder="https://…"
                    inputMode="url"
                  />
                )}
              </Field>
            </Stack>
          </Card>

          <Card>
            <Stack gap="md">
              <div className="space-y-2.5">
                <Label>Type</Label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {TYPES.map((t) => {
                    const selected = form.type === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setForm((f) => ({ ...f, type: t.id }))}
                        className={cn(
                          'text-left px-4 py-3 rounded-[var(--radius-md)] border transition-colors',
                          // selected and unselected were both bg-card, so the
                          // choice was invisible
                          selected
                            ? 'border-accent bg-accent-soft'
                            : 'border-line bg-card hover:border-line-strong'
                        )}
                      >
                        <span className="block text-sm font-semibold text-text">{t.label}</span>
                        <span className="block text-[var(--text-caption)] text-text-muted mt-0.5">
                          {t.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2.5">
                <Label>Aesthetic</Label>
                {/* Driven by the real theme list — this was a hardcoded array
                    of seven that omitted fantasy and luxury. */}
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
                            ? 'border-accent bg-accent-soft text-accent'
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

          <div className="flex items-center justify-end gap-3">
            <Link href="/dashboard">
              <Button variant="ghost">Cancel</Button>
            </Link>
            <Button
              type="submit"
              size="lg"
              loading={loading}
              disabled={!form.name || !form.slug}
            >
              Create space
            </Button>
          </div>
        </Stack>
      </form>
    </Page>
  );
}
