'use client';

import * as React from 'react';
import { IconDay } from '../../icons/IconDay';
import { IconNight } from '../../icons/IconNight';
import { IconSystem } from '../../icons/IconSystem';
import { ExpandingPicker } from '../../navigation/ExpandingPicker';
import { THEME_STORAGE_KEY } from '../utils/ScriptPreloadTheme';

const themeLabels = {
  theme: 'theme',
  light: 'light',
  dark: 'dark',
  system: 'system',
};

export type ThemeToggleButtonLabels = typeof themeLabels;

export interface ThemeToggleButtonProps {
  size?: 'sm' | 'md' | 'lg';
  labels?: Partial<ThemeToggleButtonLabels>;
}

type Mode = 'light' | 'dark' | 'system';

const MODES: { mode: Mode; icon: React.ReactNode }[] = [
  { mode: 'light', icon: <IconDay size={18} /> },
  { mode: 'dark', icon: <IconNight size={18} /> },
  { mode: 'system', icon: <IconSystem size={18} /> },
];

const DARK_QUERY = '(prefers-color-scheme: dark)';

function apply(mode: Mode) {
  const theme =
    mode === 'system'
      ? window.matchMedia(DARK_QUERY).matches
        ? 'dark'
        : 'light'
      : mode;
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Light, dark, or follow the system. Collapsed it shows only the current
 * mode; one click opens all three, a second picks one and collapses it again.
 * `system` clears the stored choice, so {@link ScriptPreloadTheme} falls back
 * to the OS preference on reload — pair the two to avoid a flash.
 */
export function ThemeToggleButton({
  size = 'md',
  labels,
}: ThemeToggleButtonProps) {
  const l = { ...themeLabels, ...labels };
  // Starts at system on both server and first client render; the effect below
  // reconciles with whatever was stored.
  const [mode, setMode] = React.useState<Mode>('system');
  // hidden until the stored mode is in, so a reload never shows system first
  // or animates from it
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') setMode(stored);
    } catch {
      // blocked storage: stay on system
    }
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // under system, follow the OS live
  React.useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia(DARK_QUERY);
    const follow = () => apply('system');
    mq.addEventListener('change', follow);
    return () => mq.removeEventListener('change', follow);
  }, [mode]);

  const pick = (next: Mode) => {
    apply(next);
    try {
      if (next === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // private mode / blocked storage: the choice still holds for this visit
    }
    setMode(next);
  };

  return (
    <ExpandingPicker
      options={MODES.map((m) => ({
        value: m.mode,
        label: l[m.mode],
        content: m.icon,
      }))}
      value={mode}
      onPick={(v) => pick(v as Mode)}
      label={l.theme}
      size={size}
      ready={ready}
    />
  );
}
