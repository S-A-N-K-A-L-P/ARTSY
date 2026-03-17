'use client';

import React from 'react';
import { Box, Typography, Container, } from '@mui/material'
import { Grid as Grid2 } from "@mui/material";
import { ItemCard } from '../items/ItemCard';

const mockItems = [
  { id: '101', title: 'Neon Sign', price: 150, imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80' },
  { id: '102', title: 'Concrete Planter', price: 45, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80' },
  { id: '103', title: 'Vintage Cassette', price: 25, imageUrl: 'https://images.unsplash.com/photo-1542204625-2e6cb135a507?w=400&q=80' },
  { id: '104', title: 'Matte Black Desk', price: 850, imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80' },
];

export default function ExploreItems() {
  return (
    <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
          Trending Items
        </Typography>
        <Grid2 container spacing={3}>
          {mockItems.map((item) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
              <ItemCard {...item} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}