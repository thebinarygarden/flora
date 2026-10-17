'use client';

import * as React from 'react';
import { ExpandingPicker } from './ExpandingPicker';

export interface LocaleToggleButtonProps {
  /** e.g. `[{ value: 'en', label: 'english' }, { value: 'es', label: 'español' }]` */
  locales: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  /** names the control for screen readers */
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Language picker that moves like ThemeToggleButton: collapsed it shows the
 * current code, one click opens every language, a second picks one and
 * collapses it again. Controlled; the app stores the choice (a cookie, or
 * localStorage) and re-renders with the new `value`.
 *
 * ```tsx
 * <LocaleToggleButton
 *   locales={[{ value: 'en', label: 'english' }, { value: 'es', label: 'español' }]}
 *   value={locale}
 *   onChange={setLocale}
 * />
 * ```
 */
export function LocaleToggleButton({
  locales,
  value,
  onChange,
  label = 'language',
  size = 'md',
}: LocaleToggleButtonProps) {
  return (
    <ExpandingPicker
      options={locales.map((l) => ({ ...l, content: l.value }))}
      value={value}
      onPick={onChange}
      label={label}
      size={size}
    />
  );
}
