'use client';

import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { StorefrontHeader } from '../storefront/StorefrontHeader';
import { StorefrontGrid } from '../storefront/StorefrontGrid';
import AestheticRenderer from '../aesthetics/AestheticRenderer';

// Mock data
const spotlightUser = {
  username: 'nischix',
  aesthetic: 'noir' as const,
  bio: 'Dark aesthetics & poetry intertwined with functional wear.',
  followersCount: 1205
};

const spotlightItems = [
  { id: '1', title: 'Midnight Trench', price: 299.99, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60' },
  { id: '2', title: 'Obsidian Ring', price: 89.00, imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f6615b5df?w=500&auto=format&fit=crop&q=60' },
  { id: '3', title: 'Void Canvas', price: 450.00, imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&auto=format&fit=crop&q=60' },
  { id: '4', title: 'Leather Boots', price: 150.00, imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop&q=60' },
];

export default function CreatorSpotlight() {
  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
          Creator Spotlight
        </Typography>
        
        {/* We use AestheticRenderer so the spotlight section actually renders IN the creator's theme */}
        <AestheticRenderer aesthetic={spotlightUser.aesthetic}>
           <Paper sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, overflow: 'hidden' }} elevation={4}>
             <StorefrontHeader 
               title={`@${spotlightUser.username}`} 
               description={spotlightUser.bio} 
             />
             <Box sx={{ mt: 4 }}>
                <StorefrontGrid items={spotlightItems} />
             </Box>
           </Paper>
        </AestheticRenderer>
      </Container>
    </Box>
  );
}