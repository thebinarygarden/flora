'use client';

import { IconDay, IconNight } from '@flora/ui/dist/icons';
import { useTheme } from '@flora/ui/dist/theme';

export function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ml-auto p-2 rounded-lg transition-colors"
      style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
    >
      {isDark ? <IconDay size={20} /> : <IconNight size={20} />}
    </button>
  );
}