import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Onboarding from '@/models/Onboarding';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Mapping Flutter naming to backend naming
    const userId = body.userId || body.user_id;
    const interests = body.interests || body.Interests || [];
    const aesthetics = body.aesthetics || body.Aesthetic || [];
    const palette = body.palette || body.Palette || [];
    const budget = body.budget || body.Budget || '';
    const productType = body.productType || body["Product Type"] || [];

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update or create onboarding document
    const onboarding = await Onboarding.findOneAndUpdate(
      { userId },
      {
        interests: interests || [],
        aesthetics: aesthetics || [],
        palette: palette || [],
        budget: budget || '',
        productType: productType || [],
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    // Update user reference
    user.onboarding = onboarding._id;
    await user.save();

    return NextResponse.json({ 
      message: 'Onboarding completed successfully', 
      onboarding: onboarding 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Flutter Onboarding error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
