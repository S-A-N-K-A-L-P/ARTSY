import { Item, CreateItemInput } from '../types/item';

export const getItemById = async (itemId: string): Promise<Item> => {
  const res = await fetch(`/api/items/${itemId}`);
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
};

export const getItemsByUser = async (userId: string): Promise<Item[]> => {
  const res = await fetch(`/api/users/${userId}/items`);
  if (!res.ok) throw new Error('Failed to fetch user items');
  return res.json();
};

export const getFeedItems = async (limit: number, cursor?: string): Promise<Item[]> => {
  const url = new URL('/api/items', window.location.origin);
  url.searchParams.append('limit', limit.toString());
  if (cursor) url.searchParams.append('cursor', cursor);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch feed items');
  return res.json();
};

export const createItem = async (data: CreateItemInput): Promise<Item> => {
  const res = await fetch(`/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
};

export const deleteItem = async (itemId: string): Promise<void> => {
  const res = await fetch(`/api/items/${itemId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete item');
};