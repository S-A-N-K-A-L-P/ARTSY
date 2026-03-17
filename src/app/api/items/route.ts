import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const posts = await prisma.post.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: { username: true, avatar: true, aesthetic: true }
        }
      }
    });

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const creatorId = body.creatorId || body.sellerId || 'default-uuid';

    const post = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        aesthetic: body.aesthetic || 'minimal',
        mediaUrls: body.mediaUrls || [],
        mediaType: body.mediaType || 'image',
        price: body.price,
        stock: body.stock ?? 1,
        creatorId,
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create item' }, { status: 400 });
  }
}