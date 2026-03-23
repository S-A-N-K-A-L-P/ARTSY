import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    // Fetch public pages for discovery
    const pages = await Page.find({ 'settings.isPublic': true })
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('ownerId', 'username profile.avatar avatar profile.name');

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching discovery pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}
