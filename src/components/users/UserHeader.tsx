import React from 'react';
import { Box, Typography } from '@mui/material';
import { UserAvatar } from './UserAvatar';
import { FollowButton } from './FollowButton';

export interface UserHeaderProps {
  username: string;
  bio?: string;
  avatarUrl?: string;
  followersCount: number;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ username, bio, avatarUrl, followersCount }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 4 }}>
      <UserAvatar src={avatarUrl} alt={username} sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h4" fontWeight="bold">@{username}</Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>{followersCount} Followers</Typography>
      {bio && <Typography variant="body1" sx={{ mt: 2, maxWidth: 600 }}>{bio}</Typography>}
      <Box sx={{ mt: 3 }}>
        <FollowButton username={username} />
      </Box>
    </Box>
  );
};