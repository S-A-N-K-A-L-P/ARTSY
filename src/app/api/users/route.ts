import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { registerSchema } from '@/schemas/userSchema';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    let users;
    if (query) {
      users = await prisma.user.findMany({
        where: {
          username: { contains: query, mode: 'insensitive' }
        },
        select: { id: true, username: true, avatar: true, aesthetic: true }
      });
    } else {
      users = await prisma.user.findMany({
        take: 20,
        select: { id: true, username: true, avatar: true, aesthetic: true }
      });
    }

    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // TODO: hash password with bcrypt before storing
    const user = await prisma.user.create({
      data: {
        name: validatedData.username,
        username: validatedData.username,
        email: validatedData.email,
        password: validatedData.password,
        aesthetic: 'noir',
      },
      select: {
        id: true,
        username: true,
        email: true,
        aesthetic: true
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
  }
}