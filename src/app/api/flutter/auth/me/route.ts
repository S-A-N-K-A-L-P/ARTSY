import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.avatar || "/default-avatar.png",
      username: user.username || user.email.split("@")[0],
      bio: user.bio || "No bio yet",
      coverImage: user.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200",
      stats: {
        posts: user.postsCount || 0,
        followers: user.followersCount || 0,
        following: user.followingCount || 0,
      },
      onboardingComplete: user.onboardingComplete || false,
      socialLinks: user.socialLinks || {},
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
