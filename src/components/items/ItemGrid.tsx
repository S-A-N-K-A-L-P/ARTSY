import React from 'react';
import { } from '@mui/material'
import { Grid as Grid2 } from "@mui/material";
import { ItemCard, ItemCardProps } from './ItemCard';

interface ItemGridProps {
  items: ItemCardProps[];
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
  return (
    <Grid2 container spacing={3}>
      {items.map((item) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
          <ItemCard {...item} />
        </Grid2>
      ))}
    </Grid2>
  );
};