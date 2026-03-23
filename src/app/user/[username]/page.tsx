import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { IOSProfile } from "@/components/ui/ios/ios-profile";
import { IOSBottomNav } from "@/components/ui/ios/ios-bottom-nav";

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  await dbConnect();
  const user = await User.findOne({ username: params.username });

  if (!user) {
    // Fallback to searching by ID if username didn't match (optional)
    try {
      const userById = await User.findById(params.username);
      if (userById) {
        return <ProfileView user={userById} />;
      }
    } catch {}
    return notFound();
  }

  return <ProfileView user={user} />;
}

function ProfileView({ user }: { user: any }) {
  const userData = {
    name: user.name,
    username: user.username || user.email.split("@")[0],
    image: user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    bio: user.bio || "Digital curator and aesthetic enthusiast.",
    stats: {
      posts: user.postsCount || 0,
      followers: user.followersCount || 0,
      following: user.followingCount || 0,
    },
  };

  return (
    <div className="min-h-screen bg-bg">
      <IOSProfile user={userData} />
      <IOSBottomNav />
    </div>
  );
}