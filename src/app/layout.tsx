import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import AestheticProvider from '@/aesthetics/AestheticProvider';
import { ClientProviders } from '@/components/ClientProviders';
import { resolveTheme, DEFAULT_THEME } from '@/lib/theme/themes';
import { fontVariables } from '@/lib/theme/fonts';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'astl',
  description: 'People are the storefront. Aesthetic is the category.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  let userAesthetic = DEFAULT_THEME;

  if (session?.user?.email) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: session.user.email })
        .select('aesthetic.name')
        .lean<{ aesthetic?: { name?: string } }>();
      userAesthetic = resolveTheme(user?.aesthetic?.name);
    } catch (err) {
      // A theme lookup failure must not blank the whole app — fall back.
      console.error('Failed to load user aesthetic:', err);
    }
  }

  return (
    // data-theme is rendered on the server so the correct palette is applied on
    // the very first paint. themes.css keys every aesthetic off this attribute.
    <html
      lang='en'
      data-theme={userAesthetic}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body>
        <ClientProviders>
          <AestheticProvider currentAesthetic={userAesthetic}>
            {children}
          </AestheticProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
