'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes, applyTheme, ThemeName } from '@/lib/theme/themes';
import { generateMuiTheme } from './theme';

interface AestheticContextType {
  aesthetic: ThemeName;
}

const AestheticContext = createContext<AestheticContextType>({ aesthetic: 'soft' });

export const useAesthetic = () => useContext(AestheticContext);

export default function AestheticProvider({
  children,
  currentAesthetic = 'soft',
}: {
  children: React.ReactNode;
  currentAesthetic?: string;
}) {
  const aestheticName = (themes[currentAesthetic as ThemeName] ? currentAesthetic : 'soft') as ThemeName;

  const muiTheme = useMemo(() => generateMuiTheme(aestheticName), [aestheticName]);

  useEffect(() => {
    applyTheme(aestheticName);
  }, [aestheticName]);

  return (
    <AestheticContext.Provider value={{ aesthetic: aestheticName }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div 
          className="min-h-screen bg-bg text-text font-sans antialiased transition-colors duration-300"
          style={{
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
          }}
        >
          {children}
        </div>
      </MuiThemeProvider>
    </AestheticContext.Provider>
  );
}
