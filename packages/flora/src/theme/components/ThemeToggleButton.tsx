'use client';

import { IconDay, IconNight } from '../../icons';
import { useTheme } from '../ThemeContext';

export function ThemeToggleButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ml-auto p-2 rounded-lg transition-colors relative overflow-hidden"
      style={{
        backgroundColor: 'var(--surface-variant)',
        color: 'var(--on-surface-variant)',
      }}
      onMouseEnter={(e) => {
        const overlay = e.currentTarget.querySelector(
          '.hover-overlay'
        ) as HTMLElement;
        if (overlay) overlay.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const overlay = e.currentTarget.querySelector(
          '.hover-overlay'
        ) as HTMLElement;
        if (overlay) overlay.style.opacity = '0';
      }}
    >
      <span
        className="hover-overlay absolute inset-0 transition-opacity pointer-events-none"
        style={{
          backgroundColor: 'var(--hover)',
          opacity: 0,
        }}
      />
      <span className="relative z-10">
        {isDark ? <IconDay size={20} /> : <IconNight size={20} />}
      </span>
    </button>
  );
}
