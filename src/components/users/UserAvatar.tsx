import React from 'react';
import { Avatar, AvatarProps } from '@mui/material';

export const UserAvatar: React.FC<AvatarProps> = (props) => {
  return <Avatar {...props} />;
};