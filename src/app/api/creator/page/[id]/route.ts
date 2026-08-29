import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Page from '@/models/Page';
import User from '@/models/User';
import { resolveTheme } from '@/lib/theme/themes';

/**
 * Update a space the caller owns.
 *
 * No endpoint existed to change a space's cover image, name or description —
 * the only page-update route handled `aesthetic` and nothing else, which is
 * why the settings tab in the dashboard was read-only and why three spaces
 * (clothes, helment, ghostrider) have sat with no cover at all.
 */
const patchSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  description: z.string().trim().max(500).optional(),
  coverImage: z.string().trim().url().or(z.literal('')).optional(),
  logo: z.string().trim().url().or(z.literal('')).optional(),
  type: z.enum(['store', 'gallery', 'portfolio']).optional(),
  aesthetic: z.string().trim().optional(),
  isPublic: z.boolean().optional(),
});

/** Resolves the caller and confirms they own this space. */
async function ownedPage(id: string, email: string) {
  const user = await User.findOne({ email }).select('_id');
  if (!user) return null;
  return Page.findOne({ _id: id, ownerId: user._id });
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const parsed = patchSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }
    const body = parsed.data;

    await dbConnect();

    // Scoped to the owner: an id alone must not be enough to edit someone
    // else's space.
    const page = await ownedPage(id, session.user.email);
    if (!page) {
      return NextResponse.json({ success: false, error: 'Space not found' }, { status: 404 });
    }

    const update: Record<string, unknown> = {};
    if (body.name !== undefined) update.name = body.name;
    if (body.description !== undefined) update.description = body.description;
    if (body.coverImage !== undefined) update.coverImage = body.coverImage;
    if (body.logo !== undefined) update.logo = body.logo;
    if (body.type !== undefined) update.type = body.type;
    if (body.aesthetic !== undefined) update['aesthetic.theme'] = resolveTheme(body.aesthetic);
    if (body.isPublic !== undefined) update['settings.isPublic'] = body.isPublic;

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ success: false, error: 'Nothing to update' }, { status: 400 });
    }

    update.updatedAt = new Date();
    const updated = await Page.findByIdAndUpdate(page._id, { $set: update }, { new: true });

    return NextResponse.json({ success: true, page: updated });
  } catch (err) {
    console.error('Space update failed:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const { id } = await context.params;
    await dbConnect();

    const page = await ownedPage(id, session.user.email);
    if (!page) {
      return NextResponse.json({ success: false, error: 'Space not found' }, { status: 404 });
    }

    await Page.deleteOne({ _id: page._id });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Space delete failed:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
