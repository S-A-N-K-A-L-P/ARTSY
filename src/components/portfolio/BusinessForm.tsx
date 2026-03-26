'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, useTheme, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  bg: '#ffffff',
  surface: '#ffffff',
  border: '#f0f0f0',
  accent: '#111111',
  text: '#111111',
  muted: '#888888',
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mb: 4, mt: 2 }}>
    <Typography sx={{ 
      fontSize: '11px', 
      letterSpacing: '1px', 
      textTransform: 'uppercase', 
      color: COLORS.muted,
      fontWeight: 700
    }}>
      {children}
    </Typography>
  </Box>
);

const StyledInput = ({ label, required, ...props }: any) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ 
        fontSize: '13px', 
        fontWeight: 600, 
        color: COLORS.text, 
        mb: 1.5
      }}>
        {label} {required && <span style={{ color: '#ff4d4d' }}>*</span>}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        required={required}
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#fafafa',
            borderRadius: '12px',
            color: COLORS.text,
            fontSize: '14px',
            '& fieldset': { borderColor: COLORS.border },
            '&:hover fieldset': { borderColor: '#ddd' },
            '&.Mui-focused fieldset': { borderColor: '#111', borderWidth: '1px' },
          },
          '& .MuiInputBase-input::placeholder': { color: '#ccc', opacity: 1 },
        }}
      />
    </Box>
  );
};

