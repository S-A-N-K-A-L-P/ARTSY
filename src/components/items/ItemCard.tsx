import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { ItemPrice } from './ItemPrice';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface ItemCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({ id, title, price, imageUrl }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card component={Link} href={`/item/${id}`} sx={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl || 'https://via.placeholder.com/200'}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" color="text.primary" noWrap>{title}</Typography>
          <Box sx={{ mt: 1 }}>
            <ItemPrice price={price} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};