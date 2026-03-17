import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../types/item';

interface ItemsState {
  list: Item[];
  singleItem: Item | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  list: [],
  singleItem: null,
  loading: false,
  error: null,
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItemsList: (state, action: PayloadAction<Item[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSingleItem: (state, action: PayloadAction<Item>) => {
      state.singleItem = action.payload;
      state.loading = false;
      state.error = null;
    },
    setItemsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setItemsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setItemsList, setSingleItem, setItemsLoading, setItemsError } = itemSlice.actions;
export default itemSlice.reducer;