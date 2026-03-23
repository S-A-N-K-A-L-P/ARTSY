import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Item from '@/models/Item';
import User from '@/models/User';
import Page from '@/models/Page';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    // Fetch items with populated owner and page data for discovery
    const items = await Item.find()
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('ownerId', 'username profile.avatar aesthetic')
      .populate('pageId', 'slug name aesthetic');

    return NextResponse.json({
      success: true,
      data: items
    });
  } catch (error: any) {
    console.error('Error fetching Flutter discovery items:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch items' }, { status: 500 });
  }
}
