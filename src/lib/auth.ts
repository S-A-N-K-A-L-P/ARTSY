import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from './db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                
                await dbConnect();
                console.log(`[Auth Debug] Attempting login for email: ${credentials.email}`);
                
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    console.log(`[Auth Debug] User not found: ${credentials.email}`);
                    return null;
                }

                if (!user.password) {
                    console.log(`[Auth Debug] User found but has no password set: ${credentials.email}`);
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                
                if (!isValid) {
                    console.log(`[Auth Debug] Password mismatch for: ${credentials.email}`);
                    return null;
                }

                console.log(`[Auth Debug] Successful login for: ${credentials.email}`);

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
};
