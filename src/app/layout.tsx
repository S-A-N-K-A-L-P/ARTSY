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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  
  let aesthetic = 'soft';

  if (session?.user?.email) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: session.user.email });
      if (user?.aesthetic) {
        aesthetic = user.aesthetic;
      }
    } catch (error) {
      console.error('Error fetching user aesthetic:', error);
    }
  }

  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientProviders>
          <AestheticProvider currentAesthetic={aesthetic}>
            {/* The children will contain either (mobile) or (web) routes based on the device */}
            {children}
          </AestheticProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
