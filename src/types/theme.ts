export interface ThemeColors {
  background: string
  foreground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  success: string
  successForeground: string
  brand: string
  brandForeground: string
}

export interface Theme {
  light: ThemeColors
  dark: ThemeColors
}
