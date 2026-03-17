'use client';

import { Container, Grid } from '@mui/material';
import FeedCard from './FeedCard';
import itemsData from '@/data/mockItems.json';

interface Item {
    id: string;
    title: string;
    image: string;
    price: number;
    aesthetic: string;
    creator: { username: string; avatar: string };
}

const items = itemsData as Item[];

export default function FeedGrid() {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid key={item.id} {...({ xs: 6, sm: 4, md: 3 } as any)}>
                        <FeedCard item={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
