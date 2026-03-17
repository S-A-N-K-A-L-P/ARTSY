import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { UserAvatar } from './UserAvatar';
import { FollowButton } from './FollowButton';
import Link from 'next/link';

export interface UserCardProps {
  username: string;
  bio?: string;
  avatarUrl?: string;
}

export const UserCard: React.FC<UserCardProps> = ({ username, bio, avatarUrl }) => {
  return (
    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Link href={`/user/${username}`} style={{ textDecoration: 'none' }}>
        <UserAvatar src={avatarUrl} alt={username} />
      </Link>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" component={Link} href={`/user/${username}`} sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 'bold' }}>
          @{username}
        </Typography>
        {bio && <Typography variant="body2" color="text.secondary" noWrap>{bio}</Typography>}
      </Box>
      <FollowButton username={username} />
    </Card>
  );
};