'use client';

import React from 'react';
import { Box, Typography, Container, } from '@mui/material'
import { Grid as Grid2 } from "@mui/material";
import { ItemCard } from '../items/ItemCard';

export default function ExploreItems() {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/items?limit=8');
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return (
    <Box sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
       <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </Box>
  );

  return (
    <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
          Trending Items
        </Typography>
        <Grid2 container spacing={3}>
          {items.map((item) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={item._id}>
              <ItemCard 
                id={item._id}
                title={item.title}
                price={item.price}
                imageUrl={item.images?.[0] || 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80'} 
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}