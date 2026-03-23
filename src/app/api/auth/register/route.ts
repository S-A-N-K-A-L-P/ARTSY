import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { registerUser } from "@/lib/authService";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const user = await registerUser(body);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Registration error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
