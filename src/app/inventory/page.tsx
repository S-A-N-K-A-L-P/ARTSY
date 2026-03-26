'use client';

import React from 'react';
import { MobileInventoryView } from '@/components/inventory/MobileInventoryView';
import { IOSBottomNav } from '@/components/ui/ios/ios-bottom-nav';

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <MobileInventoryView />
      <IOSBottomNav />
    </main>
  );
}
