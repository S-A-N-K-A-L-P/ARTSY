'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useCart } from '@/components/cart/CartProvider';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const money = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Your bag
          </h1>
          <p
            className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'var(--text-muted)' }}
          >
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </header>

        {items.length === 0 ? (
          <div
            className="rounded-[var(--radius)] border py-24 text-center"
            style={{
              borderColor: 'var(--border-subtle)',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <ShoppingBag
              size={40}
              className="mx-auto mb-4 opacity-30"
              style={{ color: 'var(--text-muted)' }}
            />
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Your bag is empty.
            </p>
            <Link
              href="/home"
              className="inline-block mt-6 h-10 px-6 leading-10 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] active:scale-95 transition-transform"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              Discover items
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] items-start">
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="flex gap-4 p-3 rounded-[var(--radius)] border overflow-hidden"
                    style={{
                      borderColor: 'var(--border-subtle)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    <div
                      className="w-20 h-20 shrink-0 rounded-xl overflow-hidden"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <h2
                          className="text-sm font-semibold leading-snug line-clamp-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.title}
                        </h2>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.title}`}
                          className="shrink-0 p-1.5 rounded-lg active:scale-90 transition-transform"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-2">
                        <div
                          className="flex items-center rounded-full border"
                          style={{ borderColor: 'var(--border-subtle)' }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="h-8 w-8 flex items-center justify-center active:scale-90 transition-transform"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <Minus size={13} />
                          </button>
                          <span
                            className="w-7 text-center text-xs font-bold tabular-nums"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="h-8 w-8 flex items-center justify-center active:scale-90 transition-transform"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span
                          className="text-sm font-bold tabular-nums"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {money(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <aside
              className="rounded-[var(--radius)] border p-6 lg:sticky lg:top-6"
              style={{
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <h2
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-5"
                style={{ color: 'var(--text-muted)' }}
              >
                Summary
              </h2>

              <div className="flex items-baseline justify-between mb-6">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Subtotal
                </span>
                <span
                  className="text-2xl font-bold tabular-nums"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {money(totalPrice)}
                </span>
              </div>

              <button
                className="w-full h-11 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] active:scale-[0.98] transition-transform"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full mt-3 h-9 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] border active:scale-[0.98] transition-transform"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
              >
                Clear bag
              </button>
            </aside>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
