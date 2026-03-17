'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';

export interface FollowButtonProps {
  username: string;
  initialFollowing?: boolean;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ username, initialFollowing = false }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Button 
      variant={isFollowing ? "outlined" : "contained"} 
      color="primary" 
      onClick={toggleFollow}
      size="small"
      sx={{ borderRadius: 5, textTransform: 'none' }}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};