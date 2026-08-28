'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProfileDesktop from '@/components/profile/ProfileDesktop';
import ProfileMobile from '@/components/profile/ProfileMobile';
import { resolveTheme } from '@/lib/theme/themes';

export default function CreatorProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [creator, setCreator] = useState<any>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All Spaces');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/profile?username=${username}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.success) {
          setCreator(data.user);
          setPages(data.pages ?? []);
        }
      } catch (err) {
        console.error('Fetch Creator Profile Error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [username]);

  /*
   * The creator's aesthetic, scoped to this subtree.
   *
   * This page used to call setAesthetic() on load, which persists through
   * PUT /api/user/aesthetic — so simply viewing someone's profile overwrote
   * the visitor's own saved theme in the database. It also passed
   * user.aesthetic, an object, where a theme name was expected, so
   * resolveTheme fell back to 'soft': visiting any profile silently reset you
   * to the default. data-theme applies their look without touching your record.
   */
  const theme = resolveTheme(creator?.aesthetic?.name);
  const sharedProps = { creator, pages, loading, selectedCat, setSelectedCat };

  return (
    <div data-theme={theme} style={{ fontFamily: 'var(--font)' }} className="bg-bg text-text">
      {/* Breakpoint is CSS, not JS. The previous `isDesktop === null` guard
          returned null on the server and first render, so this route
          server-rendered nothing at all. */}
      <div className="hidden lg:block">
        <ProfileDesktop {...sharedProps} />
      </div>
      <div className="lg:hidden">
        <ProfileMobile {...sharedProps} />
      </div>
    </div>
  );
}
