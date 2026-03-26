import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Page from "@/models/Page";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const ownerId = searchParams.get('ownerId');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query: any = {};
    if (pageId) {
      query.pageId = pageId;
    } else if (ownerId) {
      query.ownerId = ownerId;
    }

    const posts = await Post.find(query)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('ownerId')
      .populate('pageId');

    return NextResponse.json({
      success: true,
      data: posts
    });
  } catch (error: any) {
    console.error("Fetch posts error:", error.message);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
