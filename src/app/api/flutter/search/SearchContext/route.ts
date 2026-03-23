import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Item from "@/models/Item";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Search items by title or tags
    const items = await Item.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).limit(20);

    return NextResponse.json({
      success: true,
      data: items
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
