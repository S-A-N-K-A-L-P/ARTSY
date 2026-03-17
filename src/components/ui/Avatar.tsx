import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

export const Avatar: React.FC<MuiAvatarProps> = (props) => {
  return <MuiAvatar {...props} />;
};