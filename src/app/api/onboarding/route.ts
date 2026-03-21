import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Onboarding from '@/models/Onboarding';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();
        const userId = (session.user as any).id;

        const onboarding = await Onboarding.findOneAndUpdate(
            { userId },
            { 
                ...data, 
                userId,
                updatedAt: new Date() 
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({ message: 'Onboarding completed', onboarding }, { status: 200 });
    } catch (error: any) {
        console.error('Onboarding error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
