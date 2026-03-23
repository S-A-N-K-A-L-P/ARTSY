import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { registerUser } from "@/lib/authService";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const user = await registerUser(body);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Flutter Registration error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
