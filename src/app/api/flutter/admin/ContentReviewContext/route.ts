import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET request to ContentReviewContext' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'POST request to ContentReviewContext', data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
