'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { applyTheme, resolveTheme, ThemeName, DEFAULT_THEME } from '@/lib/theme/themes';
import { generateMuiTheme } from './theme';

interface AestheticContextType {
  aesthetic: ThemeName;
  setAesthetic: (name: ThemeName) => void;
}

const AestheticContext = createContext<AestheticContextType>({
  aesthetic: DEFAULT_THEME,
  setAesthetic: () => {},
});

export const useAesthetic = () => useContext(AestheticContext);

export default function AestheticProvider({
  children,
  currentAesthetic = DEFAULT_THEME,
}: {
  children: React.ReactNode;
  currentAesthetic?: string;
}) {
  const [aesthetic, setAestheticState] = useState<ThemeName>(() =>
    resolveTheme(currentAesthetic)
  );

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

  const setAesthetic = useCallback(
    (name: ThemeName) => {
      const next = resolveTheme(name);
      setAestheticState(next);
      // Paint immediately; the network round-trip is not on the critical path.
      applyTheme(next);
      persistAesthetic(next);
    },
    [persistAesthetic]
  );

  // The server already stamped data-theme on <html>, so the first paint is
  // correct and nothing is hidden. This only re-syncs on client-side changes
  // and enables the colour transition once hydration is done.
  useEffect(() => {
    applyTheme(aesthetic);
    document.documentElement.setAttribute('data-theme-ready', '');
  }, [aesthetic]);

  const muiTheme = useMemo(() => generateMuiTheme(aesthetic), [aesthetic]);

  return (
    <AestheticContext.Provider value={{ aesthetic, setAesthetic }}>
      <MuiThemeProvider theme={muiTheme}>
        {/* Safe to keep now that MUI's palette and the CSS vars are generated
            from the same palettes.json — they no longer fight over body bg. */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AestheticContext.Provider>
  );
}
