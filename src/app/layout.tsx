import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import AestheticProvider from '@/aesthetics/AestheticProvider';
import { ClientProviders } from '@/components/ClientProviders';
import { headers } from 'next/headers';
import './globals.css';

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await getServerSession(authOptions);
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    
    let aesthetic = 'soft';

    if (session?.user?.email) {
      try {
        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (user?.aesthetic) {
          aesthetic = user.aesthetic;
        }
      } catch (dbError) {
        console.error('SSR DB ERROR:', dbError);
      }
    }

    return (
      <html lang='en'>
        <body className={inter.className}>
          <ClientProviders>
            <AestheticProvider currentAesthetic={aesthetic}>
              {children}
            </AestheticProvider>
          </ClientProviders>
        </body>
      </html>
    );
  } catch (ssrError) {
    console.error('SSR FATAL ERROR:', ssrError);
    throw ssrError;
  }
}
