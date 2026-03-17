import React from 'react';
import { Typography } from '@mui/material';

interface ItemPriceProps {
  price: number;
  currency?: string;
}

export const ItemPrice: React.FC<ItemPriceProps> = ({ price, currency = '$' }) => {
  return (
    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
      {currency}{price.toFixed(2)}
    </Typography>
  );
};