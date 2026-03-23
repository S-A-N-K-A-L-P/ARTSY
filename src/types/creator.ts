import { LucideIcon } from 'lucide-react';

export interface CreatorStats {
  sales?: string;
  items?: number | string;
  // Fallback for demo data
  [key: string]: any;
}

export interface CreatorStatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface AestheticItem {
  id: string | number;
  title: string;
  category: string;
  aesthetic: string;
  currency: string;
  price: number;
  images: string[];
  owner?: string;
  attributes?: Record<string, string>;
}

export interface CartItem extends Pick<AestheticItem, 'id' | 'title' | 'price'> {
  image: string;
}

export interface TabItem {
  id: string;
  label: string;
}

export interface PathItem {
  label: string;
  href?: string;
}

export interface UserProfile {
  username: string;
  image?: string;
  aesthetic?: string;
  pages?: any[];
  followersCount?: string | number;
  followingCount?: string | number;
  description?: string;
}