export default function BusinessForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    address: '',
    currentRole: '',
    businessHandling: '',
    productsSell: '',
    minPrice: '',
    maxPrice: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({ ...prev, currentRole: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string].slice(0, 5));
        setImages(prev => [...prev, reader.result as string].slice(0, 5));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, images }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: COLORS.bg, 
      color: COLORS.text,
      py: 12,
      px: 3
    }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 10 }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 800,
            mb: 2,
            letterSpacing: '-2px',
            lineHeight: 1
          }}>
            Join the Collective.
          </Typography>
          <Typography variant="body1" sx={{ color: COLORS.muted, fontWeight: 500, maxWidth: '360px' }}>
            Submit your business details for verification and inclusion in the Astal discovery network.
          </Typography>
        </Box>

        <Box sx={{ 
          bgcolor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '32px',
          p: { xs: 4, md: 6 },
          shadow: '0 4px 40px rgba(0,0,0,0.02)',
        }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                {error && (
                  <Box sx={{ bgcolor: '#fff5f5', color: '#ff4d4d', p: 2, borderRadius: '12px', mb: 4, fontSize: '13px', fontWeight: 600 }}>
                    {error}
                  </Box>
                )}

                <SectionLabel>Personal Information</SectionLabel>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                  <StyledInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Rahul Sharma" required />
                  <StyledInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="rahul@domain.com" required />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                  <StyledInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." required />
                  <StyledInput label="Organization" name="organization" value={formData.organization} onChange={handleChange} placeholder="Brand Name" required />
                </Box>

                <StyledInput label="Operational Area" name="address" value={formData.address} onChange={handleChange} placeholder="Cities or regions covered..." multiline rows={3} required />

                <SectionLabel>Business Context</SectionLabel>

                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: COLORS.text, mb: 1.5 }}>
                    Current Role <span style={{ color: '#ff4d4d' }}>*</span>
                  </Typography>
                  <Select
                    fullWidth
                    displayEmpty
                    value={formData.currentRole}
                    onChange={handleSelectChange}
                    required
                    sx={{
                      bgcolor: '#fafafa',
                      borderRadius: '12px',
                      color: COLORS.text,
                      fontSize: '14px',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.accent, borderWidth: '1px' },
                    }}
                  >
                    <MenuItem value="" disabled>Select identity</MenuItem>
                    <MenuItem value="Business Owner">Owner</MenuItem>
                    <MenuItem value="Freelancer">Independent</MenuItem>
                    <MenuItem value="Founder">Founder</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </Box>

                <StyledInput label="Industry/Niche" name="businessHandling" value={formData.businessHandling} onChange={handleChange} placeholder="e.g. Minimalist Decor" required />
                <StyledInput label="Primary Offerings" name="productsSell" value={formData.productsSell} onChange={handleChange} placeholder="List items or services..." multiline rows={3} required />

                <SectionLabel>Commercial Range</SectionLabel>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' }, gap: 3, alignItems: 'center', mb: 4 }}>
                  <StyledInput label="Min Price (₹)" name="minPrice" type="number" value={formData.minPrice} onChange={handleChange} placeholder="0" />
                  <Box sx={{ color: COLORS.muted, mb: 4, display: { xs: 'none', sm: 'block' } }}>to</Box>
                  <StyledInput label="Max Price (₹)" name="maxPrice" type="number" value={formData.maxPrice} onChange={handleChange} placeholder="0" />
                </Box>

                <SectionLabel>Visual Proof</SectionLabel>
                
                <Box sx={{ mb: 6 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {imagePreviews.map((url, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          position: 'relative',
                          border: `1px solid ${COLORS.border}`
                        }}
                      >
                        <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <Box 
                          onClick={() => removeImage(index)}
                          sx={{ 
                            position: 'absolute', 
                            top: 4, 
                            right: 4, 
                            bgcolor: 'rgba(0,0,0,0.8)', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: 20, 
                            height: 20, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            cursor: 'pointer',
                            fontSize: '10px'
                          }}
                        >
                          ✕
                        </Box>
                      </Box>
                    ))}
                    
                    {imagePreviews.length < 5 && (
                      <Box 
                        component="label"
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          borderRadius: '12px', 
                          border: `1px dashed ${COLORS.border}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: COLORS.muted,
                          '&:hover': { bgcolor: '#fafafa', borderColor: '#111' }
                        }}
                      >
                        <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
                        <Typography sx={{ fontSize: '20px' }}>+</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    py: 2,
                    bgcolor: COLORS.accent,
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '14px',
                    borderRadius: '14px',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#333' }
                  }}
                >
                  {loading ? 'Processing...' : 'Submit Application'}
                </Button>
              </motion.form>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Received.</Typography>
                  <Typography sx={{ color: COLORS.muted, mb: 4 }}>Your identity is being reviewed by the collective.</Typography>
                  <Button onClick={() => setSubmitted(false)} sx={{ color: '#111', fontWeight: 700 }}>Resubmit</Button>
                </motion.div>
              </Box>
            )}
          </AnimatePresence>
        </Box>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center' }}>
              <Button 
                href="https://chat.whatsapp.com/GMId3bWE1lZG0qDrR1FV0p"
                sx={{ 
                  color: '#111', 
                  border: '1px solid #111',
                  borderRadius: '14px',
                  px: 4,
                  py: 1.5,
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'none'
                }}
              >
                Sellers Group
              </Button>
              <Button 
                onClick={() => setShowQR(true)}
                sx={{ 
                  color: COLORS.muted, 
                  border: '1px solid #f0f0f0',
                  borderRadius: '14px',
                  px: 4,
                  py: 1.5,
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                Scan QR
              </Button>
            </Box>
        </Box>

        <AnimatePresence>
          {showQR && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQR(false)}
              sx={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3
              }}
            >
              <Box
                component={motion.div}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  bgcolor: '#fff',
                  p: 6,
                  borderRadius: '32px',
                  border: '1px solid #f0f0f0',
                  textAlign: 'center',
                  maxWidth: '400px'
                }}
              >
                <Typography sx={{ fontWeight: 800, mb: 1 }}>Community Portal</Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: '13px', mb: 4 }}>Scan to join the private seller network.</Typography>
                <Box sx={{ bgcolor: '#fafafa', p: 4, borderRadius: '24px' }}>
                  <img src="/astralseller.JPG" style={{ width: '100%', borderRadius: '12px' }} />
                </Box>
                <Button onClick={() => setShowQR(false)} sx={{ mt: 4, color: COLORS.muted }}>Close</Button>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
