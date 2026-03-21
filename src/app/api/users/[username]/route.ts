import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    await dbConnect();
    const { username } = await params;
    const user = await User.findOne({ username }).select('username name bio avatar aesthetic isCreator createdAt');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    await dbConnect();
    const { username } = await params;
    const body = await req.json();

    const user = await User.findOneAndUpdate(
      { username },
      {
        bio: body.bio,
        avatar: body.avatar,
        aesthetic: body.aesthetic,
        name: body.name,
      },
      { new: true }
    ).select('username name bio avatar aesthetic');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
  }
}