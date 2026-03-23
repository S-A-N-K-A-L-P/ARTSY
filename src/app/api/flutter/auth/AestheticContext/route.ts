import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { userId, aesthetic } = await request.json();

    if (!userId || !aesthetic) {
      return NextResponse.json({ success: false, error: "userId and aesthetic are required" }, { status: 400 });
    }

    let updateData: any = {};
    if (typeof aesthetic === 'string') {
      // If it's a string, it's a theme name. 
      // In a real app we'd fetch its defaults, but for now we just store the name.
      updateData = { "aesthetic.name": aesthetic };
    } else {
      // It's a structured object from Flutter
      Object.keys(aesthetic).forEach(key => {
        updateData[`aesthetic.${key}`] = aesthetic[key];
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        aesthetic: user.aesthetic
      }
    });
  } catch (error: any) {
    console.error("Update aesthetic error:", error.message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
