import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        aesthetic: true,
        isCreator: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;
    const body = await req.json();

    const user = await prisma.user.update({
      where: { username },
      data: {
        bio: body.bio,
        avatar: body.avatar,
        aesthetic: body.aesthetic,
        name: body.name,
      },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        aesthetic: true,
      }
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
  }
}