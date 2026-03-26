import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import Item from '@/models/Item';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find all pages owned by this user
    const pages = await Page.find({ ownerId: user._id }).lean();
    const pageIds = pages.map(p => p._id);

    // Find all items belonging to these pages
    const items = await Item.find({ pageId: { $in: pageIds } })
      .sort({ createdAt: -1 })
      .lean();

    // Map page names back to items for convenience
    const pageMap = pages.reduce((acc, p) => {
      acc[p._id.toString()] = p.name;
      return acc;
    }, {} as Record<string, string>);

    const enrichedItems = items.map(item => ({
      ...item,
      pageName: pageMap[item.pageId.toString()] || 'Unknown Page',
    }));

    return NextResponse.json({ success: true, items: enrichedItems });
  } catch (error) {
    console.error('Error fetching all creator items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}
