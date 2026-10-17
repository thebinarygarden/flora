'use client';

import { useState } from 'react';
import { LocaleToggleButton } from '@binarygarden/flora/navigation';

const LOCALES = [
  { value: 'en', label: 'english' },
  { value: 'es', label: 'español' },
];

export function LocaleDemo() {
  const [locale, setLocale] = useState('en');
  return (
    <LocaleToggleButton locales={LOCALES} value={locale} onChange={setLocale} />
  );
}
