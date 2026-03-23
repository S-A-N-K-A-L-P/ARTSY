import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import Page from '@/models/Page';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const { pageId, type, title, caption, itemIds, layout } = data;

    // Verify page ownership
    const page = await Page.findById(pageId).populate('ownerId');
    if (!page || (page.ownerId as any).email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized or Page not found' }, { status: 401 });
    }

    const newPost = await Post.create({
      pageId,
      type,
      title,
      caption,
      itemIds,
      layout: layout || { type: 'grid', columns: 3 },
      engagement: { likes: 0, comments: 0 }
    });

    // Link post to page
    page.postIds.push(newPost._id);
    await page.save();

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    console.error('Create Post Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ error: 'pageId is required' }, { status: 400 });
  }

  try {
    await dbConnect();
    const posts = await Post.find({ pageId }).sort({ createdAt: -1 }).populate('itemIds');
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
