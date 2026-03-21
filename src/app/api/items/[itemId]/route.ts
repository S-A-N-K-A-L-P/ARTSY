import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';

export async function GET(req: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    await dbConnect();
    const { itemId } = await params;
    const post = await Post.findById(itemId).populate('creatorId', 'username avatar aesthetic');

    if (!post) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    await dbConnect();
    const { itemId } = await params;
    const body = await req.json();

    const post = await Post.findByIdAndUpdate(
      itemId,
      {
        title: body.title,
        description: body.description,
        price: body.price,
        stock: body.stock,
      },
      { new: true }
    );

    if (!post) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    await dbConnect();
    const { itemId } = await params;
    const post = await Post.findByIdAndDelete(itemId);

    if (!post) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}