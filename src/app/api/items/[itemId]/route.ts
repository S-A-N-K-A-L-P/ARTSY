import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await params;
    const post = await prisma.post.findUnique({
      where: { id: itemId },
      include: {
        creator: {
          select: { username: true, avatar: true, aesthetic: true }
        }
      }
    });

    if (!post) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await params;
    const body = await req.json();

    const post = await prisma.post.update({
      where: { id: itemId },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        stock: body.stock,
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await params;
    await prisma.post.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}