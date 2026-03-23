'use client';

import React from 'react';
import { useAesthetic } from '@/aesthetics/AestheticProvider';
import { aestheticMap } from '@/aesthetics';

type ComponentName = 'ItemCard' | 'ProfileLayout' | 'ProfileHeader';

interface AestheticRendererProps {
  component?: ComponentName;
  props?: Record<string, any>;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
  aesthetic?: string;
}

/**
 * AestheticRenderer: Dynamically renders the correct component variant
 * based on the user's currently-active aesthetic.
 *
 * Usage: <AestheticRenderer component="ItemCard" props={{ title: "Art" }} />
 */
import { themes, ThemeName } from '@/lib/theme/themes';

export default function AestheticRenderer({ 
  component, 
  props = {}, 
  fallback = null,
  children,
  aesthetic: aestheticOverride
}: AestheticRendererProps) {
  const { aesthetic: globalAesthetic } = useAesthetic();
  const activeAesthetic = (aestheticOverride || globalAesthetic) as ThemeName;

  const aestheticKey = mapThemeToAesthetic(activeAesthetic);
  const aestheticModule = aestheticMap[aestheticKey as keyof typeof aestheticMap];

  // If used as a wrapper for children
  if (children) {
    const themeStyles = themes[activeAesthetic] || themes.minimal;
    return (
      <div style={themeStyles as React.CSSProperties} className="contents-wrapper">
        {children}
      </div>
    );
  }

  if (!aestheticModule || !component) {
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