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
      // If it's a string, it's a theme name. We should ideally fetch its defaults.
      // For now, we'll map common ones or let the frontend send the full object.
      // To keep it simple and property-based:
      updateData = { "aesthetic.name": aesthetic };
    } else {
      // It's a structured object
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
