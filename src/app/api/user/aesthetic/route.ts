import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ aesthetic: 'soft' });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    
    return NextResponse.json({ 
      aesthetic: user?.aesthetic || 'soft' 
    });
  } catch (error) {
    console.error('API Aesthetic Error:', error);
    return NextResponse.json({ aesthetic: 'soft' }, { status: 500 });
  }
}
