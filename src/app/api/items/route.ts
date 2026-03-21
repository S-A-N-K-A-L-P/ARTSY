import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const posts = await Post.find()
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('creatorId', 'username avatar aesthetic');

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const creatorId = body.creatorId || body.sellerId;

    if (!creatorId) {
      return NextResponse.json({ error: 'creatorId is required' }, { status: 400 });
    }

    const post = await Post.create({
      title: body.title,
      description: body.description,
      aesthetic: body.aesthetic || 'minimal',
      mediaUrls: body.mediaUrls || [],
      mediaType: body.mediaType || 'image',
      price: body.price,
      stock: body.stock ?? 1,
      creatorId,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 400 });
  }
}