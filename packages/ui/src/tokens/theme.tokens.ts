export interface NbThemeConfig {
  primary?: string;
  secondary?: string;
  accent?: string;
  yellow?: string;
  pink?: string;
  mint?: string;
  lavender?: string;
  blue?: string;
  cream?: string;
  danger?: string;
  success?: string;
  warning?: string;
  radius?: string;
  borderWidth?: string;
  shadowOffsetX?: string;
  shadowOffsetY?: string;
  fontSans?: string;
  fontMono?: string;
}

export const NB_THEME_CONFIG_KEY = Symbol('NB_THEME_CONFIG');
