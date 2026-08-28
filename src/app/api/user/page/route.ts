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

/*
     * Visibility lives at settings.isPublic on the Page schema, not at the top
     * level. Querying a bare `isPublic: true` matched no document ever, so this
     * endpoint returned 404 for every request. $ne:false keeps older records
     * that predate the settings block visible, matching the schema default.
     */
    const page = await Page.findOne({
      ownerId: user._id,
      slug,
      'settings.isPublic': { $ne: false },
    });
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
