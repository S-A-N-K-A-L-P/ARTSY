import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
  items: z.array(z.object({
    itemId: z.string().uuid("Invalid item ID format"),
    quantity: z.number().int().positive("Quantity must be a positive integer")
  })).min(1, "Order must contain at least one item")
});