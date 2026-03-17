export interface CartItem { id: string; itemId: string; title: string; price: number; quantity: number; }
export interface Cart { items: CartItem[]; total: number; }