'use client';

import { Card, CardMedia, CardContent, Typography, Button, Chip, Avatar, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';

interface Item {
    id: string;
    title: string;
    image: string;
    price: number;
    aesthetic: string;
    creator: { username: string; avatar: string };
}

export default function FeedCard({ item }: { item: Item }) {
    const dispatch = useDispatch();

    return (
        <Card sx={{ borderRadius: 3, bgcolor: 'background.paper', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component='img'
                image={item.image}
                alt={item.title}
                sx={{ aspectRatio: '4/5', objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Chip label={item.aesthetic} size='small' sx={{ mb: 1, fontWeight: 500 }} />
                <Typography variant='subtitle1' fontWeight={600} gutterBottom>
                    {item.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1.5 }}>
                    <Avatar src={item.creator.avatar} sx={{ width: 24, height: 24 }} />
                    <Typography variant='caption' color='text.secondary' sx={{ fontWeight: 500 }}>
                        @{item.creator.username}
                    </Typography>
                </Box>
                <Typography variant='h6' fontWeight={700} sx={{ mb: 2 }}>
                    ₹{item.price}
                </Typography>
                <Button
                    fullWidth
                    variant='contained'
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: 'none',
                        '&:hover': { boxShadow: 'none', bgcolor: 'primary.dark' }
                    }}
                    onClick={() =>
                        dispatch(addToCart({ id: item.id, title: item.title, price: item.price }))
                    }
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
}
