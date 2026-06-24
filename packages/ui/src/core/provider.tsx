'use client';

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import type { NbThemeConfig } from '../tokens/theme.tokens';

const THEME_VAR_MAP: Record<keyof NbThemeConfig, string> = {
  primary: '--nb-primary',
  secondary: '--nb-secondary',
  accent: '--nb-accent',
  yellow: '--nb-yellow',
  pink: '--nb-pink',
  mint: '--nb-mint',
  lavender: '--nb-lavender',
  blue: '--nb-blue',
  cream: '--nb-cream',
  danger: '--nb-danger',
  success: '--nb-success',
  warning: '--nb-warning',
  radius: '--nb-radius',
  borderWidth: '--nb-border-width',
  shadowOffsetX: '--nb-shadow-offset-x',
  shadowOffsetY: '--nb-shadow-offset-y',
  fontSans: '--nb-font-sans',
  fontMono: '--nb-font-mono',
};

function applyThemeVars(config: NbThemeConfig): void {
  const root = document.documentElement;
  for (const [key, cssVar] of Object.entries(THEME_VAR_MAP)) {
    const value = config[key as keyof NbThemeConfig];
    if (value !== undefined) {
      root.style.setProperty(cssVar, value);
    }
  }
}

const ThemeConfigContext = createContext<NbThemeConfig>({});

export interface NeoBrutalismProviderProps {
  theme?: NbThemeConfig;
  children: ReactNode;
}

export function NeoBrutalismProvider({
  theme = {},
  children,
}: NeoBrutalismProviderProps) {
  useEffect(() => {
    applyThemeVars(theme);
  }, [theme]);

  return (
    <ThemeConfigContext.Provider value={theme}>
      {children}
    </ThemeConfigContext.Provider>
  );
}

export function useNeoBrutalismTheme(): NbThemeConfig {
  return useContext(ThemeConfigContext);
}
