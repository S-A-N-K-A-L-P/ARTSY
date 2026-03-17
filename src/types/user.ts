import { AestheticType } from "./aesthetic";
export interface User { id: string; username: string; email: string; bio?: string; avatarUrl?: string; aesthetic: AestheticType; createdAt: Date; }
export interface UserProfile extends User { followersCount: number; followingCount: number; }
export interface FollowRelation { followerId: string; followingId: string; }