import { UserProfile, User } from '../types/user';

export const getUserByUsername = async (username: string): Promise<UserProfile> => {
  const res = await fetch(`/api/users/${username}`);
  if (!res.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return res.json();
};

export const updateUserProfile = async (userId: string, data: Partial<User>): Promise<User> => {
  const res = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to update user profile');
  }
  return res.json();
};

export const followUser = async (followerId: string, followingId: string): Promise<void> => {
  const res = await fetch(`/api/users/${followingId}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ followerId }),
  });
  if (!res.ok) {
    throw new Error('Failed to follow user');
  }
};