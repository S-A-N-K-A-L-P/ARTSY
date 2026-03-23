'use client';

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Chip, Avatar, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Item {
    id: string;
    title: string;
    image: string;
    price: number;
    aesthetic: string;
    pageSlug?: string;
    creator: { username: string; avatar: string };
}

export default function FeedCard({ item }: { item: Item }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleNavigate = () => {
        if (item.pageSlug) {
            router.push(`/user/${item.creator.username}/${item.pageSlug}`);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={handleNavigate}
            style={{ cursor: 'pointer' }}
        >
            <Card sx={{ 
                borderRadius: 6, 
                bgcolor: 'var(--bg-secondary)', 
                color: 'var(--text-primary)',
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease'
            }}>
                <CardMedia
                    component='img'
                    image={item.image}
                    alt={item.title}
                    sx={{ aspectRatio: '4/5', objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Chip 
                        label={item.aesthetic} 
                        size='small' 
                        sx={{ 
                            mb: 2, 
                            fontWeight: 900, 
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            bgcolor: 'var(--accent-soft)',
                            color: 'var(--accent)',
                        }} 
                    />
                    <Typography variant='subtitle1' fontWeight={800} sx={{ letterSpacing: '-0.02em', mb: 1 }}>
                        {item.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 2 }}>
                        <Avatar src={item.creator.avatar} sx={{ width: 28, height: 28, border: '1px solid var(--border-strong)' }} />
                        <Typography variant='caption' sx={{ fontWeight: 700, opacity: 0.6, letterSpacing: '0.02em' }}>
                            @{item.creator.username}
                        </Typography>
                    </Box>
                    <Typography variant='h6' fontWeight={900} sx={{ mb: 3, tracking: '-0.05em' }}>
                        ₹{item.price}
                    </Typography>
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            borderRadius: 4,
                            textTransform: 'none',
                            fontWeight: 900,
                            fontSize: '12px',
                            py: 1.5,
                            bgcolor: 'var(--accent)',
                            color: 'var(--bg-primary)',
                            boxShadow: 'none',
                            '&:hover': { 
                                boxShadow: '0 8px 24px var(--accent-soft)', 
                                bgcolor: 'var(--accent)',
                                filter: 'brightness(1.1)' 
                            }
                        }}
                        onClick={() =>
                            dispatch(addToCart({ id: item.id, title: item.title, price: item.price }))
                        }
                    >
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
