import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Page from "@/models/Page";
import User from "@/models/User";
import Item from "@/models/Item";
import PublicPageClient from "./PublicPageClient";

export default async function PublicSpacePage({ params }: { params: Promise<{ username: string; slug: string }> }) {
  const { username, slug } = await params;
  await dbConnect();

  // Find user first
  const user = await User.findOne({ username });
  if (!user) return notFound();

  // Find page by slug AND owner
  const page = await Page.findOne({ slug, ownerId: user._id });
  if (!page) return notFound();

  // Fetch items for this page
  const items = await Item.find({ pageId: page._id }).sort({ createdAt: -1 });

  return <PublicPageClient page={JSON.parse(JSON.stringify(page))} user={JSON.parse(JSON.stringify(user))} items={JSON.parse(JSON.stringify(items))} />;
}
