import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Page from '@/models/Page';
import Item from '@/models/Item';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const slug = searchParams.get('slug');

  if (!username || !slug) {
    return NextResponse.json({ error: 'Username and slug are required' }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const page = await Page.findOne({ ownerId: user._id, slug, isPublic: true });
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const items = await Item.find({ pageId: page._id }).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      page,
      items
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
