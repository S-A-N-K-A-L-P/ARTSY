import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20');

    let users;
    if (query) {
      users = await User.find({
        username: { $regex: query, $options: 'i' }
      }).limit(limit).select('username avatar aesthetic profile.name profile.avatar');
    } else {
      users = await User.find().limit(limit).select('username avatar aesthetic profile.name profile.avatar');
    }

    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error: any) {
    console.error('Error fetching Flutter discovery users/people:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}
