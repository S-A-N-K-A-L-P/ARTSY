import { notFound } from 'next/navigation';
import { Types } from 'mongoose';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import '@/models/Page'; // Ensure Page model is registered
import { IOSProfile } from '@/components/ui/ios/ios-profile';
import { IOSBottomNav } from '@/components/ui/ios/ios-bottom-nav';
import { resolveTheme } from '@/lib/theme/themes';

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  await dbConnect();

  let user = await User.findOne({ username }).populate('pages');

  /*
   * Fall back to an id lookup only when the segment actually looks like one.
   * This used to call User.findById(username) inside an empty catch for every
   * miss, so a normal 404 ran a doomed cast and swallowed any real error.
   */
  if (!user && Types.ObjectId.isValid(username)) {
    user = await User.findById(username).populate('pages');
  }

  if (!user) notFound();

  return <ProfileView user={user} />;
}

function ProfileView({ user }: { user: any }) {
  const userData = {
    name: user.profile?.name || user.username,
    username: user.username || user.email?.split('@')[0],
    image:
      user.profile?.avatar ||
      user.avatar ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
    coverImage: user.coverImage,
    // No invented bio: an empty one renders as empty rather than claiming
    // every creator is a "Digital curator and aesthetic enthusiast."
    bio: user.profile?.bio || user.bio || '',
    stats: {
      posts: user.postsCount || 0,
      followers: user.followersCount || 0,
      following: user.followingCount || 0,
    },
    pages: user.pages || [],
  };

  /*
   * The creator's aesthetic, scoped to this page.
   *
   * A public profile is the shareable face of a creator, and it was rendering
   * in whatever theme the *visitor* happened to have. Scoping it here shows
   * their look without touching the visitor's own saved preference.
   */
  const theme = resolveTheme(user.aesthetic?.name);

  return (
    <div
      data-theme={theme}
      style={{ fontFamily: 'var(--font)' }}
      className="min-h-screen bg-bg text-text"
    >
      <IOSProfile initialUser={userData} />
      <IOSBottomNav />
    </div>
  );
}
