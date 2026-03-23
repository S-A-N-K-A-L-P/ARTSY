import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Item from "@/models/Item";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const ownerId = searchParams.get('ownerId');

    if (pageId) {
      const items = await Item.find({ pageId }).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: items });
    }

    if (ownerId) {
      const items = await Item.find({ ownerId }).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: items });
    }

    // Discovery mode: fetch latest public items
    const items = await Item.find({ isForSale: true }).limit(30).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: items
    });
  } catch (error: any) {
    console.error("Fetch Items error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'POST to ProductContext not yet implemented for Flutter' });
}
