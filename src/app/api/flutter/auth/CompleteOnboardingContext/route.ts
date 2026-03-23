import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import OnboardingRecord from "@/models/OnboardingRecord";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { userId, aesthetic, palette, metadata } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, error: "UserId is required" }, { status: 400 });
    }

    // 1. Create or update the detailed onboarding record
    const record = await OnboardingRecord.findOneAndUpdate(
      { user: userId },
      { 
        aesthetic: aesthetic || 'soft', 
        palette: palette || 'classic',
        onboardedAt: new Date(),
        metadata: metadata || {}
      },
      { new: true, upsert: true }
    );

    // 2. Mark onboarding as complete in the User profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        onboardingComplete: true,
        onboarding: record._id,
        // Also sync the primary aesthetic field (which is now an object in User model)
        "aesthetic.name": aesthetic || 'soft'
      },
      { new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Onboarding completed successfully",
      onboardingComplete: true
    });
  } catch (err: any) {
    console.error("Complete Onboarding error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
