import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email, phone, address, password } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { phone: phone || undefined }]
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            username: email.split('@')[0] + Math.floor(Math.random() * 1000),
        });

        return NextResponse.json({ message: 'User registered successfully', userId: user._id }, { status: 201 });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
