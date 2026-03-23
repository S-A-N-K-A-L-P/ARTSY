import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.password) {
      return NextResponse.json({ error: "Please use social login" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate and save a new secure token for the mobile session
    user.token = crypto.randomBytes(32).toString('hex');
    await user.save();

    // Success - return user data in the format expected by Flutter fetchCurrentUser
    return NextResponse.json({
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
    });
  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 });
  }
}
