import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import '@/models/Page'; // Ensure Page model is registered for population

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log('[Auth Me Debug] Full Session:', JSON.stringify(session, null, 2));
    if (!session?.user?.email) {
      console.log('[Auth Me Debug] No email found in session');
      return NextResponse.json({ error: 'Unauthorized', debug: session }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).populate('pages');

    if (!user) {
       return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Transform for the IOS Profile component
    const userData = {
      name: user.profile?.name || user.username,
      username: user.username,
      image: user.profile?.avatar || user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      coverImage: user.coverImage,
      bio: user.profile?.bio || "Digital curator and aesthetic enthusiast.",
      stats: {
        posts: user.postsCount || 0,
        followers: user.followersCount || 0,
        following: user.followingCount || 0,
      },
      pages: user.pages || []
    };

    return NextResponse.json({ success: true, user: userData });
  } catch (error: any) {
    console.error('Auth Me Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
