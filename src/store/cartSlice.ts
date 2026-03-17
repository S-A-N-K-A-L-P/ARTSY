import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface CartItem {
  id: string;
  title: string;
  price: number;
}
 
const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.push(action.payload);
    },
  },
});
 
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
