import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import "@/models/Page"; // Ensure Page model is registered
import { IOSProfile } from "@/components/ui/ios/ios-profile";
import { IOSBottomNav } from "@/components/ui/ios/ios-bottom-nav";

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  await dbConnect();
  
  // Find user and populate their pages
  const user = await User.findOne({ username }).populate('pages');

  if (!user) {
    // Fallback to searching by ID
    try {
      const userById = await User.findById(username).populate('pages');
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
    name: user.profile?.name || user.username,
    username: user.username || user.email.split("@")[0],
    image: user.profile?.avatar || user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    coverImage: user.coverImage,
    bio: user.profile?.bio || user.bio || "Digital curator and aesthetic enthusiast.",
    stats: {
      posts: user.postsCount || 0,
      followers: user.followersCount || 0,
      following: user.followingCount || 0,
    },
    pages: user.pages || []
  };

  return (
    <div className="min-h-screen bg-bg">
      <IOSProfile initialUser={userData} />
      <IOSBottomNav />
    </div>
  );
}