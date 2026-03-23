import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Item from "@/models/Item";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { itemId, userId } = body;

    if (!itemId) {
      return NextResponse.json({ error: "itemId is required" }, { status: 400 });
    }

    // In a real app, we'd create a Like document or update the Item's likes count
    // For now, we'll simulate success to unblock the Flutter UI
    console.log(`User ${userId} liked item ${itemId}`);

    return NextResponse.json({
      success: true,
      message: "Item liked successfully",
      likesCount: Math.floor(Math.random() * 100) + 1 // Simulated count
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: "Use POST to like an item" });
}
