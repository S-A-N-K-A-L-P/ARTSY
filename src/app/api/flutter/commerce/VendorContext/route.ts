import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Page from "@/models/Page";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get('ownerId');

    if (ownerId) {
      const pages = await Page.find({ ownerId }).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, data: pages });
    }

    // Default: fetch all public/featured pages for discovery
    const pages = await Page.find({ "settings.isPublic": true }).limit(20).sort({ "stats.views": -1 });

    return NextResponse.json({
      success: true,
      data: pages
    });
  } catch (error: any) {
    console.error("Fetch Pages error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Placeholder for creating pages from Flutter if needed later
  return NextResponse.json({ message: 'POST to VendorContext not yet implemented for Flutter' });
}
