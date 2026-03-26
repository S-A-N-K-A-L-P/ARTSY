'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 4, textAlign: 'center', mt: 'auto', backgroundColor: '#0e0e10', borderTop: '1px solid #1a1a1e' }}>
      <Typography variant="body2" sx={{ color: '#888', mb: 1.5 }}>
        © {new Date().getFullYear()} Astal. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, opacity: 0.8 }}>
        <Typography sx={{ color: '#c8a96e', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
          Coming soon on Playstore & iOS
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, color: '#555' }}>
          {/* Simple representative icons or text */}
          <span style={{ fontSize: '14px' }}></span>
          <span style={{ fontSize: '14px' }}>🤖</span>
        </Box>
      </Box>
    </Box>
  );
};