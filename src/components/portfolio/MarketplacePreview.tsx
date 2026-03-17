'use client';

import React from 'react';
import { Box, Typography, Container, } from '@mui/material'
import { Grid as Grid2 } from "@mui/material";
import { motion } from 'framer-motion';

export default function MarketplacePreview() {
  const steps = [
    { title: "Create", desc: "Craft your unique aesthetic storefront." },
    { title: "Share", desc: "Build a community around your culture." },
    { title: "Sell", desc: "Monetize your curated, aesthetic items." },
    { title: "Connect", desc: "Engage with buyers who share your vision." },
  ];

  return (
    <Box sx={{ py: 15, bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="h2" fontWeight="bold" textAlign="center" gutterBottom>
          Create. Share. Sell. Connect.
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
          More than a portfolio. More than a marketplace. Build a brand that speaks for itself.
        </Typography>
        
        <Grid2 container spacing={4} sx={{ textAlign: 'center' }}>
           {steps.map((step, i) => (
             <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={i}>
               <motion.div 
                 whileHover={{ y: -10 }}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.15 }}
               >
                 <Box sx={{ p: 4, height: '100%', borderRadius: 4, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                   <Typography variant="h4" fontWeight="bold" sx={{ color: 'primary.main', mb: 2 }}>
                     0{i + 1}
                   </Typography>
                   <Typography variant="h5" fontWeight="bold" gutterBottom>{step.title}</Typography>
                   <Typography variant="body1" color="text.secondary">{step.desc}</Typography>
                 </Box>
               </motion.div>
             </Grid2>
           ))}
        </Grid2>
      </Container>
    </Box>
  );
}