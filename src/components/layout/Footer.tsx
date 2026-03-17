import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 3, textAlign: 'center', mt: 'auto', backgroundColor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Artsy. All rights reserved.
      </Typography>
    </Box>
  );
};