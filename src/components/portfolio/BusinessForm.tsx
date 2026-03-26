'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, useTheme, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  bg: '#0e0e10',
  surface: '#18181c',
  border: '#2a2a32',
  accent: '#c8a96e',
  accent2: '#e8d5b0',
  text: '#f0ece4',
  muted: '#888',
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 2, 
    mb: 3,
    mt: 1
  }}>
    <Typography sx={{ 
      fontSize: '10px', 
      letterSpacing: '2.5px', 
      textTransform: 'uppercase', 
      color: COLORS.accent,
      fontWeight: 'bold'
    }}>
      {children}
    </Typography>
    <Box sx={{ flex: 1, height: '1px', bgcolor: COLORS.border }} />
  </Box>
);

const StyledInput = ({ label, required, ...props }: any) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ 
        fontSize: '13px', 
        fontWeight: 500, 
        color: COLORS.accent2, 
        mb: 1,
        letterSpacing: '0.3px'
      }}>
        {label} {required && <span style={{ color: COLORS.accent }}>*</span>}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        required={required}
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#111114',
            borderRadius: '10px',
            color: COLORS.text,
            fontSize: '14px',
            '& fieldset': { borderColor: COLORS.border },
            '&:hover fieldset': { borderColor: COLORS.accent },
            '&.Mui-focused fieldset': { borderColor: COLORS.accent, borderWidth: '1px', boxShadow: `0 0 0 3px rgba(200,169,110,0.12)` },
          },
          '& .MuiInputBase-input::placeholder': { color: '#444', opacity: 1 },
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

    const newPrevs: string[] = [];
    const newBases: string[] = [];

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
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: COLORS.bg, 
      color: COLORS.text,
      py: 10,
      px: 2,
      backgroundImage: `radial-gradient(ellipse at 20% 20%, #1e1a12 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #12101a 0%, transparent 60%)`
    }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ 
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: COLORS.accent,
              border: `1px solid ${COLORS.accent}`,
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              mb: 2.5,
              boxShadow: `0 0 15px rgba(200,169,110,0.2)`
            }}>
              The Vibe Check
            </Box>
          </motion.div>
          <Typography variant="h3" sx={{ 
            fontFamily: "'Playfair Display', serif", 
            fontWeight: 700,
            mb: 1.5,
            lineHeight: 1.2
          }}>
            Let&apos;s get to know you <br /> & your <span style={{ color: COLORS.accent }}>craft</span>
          </Typography>
          <Typography variant="body1" sx={{ color: COLORS.muted, fontWeight: 300, maxWidth: '400px', mx: 'auto' }}>
            Drop your details below so we can understand what you&apos;re building and how we can vibe together.
          </Typography>
        </Box>

        <Box sx={{ 
          bgcolor: COLORS.surface,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '24px',
          p: { xs: 3, md: 5 },
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
            opacity: 0.5
          }
        }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
              >
                {error && (
                  <Box sx={{ bgcolor: 'rgba(255,0,0,0.05)', color: '#ff6b6b', p: 2, borderRadius: '12px', mb: 4, fontSize: '14px', border: '1px solid rgba(255,0,0,0.2)' }}>
                    {error}
                  </Box>
                )}

                <SectionLabel>The Basics</SectionLabel>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <StyledInput label="What's your name?" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Sharma" required />
                  <StyledInput label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. rahul@example.com" required />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <StyledInput label="Best way to reach you (Phone)" name="phone" value={formData.phone} onChange={handleChange} placeholder="WhatsApp preferred?" required />
                  <StyledInput label="Where are you building right now?" name="organization" value={formData.organization} onChange={handleChange} placeholder="Company or project name" required />
                </Box>

                <StyledInput label="Where do you operate from? (Area of operation)" name="address" value={formData.address} onChange={handleChange} placeholder="Tell us which cities or areas you handle orders from..." multiline rows={3} required />

                <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.05)' }} />

                <SectionLabel>Deep Dive</SectionLabel>

                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.accent2, mb: 1.5 }}>
                    What&apos;s your current vibe? <span style={{ color: COLORS.accent }}>*</span>
                  </Typography>
                  <Select
                    fullWidth
                    displayEmpty
                    value={formData.currentRole}
                    onChange={handleSelectChange}
                    required
                    sx={{
                      bgcolor: '#111114',
                      borderRadius: '12px',
                      color: COLORS.text,
                      fontSize: '14px',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.accent },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: COLORS.accent, borderWidth: '1px' },
                      '& .MuiSelect-icon': { color: COLORS.muted }
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: '#1a1a1e',
                          color: COLORS.text,
                          borderRadius: '12px',
                          mt: 1,
                          border: `1px solid ${COLORS.border}`,
                          '& .MuiMenuItem-root:hover': { bgcolor: '#25252b' }
                        }
                      }
                    }}
                  >
                    <MenuItem value="" disabled>Pick what fits you best</MenuItem>
                    <MenuItem value="Business Owner">Running my own business</MenuItem>
                    <MenuItem value="Freelancer">Doing my own thing (Freelance)</MenuItem>
                    <MenuItem value="Employee">Hustling at a company</MenuItem>
                    <MenuItem value="Student">Learning & Exploring (Student)</MenuItem>
                    <MenuItem value="Founder">Building a startup</MenuItem>
                    <MenuItem value="Other">Something else entirely</MenuItem>
                  </Select>
                </Box>

                <StyledInput label="What are you currently cooking up? (Niche)" name="businessHandling" value={formData.businessHandling} onChange={handleChange} placeholder="e.g. Streetwear, Home Decor, Tech Services..." required />
                <StyledInput label="What are you dropping? (Products/Services)" name="productsSell" value={formData.productsSell} onChange={handleChange} placeholder="List out your main offerings..." multiline rows={3} required />

                <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.05)' }} />

                <SectionLabel>Pricing Vibes</SectionLabel>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' }, gap: 2, alignItems: 'center', mb: 4 }}>
                  <StyledInput label="Starting from (₹)" name="minPrice" type="number" value={formData.minPrice} onChange={handleChange} placeholder="Min" inputProps={{ min: 0 }} />
                  <Box sx={{ textAlign: 'center', color: COLORS.muted, mb: 3, display: { xs: 'none', sm: 'block' } }}>
                    to
                  </Box>
                  <StyledInput label="Going up to (₹)" name="maxPrice" type="number" value={formData.maxPrice} onChange={handleChange} placeholder="Max" inputProps={{ min: 0 }} />
                </Box>

                <SectionLabel>Sample Work (Optional)</SectionLabel>
                
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: COLORS.accent2, mb: 2 }}>
                    Showcase some of your drops
                  </Typography>
                  
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
                            bgcolor: 'rgba(0,0,0,0.6)', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: 20, 
                            height: 20, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            cursor: 'pointer',
                            fontSize: '12px'
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
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: COLORS.accent,
                            color: COLORS.accent,
                            bgcolor: 'rgba(200,169,110,0.05)'
                          }
                        }}
                      >
                        <input 
                          type="file" 
                          hidden 
                          multiple 
                          accept="image/*" 
                          onChange={handleImageChange} 
                        />
                        <Typography sx={{ fontSize: '24px' }}>+</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ fontSize: '11px', color: COLORS.muted }}>
                    Max 5 images. These will be uploaded to Cloudinary.
                  </Typography>
                </Box>


                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    mt: 5,
                    py: 2,
                    bgcolor: COLORS.accent,
                    color: '#111',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    borderRadius: '12px',
                    boxShadow: `0 10px 30px rgba(200,169,110,0.3)`,
                    '&:hover': {
                      bgcolor: COLORS.accent2,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 15px 35px rgba(200,169,110,0.4)`,
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(200,169,110,0.2)',
                      color: 'rgba(255,255,255,0.2)'
                    }
                  }}
                >
                  {loading ? 'Sending logs...' : 'Send it! →'}
                </Button>
              </motion.form>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                  <Box sx={{ 
                    fontSize: '64px', 
                    mb: 3, 
                    color: COLORS.accent,
                    display: 'flex',
                    justifyContent: 'center',
                    filter: 'drop-shadow(0 0 20px rgba(200,169,110,0.4))'
                  }}>
                    ✨
                  </Box>
                  <Typography variant="h4" sx={{ 
                    fontFamily: "'Playfair Display', serif", 
                    color: COLORS.accent,
                    mb: 2,
                    fontWeight: 700
                  }}>
                    We&apos;ve got you!
                  </Typography>
                  <Typography sx={{ color: COLORS.muted, fontSize: '16px', maxWidth: '300px', mx: 'auto', lineHeight: 1.6 }}>
                    Your business vibe has been recorded. We&apos;ll reach out if the energy matches!
                  </Typography>
                  <Button 
                    onClick={() => setSubmitted(false)}
                    sx={{ 
                      mt: 5, 
                      color: COLORS.accent, 
                      textTransform: 'none',
                      fontSize: '14px',
                      '&:hover': { background: 'rgba(200,169,110,0.05)' }
                    }}
                  >
                    Submit another response
                  </Button>
                </motion.div>
              </Box>
            )}
          </AnimatePresence>
        </Box>

        <Typography sx={{ 
          textAlign: 'center', 
          mt: 3, 
          fontSize: '12px', 
          color: '#555' 
        }}>
          All information is kept confidential and used solely for business purposes.
        </Typography>

        <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Typography sx={{ color: COLORS.muted, fontSize: '13px', mb: 2, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Want to join the inner circle?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Button 
                href="https://chat.whatsapp.com/GMId3bWE1lZG0qDrR1FV0p"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: COLORS.accent, 
                  border: `1px solid ${COLORS.accent}`,
                  borderRadius: '30px',
                  px: 4,
                  py: 1.2,
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(200,169,110,0.1)',
                    borderColor: COLORS.accent2,
                    boxShadow: `0 0 20px rgba(200,169,110,0.2)`,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Join the Sellers WhatsApp Group
              </Button>

              <Button 
                onClick={() => setShowQR(true)}
                sx={{ 
                  color: COLORS.text, 
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '30px',
                  px: 4,
                  py: 1.2,
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: COLORS.muted,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Join via QR
              </Button>

              <Button 
                href="https://docs.google.com/forms/d/e/1FAIpQLSe9IlFDCrwKivMQ4ogkk8iwfgyLt7nAOBKwx4kOrw0iWFFfGA/viewform?usp=sharing&ouid=113213646344728890716"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: '#fff', 
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderRadius: '30px',
                  px: 4,
                  py: 1.2,
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Business Application
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* QR Code Modal */}
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
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(10px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
              }}
            >
              <Box
                component={motion.div}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  position: 'relative',
                  maxWidth: '400px',
                  width: '100%',
                  bgcolor: '#18181c',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: COLORS.accent, mb: 1, fontWeight: 700 }}>Scan to Join</Typography>
                  <Typography sx={{ color: COLORS.muted, fontSize: '14px', mb: 3 }}>Scan this QR code with your phone to join our seller community</Typography>
                  
                  <Box sx={{ 
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    p: 1.5,
                    display: 'flex',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                    minHeight: '200px'
                  }}>
                    <img 
                      src="/astralseller.JPG" 
                      alt="Join via QR" 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        display: 'block',
                        borderRadius: '4px'
                      }} 
                      onError={(e) => {
                        console.error("QR image failed to load");
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const msg = document.createElement('div');
                          msg.innerText = 'Image failed to load. Please join via the WhatsApp button.';
                          msg.style.color = '#ff6b6b';
                          msg.style.padding = '20px';
                          msg.style.fontSize = '12px';
                          parent.appendChild(msg);
                        }
                      }}
                    />
                  </Box>

                  <Button 
                    onClick={() => setShowQR(false)}
                    fullWidth
                    sx={{ mt: 4, color: COLORS.muted, textTransform: 'none' }}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
