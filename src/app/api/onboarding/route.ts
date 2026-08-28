import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Onboarding from '@/models/Onboarding';
import User from '@/models/User';
import { resolveTheme } from '@/lib/theme/themes';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();
    const userId = (session.user as any).id;

    const onboarding = await Onboarding.findOneAndUpdate(
      { userId },
      { ...data, userId, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    /*
     * Apply the choice.
     *
     * Step 2 asks the user to pick their aesthetic — the single most
     * consequential answer in the flow, since it decides how their storefront
     * looks. It was being written to the onboarding record and then ignored,
     * so every account still came out on the default. resolveTheme() guards
     * against an id that is not a real theme.
     */
    const picked = Array.isArray(data?.aesthetics) ? data.aesthetics[0] : data?.aesthetics;
    const update: Record<string, unknown> = { onboardingComplete: true };
    if (picked) update['aesthetic.name'] = resolveTheme(picked);

    await User.updateOne({ email: session.user.email }, { $set: update });

    return NextResponse.json({ message: 'Onboarding completed', onboarding }, { status: 200 });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
