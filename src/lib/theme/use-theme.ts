"use client";

import { useState, useEffect } from "react";
import { themes, ThemeName, applyTheme } from "./themes";

export function useTheme(initialTheme: ThemeName = "soft") {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(initialTheme);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  return {
    theme: currentTheme,
    setTheme: (name: ThemeName) => setCurrentTheme(name),
    themes: Object.keys(themes) as ThemeName[],
  };
}
