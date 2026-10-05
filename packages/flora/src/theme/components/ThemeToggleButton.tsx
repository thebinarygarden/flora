'use client';

import * as React from 'react';
import { IconDay } from '../../icons/IconDay';
import { IconNight } from '../../icons/IconNight';
import { IconSystem } from '../../icons/IconSystem';
import { THEME_STORAGE_KEY } from '../utils/ScriptPreloadTheme';

export interface ThemeToggleButtonProps {
  size?: 'sm' | 'md' | 'lg';
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
export function ThemeToggleButton({ size = 'md' }: ThemeToggleButtonProps) {
  // Starts at system on both server and first client render; the effect below
  // reconciles with whatever was stored.
  const [mode, setMode] = React.useState<Mode>('system');
  const [open, setOpen] = React.useState(false);
  // hidden until the stored mode is in, so a reload never shows system first
  // or animates from it
  const [ready, setReady] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const pick = (next: Mode) => {
    apply(next);
    try {
      if (next === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // private mode / blocked storage: the choice still holds for this visit
    }
    setMode(next);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="fl-theme"
      data-size={size}
      data-open={open}
      data-ready={ready}
      role={open ? 'radiogroup' : undefined}
      aria-label={open ? 'theme' : undefined}
    >
      {MODES.map((m) => {
        const current = m.mode === mode;
        const hidden = !open && !current;
        return (
          <button
            key={m.mode}
            type="button"
            className="fl-theme-opt"
            role={open ? 'radio' : undefined}
            aria-checked={open ? current : undefined}
            aria-expanded={open ? undefined : false}
            aria-label={open ? m.mode : `theme: ${m.mode}`}
            title={open ? m.mode : `theme: ${m.mode}`}
            aria-hidden={hidden || undefined}
            tabIndex={hidden ? -1 : undefined}
            data-current={current}
            onClick={() => (open ? pick(m.mode) : setOpen(true))}
          >
            {m.icon}
          </button>
        );
      })}
    </div>
  );
}
