import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BusinessProfile from '@/models/BusinessProfile';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    
    const profile = await BusinessProfile.create(body);
    
    return NextResponse.json({ success: true, data: profile }, { status: 201 });
  } catch (error: any) {
    console.error('Business Profile Submission Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
