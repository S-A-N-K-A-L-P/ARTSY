'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes, applyTheme, ThemeName } from '@/lib/theme/themes';
import { generateMuiTheme } from './theme';

interface AestheticContextType {
  aesthetic: ThemeName;
  setAesthetic: (name: ThemeName) => void;
}

const AestheticContext = createContext<AestheticContextType>({
  aesthetic: 'soft',
  setAesthetic: () => {},
});

export const useAesthetic = () => useContext(AestheticContext);

export default function AestheticProvider({
  children,
  currentAesthetic = 'soft',
}: {
  children: React.ReactNode;
  currentAesthetic?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [aesthetic, setAestheticState] = useState<ThemeName>(
    (themes[currentAesthetic as ThemeName] ? currentAesthetic : 'soft') as ThemeName
  );

  // Persist aesthetic choice to DB
  const persistAesthetic = useCallback(async (name: ThemeName) => {
    try {
      await fetch('/api/user/aesthetic', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aesthetic: name }),
      });
    } catch (err) {
      console.error('Failed to persist aesthetic:', err);
    }
  }, []);

  // Public setter: updates state + persists
  const setAesthetic = useCallback((name: ThemeName) => {
    if (!themes[name]) return;
    setAestheticState(name);
    persistAesthetic(name);
  }, [persistAesthetic]);

  useEffect(() => {
    setMounted(true);
    const fetchAesthetic = async () => {
      try {
        const res = await fetch('/api/user/aesthetic');
        const data = await res.json();
        if (data?.aesthetic && themes[data.aesthetic as ThemeName]) {
          setAestheticState(data.aesthetic as ThemeName);
        }
      } catch (err) {
        console.error('Failed to fetch aesthetic:', err);
      }
    };
    fetchAesthetic();
  }, []);

  const muiTheme = useMemo(() => generateMuiTheme(aesthetic), [aesthetic]);

  useEffect(() => {
    applyTheme(aesthetic);
  }, [aesthetic]);

  return (
    <AestheticContext.Provider value={{ aesthetic, setAesthetic }}>
      <div 
        className={mounted ? "min-h-screen bg-bg text-text font-sans antialiased transition-colors duration-500" : "min-h-screen bg-bg text-text font-sans antialiased"}
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        {mounted ? (
          <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        ) : (
          children
        )}
      </div>
    </AestheticContext.Provider>
  );
}
