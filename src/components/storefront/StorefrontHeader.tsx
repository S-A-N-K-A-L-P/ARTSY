import React from 'react';
import { Box, Typography } from '@mui/material';

interface StorefrontHeaderProps {
  title: string;
  description?: string;
}

export const StorefrontHeader: React.FC<StorefrontHeaderProps> = ({ title, description }) => {
  return (
    <Box sx={{ py: 4, mb: 4, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="h6" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
};