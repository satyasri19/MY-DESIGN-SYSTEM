/**
 * Theme setup using CSS variables for light and dark modes
 * Provides utility to apply themes and CSS variable definitions
 */

export const lightThemeVariables = {
  '--color-primary': '#1D4ED8',
  '--color-secondary': '#9333EA',
  '--color-tertiary': '#F59E0B',
  '--color-neutral-light': '#F3F4F6',
  '--color-neutral-dark': '#374151',
  '--color-success': '#22C55E',
  '--color-info': '#3B82F6',
  '--color-warning': '#FBBF24',
  '--color-error': '#EF4444',
  '--color-background': '#FFFFFF',
  '--color-surface': '#F9FAFB',
  '--color-border': '#E5E7EB',
};

export const darkThemeVariables = {
  '--color-primary': '#3B82F6',
  '--color-secondary': '#A78BFA',
  '--color-tertiary': '#FBBF24',
  '--color-neutral-light': '#1F2937',
  '--color-neutral-dark': '#D1D5DB',
  '--color-success': '#22C55E',
  '--color-info': '#60A5FA',
  '--color-warning': '#FBBF24',
  '--color-error': '#F87171',
  '--color-background': '#111827',
  '--color-surface': '#1F2937',
  '--color-border': '#374151',
};

/**
 * Apply theme variables to document root
 */
export function applyTheme(theme: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
