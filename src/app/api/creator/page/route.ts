import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { name, slug, aesthetic, type, description, coverImage, logo } = data;

    // Check if slug is taken
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return NextResponse.json({ error: 'Slug already taken' }, { status: 400 });
    }

    const newPage = await Page.create({
      ownerId: user._id,
      name,
      slug,
      aesthetic: {
        theme: aesthetic || 'minimal',
        custom: {
          primaryColor: '#000',
          font: 'inter',
          spacing: 'compact'
        }
      },
      type,
      description,
      coverImage,
      logo,
      stats: { followers: 0, views: 0 },
      settings: { isPublic: true, allowComments: true },
      postIds: []
    });

    // Update user's pages array
    user.pages.push(newPage._id);
    await user.save();

    return NextResponse.json({ success: true, page: newPage });
  } catch (error: any) {
    console.error('Create Page Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).populate('pages');
    
    return NextResponse.json({ success: true, pages: user?.pages || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
