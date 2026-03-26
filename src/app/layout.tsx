import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import AestheticProvider from '@/aesthetics/AestheticProvider';
import { ClientProviders } from '@/components/ClientProviders';
import { headers } from 'next/headers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  let userAesthetic = 'soft';

  if (session?.user?.email) {
    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).lean();
    if (user?.aesthetic?.name) {
      userAesthetic = user.aesthetic.name;
    }
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
          <AestheticProvider currentAesthetic={userAesthetic}>
            {children}
          </AestheticProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
