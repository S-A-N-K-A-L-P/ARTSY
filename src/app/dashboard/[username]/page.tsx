'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import ProfileDesktop from '@/components/profile/ProfileDesktop';
import ProfileMobile from '@/components/profile/ProfileMobile';

export default function CreatorProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { setAesthetic } = useAesthetic();
  
  const [creator, setCreator] = useState<any>(null);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState('All Spaces');
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/profile?username=${username}`);
        const data = await res.json();
        if (data.success) {
          setCreator(data.user);
          setPages(data.pages || []);
          if (data.user?.aesthetic) setAesthetic(data.user.aesthetic);
        }
      } catch (err) {
        console.error('Fetch Creator Profile Error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchCreatorData();
  }, [username, setAesthetic]);

  if (isDesktop === null) return null;

  const sharedProps = { creator, pages, loading, selectedCat, setSelectedCat };

  return isDesktop ? <ProfileDesktop {...sharedProps} /> : <ProfileMobile {...sharedProps} />;
}
