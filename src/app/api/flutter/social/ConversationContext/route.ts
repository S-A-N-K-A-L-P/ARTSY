import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET request to ConversationContext' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'POST request to ConversationContext', data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
