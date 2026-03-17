import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const profileUpdateSchema = z.object({
  bio: z.string().max(160, "Bio must be at most 160 characters").optional(),
  avatarUrl: z.string().url("Invalid URL").optional(),
  aesthetic: z.enum(['noir', 'minimal', 'vaporwave', 'brutalist', 'grunge', 'cyberpunk']).optional(),
});