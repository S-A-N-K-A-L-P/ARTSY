import bcrypt from "bcryptjs";
import User from "@/models/User";
import { z } from "zod";
import dbConnect from "@/lib/db";
import crypto from "crypto";

// 🧠 1. Final Unified Data Contract
export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  coverImage: z.string().optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
  socialLinks: z.object({
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
  provider: z.enum(["credentials", "google"]).default("credentials"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * 🏗️ 2. authService.ts (Clean Architecture Version)
 */
export async function registerUser(data: RegisterInput) {
  // 🛡️ Add Validation Layer
  const parsed = registerSchema.parse(data);

  const {
    name,
    email,
    password,
    phone,
    avatar,
    coverImage,
    bio,
    address,
    socialLinks,
    provider = "credentials",
  } = parsed;

  let { username } = parsed;

  await dbConnect();

  // If username is not provided, generate one
  if (!username) {
    username = email.split('@')[0].toLowerCase() + Math.floor(Math.random() * 1000);
  }

  // 🔍 Check existing user
  const existingUser = await User.findOne({
    $or: [
      { email: { $regex: new RegExp(`^${email}$`, 'i') } }, 
      { username: { $regex: new RegExp(`^${username}$`, 'i') } }
    ],
  });

  if (existingUser) {
    if (existingUser.email.toLowerCase() === email.toLowerCase()) {
      throw new Error("User with this email already exists");
    }
    throw new Error("Username is already taken");
  }

  // 🔐 Hash password (if credentials)
  let hashedPassword = undefined;
  if (password && provider === "credentials") {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // 🚀 Create user
  const user = await User.create({
    profile: {
      name,
      avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      bio: bio || "",
    },
    username,
    email,
    password: hashedPassword,
    phone,
    coverImage,
    address,
    socialLinks,
    provider,
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
    pages: [],
    token: crypto.randomBytes(32).toString('hex'),
  });

  return {
    id: user._id,
    name: user.profile.name,
    username: user.username,
    email: user.email,
    avatar: user.profile.avatar,
    token: user.token,
  };
}
