import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BusinessProfile from '@/models/BusinessProfile';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { images, ...formData } = body;
    
    await dbConnect();
    
    let imageUrls: string[] = [];
    if (images && Array.isArray(images) && images.length > 0) {
      const uploadPromises = images.map((base64: string) => 
        uploadToCloudinary(base64, 'artsy/business_samples')
      );
      imageUrls = await Promise.all(uploadPromises);
    }
    
    const profile = await BusinessProfile.create({
      ...formData,
      sampleImages: imageUrls
    });
    
    return NextResponse.json({ success: true, data: profile }, { status: 201 });
  } catch (error: any) {
    console.error('Business Profile Submission Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

