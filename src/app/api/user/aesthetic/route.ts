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
    console.error('API Aesthetic GET Error:', error);
    return NextResponse.json({ aesthetic: 'soft' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { aesthetic } = await req.json();

    if (!aesthetic || typeof aesthetic !== 'string') {
      return NextResponse.json({ error: 'Invalid aesthetic' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { aesthetic },
      { new: true }
    );

    return NextResponse.json({ 
      success: true, 
      aesthetic: user?.aesthetic 
    });
  } catch (error) {
    console.error('API Aesthetic PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
