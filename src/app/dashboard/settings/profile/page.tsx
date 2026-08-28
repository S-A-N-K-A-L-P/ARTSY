'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  Page,
  Section,
  Stack,
  Card,
  Field,
  Input,
  Textarea,
  Button,
  Avatar,
  Alert,
  Skeleton,
} from '@/components/ui';

interface ProfileForm {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  instagram: string;
  twitter: string;
  website: string;
}

const EMPTY: ProfileForm = {
  name: '',
  username: '',
  bio: '',
  avatar: '',
  instagram: '',
  twitter: '',
  website: '',
};

/**
 * Profile settings.
 *
 * This route was a stub — `return <h1>Profile Settings</h1>` — and there was no
 * write endpoint behind it, so the Settings screen linked to a dead end.
 */
export default function ProfileSettingsPage() {
  const [form, setForm] = useState<ProfileForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) throw new Error('Could not load your profile');
        const data = await res.json();
        if (cancelled) return;
        setForm({
          name: data.name ?? '',
          username: data.username ?? '',
          bio: data.bio ?? '',
          avatar: data.image ?? '',
          instagram: data.socialLinks?.instagram ?? '',
          twitter: data.socialLinks?.twitter ?? '',
          website: data.socialLinks?.website ?? '',
        });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const set = (k: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSaved(false);
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          bio: form.bio,
          avatar: form.avatar,
          socialLinks: {
            instagram: form.instagram,
            twitter: form.twitter,
            website: form.website,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Could not save your profile');
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Page
      title="Profile"
      description="How you appear across astl."
      width="narrow"
      actions={
        <Link href="/dashboard/settings">
          <Button variant="ghost" size="sm" iconLeft={<ChevronLeft size={15} />}>
            Settings
          </Button>
        </Link>
      }
    >
      {loading ? (
        <Stack gap="md">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-28 w-full" />
        </Stack>
      ) : (
        <form onSubmit={onSubmit}>
          <Stack gap="lg">
            {error && <Alert tone="error">{error}</Alert>}
            {saved && <Alert tone="success">Profile saved.</Alert>}

            <Card>
              <Stack gap="md">
                <div className="flex items-center gap-4">
                  <Avatar src={form.avatar} name={form.name || form.username} size="lg" />
                  <div className="min-w-0 flex-1">
                    <Field label="Avatar URL">
                      {(id) => (
                        <Input
                          id={id}
                          value={form.avatar}
                          onChange={set('avatar')}
                          placeholder="https://…"
                          inputMode="url"
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <Field label="Display name" required>
                  {(id) => (
                    <Input id={id} value={form.name} onChange={set('name')} placeholder="Your name" />
                  )}
                </Field>

                <Field
                  label="Username"
                  hint="Your public handle — astl.app/user/your-handle"
                  required
                >
                  {(id, describedBy) => (
                    <Input
                      id={id}
                      aria-describedby={describedBy}
                      value={form.username}
                      onChange={set('username')}
                      placeholder="handle"
                      autoCapitalize="none"
                      spellCheck={false}
                    />
                  )}
                </Field>

                <Field label="Bio" hint={`${form.bio.length}/280`}>
                  {(id, describedBy) => (
                    <Textarea
                      id={id}
                      aria-describedby={describedBy}
                      value={form.bio}
                      onChange={set('bio')}
                      maxLength={280}
                      placeholder="A line about what you make."
                    />
                  )}
                </Field>
              </Stack>
            </Card>

            <Section title="Links" description="Shown on your public profile.">
              <Card>
                <Stack gap="md">
                  <Field label="Instagram">
                    {(id) => (
                      <Input id={id} value={form.instagram} onChange={set('instagram')} placeholder="@handle" />
                    )}
                  </Field>
                  <Field label="Twitter">
                    {(id) => (
                      <Input id={id} value={form.twitter} onChange={set('twitter')} placeholder="@handle" />
                    )}
                  </Field>
                  <Field label="Website">
                    {(id) => (
                      <Input id={id} value={form.website} onChange={set('website')} placeholder="https://…" inputMode="url" />
                    )}
                  </Field>
                </Stack>
              </Card>
            </Section>

            <div className="flex justify-end">
              <Button type="submit" loading={saving} size="lg">
                {saving ? 'Saving' : 'Save changes'}
              </Button>
            </div>
          </Stack>
        </form>
      )}
    </Page>
  );
}
