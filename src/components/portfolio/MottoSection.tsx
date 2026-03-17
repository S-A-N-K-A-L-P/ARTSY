'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, Variants } from 'framer-motion';

export default function MottoSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <Box sx={{ py: 15, bgcolor: 'background.paper', textAlign: 'center' }}>
      <Container maxWidth="md">
        <motion.div 
          variants={containerVariants}
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h3" fontWeight={800} gutterBottom sx={{ color: 'text.primary' }}>
              People are the storefront.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography variant="h3" fontWeight={800} gutterBottom sx={{ color: 'text.secondary' }}>
              Aesthetic is the category.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Typography variant="h3" fontWeight={800} sx={{ color: 'primary.main' }}>
              Items are the medium.
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}