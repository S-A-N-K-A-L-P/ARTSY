import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Page from '@/models/Page';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const pages = await Page.find({ ownerId: user._id, isPublic: true });

    return NextResponse.json({ 
      success: true, 
      user,
      pages
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Update the signed-in user's own profile.
 *
 * The settings screen had no write endpoint at all, which is why
 * /dashboard/settings/profile was a one-line stub. Scoped to the session user
 * so a caller can only ever edit themselves — the identity is never taken from
 * the request body.
 */
const profileSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9._-]+$/i, 'Letters, numbers, dot, dash and underscore only')
    .optional(),
  bio: z.string().trim().max(280).optional(),
  avatar: z.string().trim().url().or(z.literal('')).optional(),
  coverImage: z.string().trim().url().or(z.literal('')).optional(),
  socialLinks: z
    .object({
      instagram: z.string().trim().max(200).optional(),
      twitter: z.string().trim().max(200).optional(),
      website: z.string().trim().max(200).optional(),
    })
    .partial()
    .optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = profileSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }
    const body = parsed.data;

    await dbConnect();

    // Username is the public handle and must stay unique.
    if (body.username) {
      const taken = await User.findOne({
        username: body.username,
        email: { $ne: session.user.email },
      }).select('_id');
      if (taken) {
        return NextResponse.json(
          { success: false, error: 'That username is already taken' },
          { status: 409 }
        );
      }
    }

    const update: Record<string, unknown> = {};
    if (body.name !== undefined) update['profile.name'] = body.name;
    if (body.bio !== undefined) update['profile.bio'] = body.bio;
    if (body.avatar !== undefined) update['profile.avatar'] = body.avatar;
    if (body.username !== undefined) update.username = body.username;
    if (body.coverImage !== undefined) update.coverImage = body.coverImage;
    if (body.socialLinks) {
      Object.entries(body.socialLinks).forEach(([k, v]) => {
        if (v !== undefined) update[`socialLinks.${k}`] = v;
      });
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ success: false, error: 'Nothing to update' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: update },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error('Profile update failed:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
