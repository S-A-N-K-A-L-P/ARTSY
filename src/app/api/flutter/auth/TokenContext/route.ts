import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "Token is required" }, { status: 400 });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.profile?.name || user.username,
        email: user.email,
        image: user.profile?.avatar || "/default-avatar.png",
        username: user.username,
        bio: user.profile?.bio || "",
        aesthetic: user.aesthetic || "soft",
        onboardingComplete: user.onboardingComplete || false,
        token: user.token,
        stats: {
          posts: user.postsCount || 0,
          followers: user.followersCount || 0,
          following: user.followingCount || 0,
        },
        socialLinks: user.socialLinks || {},
      }
    });
  } catch (err: any) {
    console.error("Verify Token error:", err.message);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
