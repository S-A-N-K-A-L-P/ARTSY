import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import itemsReducer from '../features/items/itemSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        items: itemsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
