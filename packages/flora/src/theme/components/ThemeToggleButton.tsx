'use client';

import { IconDay, IconNight } from '../../icons';
import { useTheme } from '../ThemeContext';

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