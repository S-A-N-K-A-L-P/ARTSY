import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Item from '@/models/Item';
import Page from '@/models/Page';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    let { title, description, images, price, attributes, externalLinks, tags } = data;

    // Process images through Cloudinary if they are base64
    const processedImages = await Promise.all((images || []).map(async (img: string) => {
      if (img.startsWith('data:image')) {
        try {
          const { uploadToCloudinary } = await import('@/lib/cloudinary');
          return await uploadToCloudinary(img, 'artsy/artifacts');
        } catch (err) {
          console.error('Cloudinary item upload failed:', err);
          return img;
        }
      }
      return img;
    }));

    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Verify ownership via the associated page
    const page = await Page.findById(item.pageId).populate('ownerId');
    if (!page || (page.ownerId as any).email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { title, description, images: processedImages, price, attributes, externalLinks, tags },
      { new: true }
    );

    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error: any) {
    console.error('Update Item Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const page = await Page.findById(item.pageId).populate('ownerId');
    if (!page || (page.ownerId as any).email !== session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await Item.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
