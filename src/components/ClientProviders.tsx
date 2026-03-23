'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import React from 'react';

import { CartProvider } from './cart/CartProvider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CartProvider>
          {children}
        </CartProvider>
      </Provider>
    </SessionProvider>
  );
}
