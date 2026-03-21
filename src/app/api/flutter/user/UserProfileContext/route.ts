import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET request to UserProfileContext' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'POST request to UserProfileContext', data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
