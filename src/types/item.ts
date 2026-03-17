import { User } from "./user";
import { AestheticType } from "./aesthetic";
export interface Item { id: string; title: string; price: number; imageUrl?: string; sellerId: string; aestheticTags: AestheticType[]; createdAt: Date; }
export interface CreateItemInput { title: string; price: number; imageUrl?: string; aestheticTags: AestheticType[]; }
export interface ItemWithSeller extends Item { seller: User; }