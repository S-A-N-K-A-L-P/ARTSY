import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// TEMPORARY mock users — replaced with real DB in Phase 10
const MOCK_USERS = [
    {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        // hashed version of 'password123'
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    },
];

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                const user = MOCK_USERS.find(u => u.email === credentials.email);
                if (!user) return null;
                const valid = await bcrypt.compare(credentials.password, user.password);
                return valid ? { id: user.id, name: user.name, email: user.email } : null;
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
};
