'use client';

import React from "react";
import { IOSProfile } from "@/components/ui/ios/ios-profile";
import { IOSBottomNav } from "@/components/ui/ios/ios-bottom-nav";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-bg">
      <IOSProfile />
      <IOSBottomNav />
    </div>
  );
}
