import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'GET request to LoginContext' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ message: 'POST request to LoginContext', data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
