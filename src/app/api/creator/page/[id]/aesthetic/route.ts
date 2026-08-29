import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import User from '@/models/User';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const { theme } = await request.json();

    if (!theme) {
      return NextResponse.json({ error: 'Theme is required' }, { status: 400 });
    }

    await dbConnect();

    /*
     * Ownership check.
     *
     * This previously verified only that *a* session existed and then called
     * findByIdAndUpdate on the supplied id, so any signed-in user could
     * retheme anyone else's space just by knowing its id.
     */
    const user = await User.findOne({ email: session.user.email }).select('_id');
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedPage = await Page.findOneAndUpdate(
      { _id: id, ownerId: user._id },
      { $set: { 'aesthetic.theme': theme, 'aesthetic.custom': {} } },
      { new: true }
    );

    if (!updatedPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, page: updatedPage });
  } catch (error: any) {
    console.error('Update Aesthetic Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
