'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends MuiButtonProps {
  motionProps?: HTMLMotionProps<"div">;
}

export const Button: React.FC<ButtonProps> = ({ motionProps, children, ...props }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} {...motionProps} style={{ display: 'inline-block', ...motionProps?.style }}>
      <MuiButton {...props}>
        {children}
      </MuiButton>
    </motion.div>
  );
};