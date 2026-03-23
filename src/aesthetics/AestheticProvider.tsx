'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
  const [aesthetic, setAesthetic] = useState<ThemeName>(
    (themes[currentAesthetic as ThemeName] ? currentAesthetic : 'soft') as ThemeName
  );

  useEffect(() => {
    // Fetch user preference on mount to avoid server-side DB dependency in Layout
    const fetchAesthetic = async () => {
      try {
        const res = await fetch('/api/user/aesthetic');
        const data = await res.json();
        if (data?.aesthetic && themes[data.aesthetic as ThemeName]) {
          setAesthetic(data.aesthetic as ThemeName);
        }
      } catch (err) {
        console.error('Failed to fetch aesthetic from API:', err);
      }
    };
    fetchAesthetic();
  }, []);

  const muiTheme = useMemo(() => generateMuiTheme(aesthetic), [aesthetic]);

  useEffect(() => {
    applyTheme(aesthetic);
  }, [aesthetic]);

  return (
    <AestheticContext.Provider value={{ aesthetic }}>
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
