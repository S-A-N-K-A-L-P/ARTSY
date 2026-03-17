'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogProps } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

export interface ModalProps extends DialogProps {
  title?: string;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, children, footer, open, ...props }) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} {...props}>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogContent>
            {children}
          </DialogContent>
          {footer && <DialogActions>{footer}</DialogActions>}
        </Dialog>
      )}
    </AnimatePresence>
  );
};