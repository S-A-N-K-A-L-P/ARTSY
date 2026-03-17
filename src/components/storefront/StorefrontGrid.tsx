import React from 'react';
import { ItemGrid } from '../items/ItemGrid';
import { ItemCardProps } from '../items/ItemCard';

interface StorefrontGridProps {
  items: ItemCardProps[];
}

export const StorefrontGrid: React.FC<StorefrontGridProps> = ({ items }) => {
  return (
    <div>
      <ItemGrid items={items} />
    </div>
  );
};