'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge as MuiBadge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const cartItemsCount = useSelector((state: RootState) => state.cart.length);
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold', letterSpacing: 1 }}
          >
            Astal
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button component={Link} href="/explore" color="inherit">
              Explore
            </Button>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton color="inherit" component={Link} href="/cart">
                <MuiBadge badgeContent={cartItemsCount} color="error">
                  <ShoppingCartIcon />
                </MuiBadge>
              </IconButton>
            </motion.div>

            <Button
              component="a"
              href="/login"
              onClick={handleLoginClick}
              variant="outlined"
              color="inherit"
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#111318',
                border: '1px solid rgba(98, 70, 234, 0.35)',
                borderRadius: '20px',
                padding: '48px 52px',
                maxWidth: '420px',
                width: '90%',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 0 60px rgba(98, 70, 234, 0.2), 0 24px 64px rgba(0,0,0,0.6)',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '20px',
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Purple glow dot */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6246EA, #8b6eff)',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                boxShadow: '0 0 30px rgba(98, 70, 234, 0.5)',
              }}>
                🚀
              </div>

              <h2 style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 12px',
                letterSpacing: '-0.5px',
              }}>
                Coming Soon
              </h2>

              <p style={{
                fontSize: '1.05rem',
                color: '#a89ef5',
                margin: '0 0 10px',
                fontWeight: 500,
              }}>
                Astal is launching at <span style={{ color: '#6246EA', fontWeight: 700 }}>Amphoria</span>
              </p>

              <p style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.35)',
                margin: 0,
                fontStyle: 'italic',
              }}>
                Stay tuned for something culture-defining.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};