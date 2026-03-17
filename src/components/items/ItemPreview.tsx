import React from 'react';
import { Box } from '@mui/material';

interface ItemPreviewProps {
  imageUrl: string;
  altText: string;
}

export const ItemPreview: React.FC<ItemPreviewProps> = ({ imageUrl, altText }) => {
  return (
    <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', bgcolor: 'background.default' }}>
      <img src={imageUrl} alt={altText} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </Box>
  );
};