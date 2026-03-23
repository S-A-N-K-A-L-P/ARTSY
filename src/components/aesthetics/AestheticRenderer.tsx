'use client';

import React from 'react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import { aestheticMap } from '@/aesthetics';

type ComponentName = 'ItemCard' | 'ProfileLayout' | 'ProfileHeader';

interface AestheticRendererProps {
  component: ComponentName;
  props?: Record<string, any>;
  fallback?: React.ReactNode;
}

/**
 * AestheticRenderer: Dynamically renders the correct component variant
 * based on the user's currently-active aesthetic.
 *
 * Usage: <AestheticRenderer component="ItemCard" props={{ title: "Art" }} />
 */
export default function AestheticRenderer({ component, props = {}, fallback = null }: AestheticRendererProps) {
  const { aesthetic } = useAesthetic();

  const aestheticKey = mapThemeToAesthetic(aesthetic);
  const aestheticModule = aestheticMap[aestheticKey as keyof typeof aestheticMap];

  if (!aestheticModule) {
    return <>{fallback}</>;
  }

  const Comp = aestheticModule[component as keyof typeof aestheticModule] as React.ComponentType<any> | undefined;

  if (!Comp) {
    return <>{fallback}</>;
  }

  return <Comp {...props} />;
}

function mapThemeToAesthetic(themeName: string): string {
  const directMap: Record<string, string> = {
    noir: 'noir',
    minimal: 'minimal',
    cyberpunk: 'cyberpunk',
    vaporwave: 'vaporwave',
    brutalist: 'brutalist',
    grunge: 'grunge',
    soft: 'minimal',
    fantasy: 'vaporwave',
    luxury: 'noir',
  };
  return directMap[themeName] || 'minimal';
}