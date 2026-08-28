import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { registerSchema } from '@/schemas/userSchema';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    /*
     * `avatar` and `aesthetic` were selected as top-level fields, but the
     * schema stores them at profile.avatar and aesthetic.name — so every
     * result came back without an image or a theme.
     */
    const projection = 'username profile.name profile.avatar aesthetic.name followersCount';
    const filter = query
      ? {
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { 'profile.name': { $regex: query, $options: 'i' } },
          ],
        }
      : {};

    const users = await User.find(filter).limit(40).select(projection).lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await User.findOne({ 
      $or: [{ email: validatedData.email }, { username: validatedData.username }] 
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User or email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await User.create({
      name: validatedData.username,
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
      aesthetic: 'noir',
    });

    return NextResponse.json({
      id: user._id,
      username: user.username,
      email: user.email,
      aesthetic: user.aesthetic
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
  }
}