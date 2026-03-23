'use client';

import React from 'react';
import { ItemCard, ItemCardProps } from './ItemCard';
import { motion } from 'framer-motion';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import Masonry from 'react-masonry-css';

interface ItemGridProps {
  items: ItemCardProps[];
  aesthetic?: string;
  isOwner?: boolean;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items, aesthetic: overrideAesthetic, isOwner }) => {
  const { aesthetic: globalAesthetic } = useAesthetic();
  const theme = overrideAesthetic || globalAesthetic || 'minimal';

  // Masonry Breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto gap-6"
        columnClassName="bg-clip-padding"
      >
        {isOwner && (
          <motion.div variants={itemVariants} className="mb-6">
            <ItemCard isAdd id="add-new" title="" price={0} image="" aesthetic={theme} />
          </motion.div>
        )}
        {items.map((item) => (
          <motion.div variants={itemVariants} key={item.id} className="mb-6">
            <ItemCard 
              {...item} 
              author={item.author || 'creator'} 
              aesthetic={theme} 
            />
          </motion.div>
        ))}
      </Masonry>
      
      {items.length === 0 && (
        <div className="py-20 text-center opacity-20 italic font-bold uppercase tracking-widest text-xs">
           The manifest is waiting for artifacts...
        </div>
      )}
    </motion.div>
  );
};