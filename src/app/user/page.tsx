import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { IOSProfile } from "@/components/ui/ios/ios-profile";
import { IOSBottomNav } from "@/components/ui/ios/ios-bottom-nav";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    redirect("/login");
  }

  const userData = {
    name: user.name,
    username: user.username || user.email.split("@")[0],
    image: user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    bio: user.bio || "Digital curator and aesthetic enthusiast. Exploring the intersection of design and technology.",
    stats: {
      posts: user.postsCount || 12,
      followers: user.followersCount || 842,
      following: user.followingCount || 156,
    },
  };

  return (
    <div className="min-h-screen bg-bg">
      <IOSProfile user={userData} />
      <IOSBottomNav />
    </div>
  );
}
