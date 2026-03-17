import { Order } from '../types/order';
import { CartItem } from '../types/cart';

export const createOrder = async (userId: string, items: CartItem[]): Promise<Order> => {
  const res = await fetch(`/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, items: items.map(item => ({ itemId: item.itemId, quantity: item.quantity })) }),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
};

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  const res = await fetch(`/api/users/${userId}/orders`);
  if (!res.ok) throw new Error('Failed to fetch user orders');
  return res.json();
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const res = await fetch(`/api/orders/${orderId}`);
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
};