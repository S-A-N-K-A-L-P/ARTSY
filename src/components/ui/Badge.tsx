import React from 'react';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

export const Badge: React.FC<MuiBadgeProps> = (props) => {
  return <MuiBadge {...props} />;
};