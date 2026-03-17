import fs from 'fs';
import path from 'path';

const SRC_DIR = 'c:/art_web/antigravity/src';

const directories = [
  'features/auth',
  'features/users',
  'features/items',
  'features/aesthetics',
  'services',
  'types',
  'schemas',
  'hooks',
  'app/api/users',
  'app/api/users/[username]',
  'app/api/items',
  'app/api/items/[itemId]',
  'app/api/orders',
  'app/api/aesthetics'
];

const files = [
  // Redux Features
  { path: 'features/auth/authSlice.ts', content: 'import { createSlice } from "@reduxjs/toolkit";\nconst initialState = { isAuthenticated: false, user: null, loading: false, error: null };\nexport const authSlice = createSlice({ name: "auth", initialState, reducers: {} });\nexport default authSlice.reducer;' },
  { path: 'features/auth/authSelectors.ts', content: 'export const selectAuth = (state: any) => state.auth;' },
  { path: 'features/users/userSlice.ts', content: 'import { createSlice } from "@reduxjs/toolkit";\nexport const profileSlice = createSlice({ name: "profile", initialState: {}, reducers: {} });\nexport default profileSlice.reducer;' },
  { path: 'features/users/userSelectors.ts', content: 'export const selectProfile = (state: any) => state.profile;' },
  { path: 'features/items/itemSlice.ts', content: 'import { createSlice } from "@reduxjs/toolkit";\nexport const itemSlice = createSlice({ name: "items", initialState: { list: [], loading: false }, reducers: {} });\nexport default itemSlice.reducer;' },
  { path: 'features/items/itemSelectors.ts', content: 'export const selectItems = (state: any) => state.items;' },
  { path: 'features/aesthetics/aestheticService.ts', content: 'import { AestheticType } from "../../types/aesthetic";\nexport const resolveAesthetic = (username: string): AestheticType => "noir";' },

  // Services
  { path: 'services/userService.ts', content: 'import { User } from "../types/user";\nexport const getUserByUsername = async (username: string) => { return fetch(`/api/users/${username}`).then(res => res.json()); };\nexport const updateUserProfile = async (id: string, data: Partial<User>) => {};\nexport const followUser = async (followerId: string, followingId: string) => {};' },
  { path: 'services/itemService.ts', content: 'import { CreateItemInput } from "../types/item";\nexport const getItemById = async (id: string) => {};\nexport const getItemsByUser = async (userId: string) => {};\nexport const getFeedItems = async (limit: number, cursor?: string) => {};\nexport const createItem = async (data: CreateItemInput) => {};\nexport const deleteItem = async (id: string) => {};' },
  { path: 'services/orderService.ts', content: 'import { CartItem } from "../types/cart";\nexport const createOrder = async (userId: string, items: CartItem[]) => {};\nexport const getOrdersByUser = async (userId: string) => {};\nexport const getOrderById = async (orderId: string) => {};' },
  { path: 'services/uploadService.ts', content: 'export const uploadImage = async (file: File): Promise<string> => { return URL.createObjectURL(file); };' },

  // Types
  { path: 'types/user.ts', content: 'import { AestheticType } from "./aesthetic";\nexport interface User { id: string; username: string; email: string; bio?: string; avatarUrl?: string; aesthetic: AestheticType; createdAt: Date; }\nexport interface UserProfile extends User { followersCount: number; followingCount: number; }\nexport interface FollowRelation { followerId: string; followingId: string; }' },
  { path: 'types/item.ts', content: 'import { User } from "./user";\nimport { AestheticType } from "./aesthetic";\nexport interface Item { id: string; title: string; price: number; imageUrl?: string; sellerId: string; aestheticTags: AestheticType[]; createdAt: Date; }\nexport interface CreateItemInput { title: string; price: number; imageUrl?: string; aestheticTags: AestheticType[]; }\nexport interface ItemWithSeller extends Item { seller: User; }' },
  { path: 'types/order.ts', content: 'export enum OrderStatus { PENDING = "PENDING", COMPLETED = "COMPLETED", CANCELLED = "CANCELLED" }\nexport interface OrderItem { id: string; itemId: string; price: number; }\nexport interface Order { id: string; userId: string; items: OrderItem[]; total: number; status: OrderStatus; createdAt: Date; }' },
  { path: 'types/aesthetic.ts', content: 'export type AestheticType = "noir" | "minimal" | "vaporwave" | "brutalist" | "grunge" | "cyberpunk";' },
  { path: 'types/cart.ts', content: 'export interface CartItem { id: string; itemId: string; title: string; price: number; quantity: number; }\nexport interface Cart { items: CartItem[]; total: number; }' },

  // Schemas
  { path: 'schemas/userSchema.ts', content: 'import { z } from "zod";\nexport const registerSchema = z.object({ username: z.string().min(3), email: z.string().email(), password: z.string().min(8) });\nexport const loginSchema = z.object({ email: z.string().email(), password: z.string() });\nexport const profileUpdateSchema = z.object({ bio: z.string().optional(), avatarUrl: z.string().url().optional(), aesthetic: z.string().optional() });' },
  { path: 'schemas/itemSchema.ts', content: 'import { z } from "zod";\nexport const createItemSchema = z.object({ title: z.string().min(2), price: z.number().positive(), imageUrl: z.string().url().optional(), aestheticTags: z.array(z.string()) });\nexport const updateItemSchema = createItemSchema.partial();' },
  { path: 'schemas/orderSchema.ts', content: 'import { z } from "zod";\nexport const createOrderSchema = z.object({ userId: z.string(), items: z.array(z.object({ itemId: z.string(), quantity: z.number().int().positive() })) });' },

  // Hooks
  { path: 'hooks/useAuth.ts', content: 'import { useSession } from "next-auth/react";\nexport const useAuth = () => { const { data: session, status } = useSession(); return { user: session?.user, isAuthenticated: status === "authenticated", isLoading: status === "loading" }; };' },
  { path: 'hooks/useUser.ts', content: 'import { useState, useEffect } from "react";\nimport { getUserByUsername } from "../services/userService";\nimport { UserProfile } from "../types/user";\nexport const useUser = (username: string) => { const [user, setUser] = useState<UserProfile | null>(null); const [loading, setLoading] = useState(true); useEffect(() => { getUserByUsername(username).then(u => { setUser(u); setLoading(false); }); }, [username]); return { user, loading }; };' },
  { path: 'hooks/useItems.ts', content: 'import { useState, useEffect } from "react";\nimport { getFeedItems } from "../services/itemService";\nimport { Item } from "../types/item";\nexport const useItems = () => { const [items, setItems] = useState<Item[]>([]); const [loading, setLoading] = useState(true); useEffect(() => { getFeedItems(10).then(data => { setItems(data || []); setLoading(false); }); }, []); return { items, loading }; };' },
  { path: 'hooks/useAesthetic.ts', content: 'import { resolveAesthetic } from "../features/aesthetics/aestheticService";\nexport const useAesthetic = (username: string) => { return resolveAesthetic(username); };' },

  // API Routes
  { path: 'app/api/users/route.ts', content: 'import { NextResponse } from "next/server";\nexport async function GET() { return NextResponse.json({ users: [] }); }\nexport async function POST(req: Request) { return NextResponse.json({ success: true }); }' },
  { path: 'app/api/users/[username]/route.ts', content: 'import { NextResponse } from "next/server";\nexport async function GET(req: Request, { params }: { params: { username: string } }) { return NextResponse.json({ username: params.username }); }' },
  { path: 'app/api/items/route.ts', content: 'import { NextResponse } from "next/server";\nexport async function GET() { return NextResponse.json({ items: [] }); }\nexport async function POST(req: Request) { return NextResponse.json({ success: true }); }' },
  { path: 'app/api/items/[itemId]/route.ts', content: 'import { NextResponse } from "next/server";\nexport async function GET(req: Request, { params }: { params: { itemId: string } }) { return NextResponse.json({ id: params.itemId }); }\nexport async function PUT(req: Request) { return NextResponse.json({ success: true }); }\nexport async function DELETE(req: Request) { return NextResponse.json({ success: true }); }' },
  { path: 'app/api/orders/route.ts', content: 'import { NextResponse } from "next/server";\nexport async function GET() { return NextResponse.json({ orders: [] }); }\nexport async function POST(req: Request) { return NextResponse.json({ success: true }); }' },
  { path: 'app/api/aesthetics/route.ts', content: 'import { NextResponse } from "next/server";\nexport async function GET() { return NextResponse.json({ aesthetics: ["noir", "minimal", "vaporwave", "brutalist", "grunge", "cyberpunk"] }); }' }
];

directories.forEach(dir => {
  const fullPath = path.join(SRC_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});

files.forEach(file => {
  const fullPath = path.join(SRC_DIR, file.path);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, file.content);
    console.log(`Created file: ${fullPath}`);
  }
});
