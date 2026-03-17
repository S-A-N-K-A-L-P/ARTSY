import { z } from 'zod';

export const createItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must be at most 100 characters"),
  price: z.number().positive("Price must be positive"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  aestheticTags: z.array(z.enum(['noir', 'minimal', 'vaporwave', 'brutalist', 'grunge', 'cyberpunk'])).min(1, "At least one aesthetic tag is required"),
});

export const updateItemSchema = createItemSchema.partial();