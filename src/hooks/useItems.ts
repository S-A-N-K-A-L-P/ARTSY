import { useState, useEffect } from 'react';
import { getFeedItems } from '../services/itemService';
import { Item } from '../types/item';

export const useItems = (limit: number = 20) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await getFeedItems(limit);
        if (isMounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Failed to load items'));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { items, loading, error };
};