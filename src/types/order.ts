export enum OrderStatus { PENDING = "PENDING", COMPLETED = "COMPLETED", CANCELLED = "CANCELLED" }
export interface OrderItem { id: string; itemId: string; price: number; }
export interface Order { id: string; userId: string; items: OrderItem[]; total: number; status: OrderStatus; createdAt: Date; }