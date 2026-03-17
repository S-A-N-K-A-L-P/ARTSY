'use client';

import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends MuiCardProps {
  children: React.ReactNode;
  motionProps?: HTMLMotionProps<"div">;
}

export const Card: React.FC<CardProps> = ({ children, sx, motionProps, ...props }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} {...motionProps}>
      <MuiCard sx={{ borderRadius: 2, ...sx }} {...props}>
        {children}
      </MuiCard>
    </motion.div>
  );
};