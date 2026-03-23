import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Item from '@/models/Item';
import Page from '@/models/Page';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const { pageId, title, description, images, price, currency, isForSale, attributes, customFields, aesthetic, category } = data;

    // Verify page ownership
    const page = await Page.findById(pageId).populate('userId');
    if (!page || (page.userId as any).email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized or Page not found' }, { status: 401 });
    }

    const newItem = await Item.create({
      pageId,
      title,
      description,
      images,
      price,
      currency,
      isForSale,
      attributes,
      customFields,
      aesthetic,
      category
    });

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    console.error('Create Item Error:', error);
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
    const items = await Item.find({ pageId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
