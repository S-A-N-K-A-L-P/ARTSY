import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { registerUser } from "@/lib/authService";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    await dbConnect();
    let body = await request.json();
    
    // Mapping Flutter naming to backend naming if needed
    if (body["Mobile No"]) {
      body.phone = body["Mobile No"];
    }
    if (body["Full Name"]) {
      body.name = body["Full Name"];
    }

    // Handle optional profile picture upload
    const imageToUpload = body.image || body.avatar || body.profile_pic;
    if (imageToUpload && (imageToUpload.startsWith('data:image') || imageToUpload.startsWith('http') === false)) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(imageToUpload, 'artsy/avatars');
        body.avatar = cloudinaryUrl;
      } catch (uploadErr) {
        console.warn("Cloudinary upload failed, proceeding with default avatar", uploadErr);
        // We don't block registration if avatar fails, just use default
      }
    }

    const user = await registerUser(body);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Flutter Registration error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
