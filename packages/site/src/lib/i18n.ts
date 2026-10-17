import { cookies, headers } from 'next/headers';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';

// The convention every garden app follows is in docs/I18N.md.

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export type Dict = typeof en;

// Typed against English, so a key missing from es.json fails the build.
const dictionaries: Record<Locale, Dict> = { en, es };

export const LOCALE_COOKIE = 'locale';

export const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);

/** The reader's locale and dictionary: the cookie, else the browser's language. */
export async function getI18n() {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved)
    ? saved
    : ((await headers())
        .get('accept-language')
        ?.split(',')
        .map((part) => part.trim().slice(0, 2).toLowerCase())
        .find(isLocale) ?? 'en');
  return { locale, t: dictionaries[locale] };
}
