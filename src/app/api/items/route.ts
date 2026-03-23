import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Item from '@/models/Item';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    // Fetch items from the DB
    const items = await Item.find()
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('ownerId', 'username profile.avatar aesthetic')
      .populate('pageId', 'slug name aesthetic');

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const ownerId = body.ownerId || body.creatorId;

    if (!ownerId) {
      return NextResponse.json({ error: 'ownerId is required' }, { status: 400 });
    }

    const item = await Item.create({
      ownerId,
      pageId: body.pageId,
      title: body.title,
      description: body.description,
      images: body.images || [],
      price: body.price || 0,
      currency: body.currency || 'INR',
      aesthetic: body.aesthetic || 'minimal',
      attributes: body.attributes || {},
      tags: body.tags || []
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 400 });
  }
}