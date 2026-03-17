import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/userService';
import { UserProfile } from '../types/user';

export const useUser = (username: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await getUserByUsername(username);
        if (isMounted) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Failed to load user'));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { profile, loading, error };
};