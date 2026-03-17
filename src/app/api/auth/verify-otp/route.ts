import { NextResponse } from 'next/server';
import { OTP_STORE } from '../send-otp/route';

export async function POST(req: Request) {
    try {
        const { phone, otp } = await req.json();
        const stored = OTP_STORE[phone];

        if (!stored) return NextResponse.json({ error: 'No OTP sent' }, { status: 400 });
        if (Date.now() > stored.expires) return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
        if (stored.otp !== otp) return NextResponse.json({ error: 'Wrong code' }, { status: 400 });

        delete OTP_STORE[phone]; // clear after use
        return NextResponse.json({ success: true, phone });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown Error" }, { status: 500 });
    }
}
