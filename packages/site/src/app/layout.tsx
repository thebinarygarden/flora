import type { Metadata } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { ScriptPreloadTheme } from '@binarygarden/flora/theme';
import { DialogProvider } from '@binarygarden/flora/overlay';
import { BGFooter } from '@binarygarden/flora/bg';
import { IconBGLogo } from '@binarygarden/flora/icons';
import { SiteNav } from '@/app/_components/SiteNav';
import { LocaleToggle } from '@/app/_components/LocaleToggle';
import { getI18n } from '@/lib/i18n';

// Self-hosted by next/font, so there is no render-blocking request to Google
// and no flash of the fallback stack. flora only names the family.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    title: 'flora',
    description: t.description,
    icons: { icon: '/favicon.ico' },
  };
}

const FOOTER_LINKS = [
  { label: 'npm', href: 'https://www.npmjs.com/package/@binarygarden/flora' },
  { label: 'github', href: 'https://github.com/thebinarygarden/flora' },
  { label: 'trunk', href: 'https://binarygarden.com' },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale, t } = await getI18n();
  return (
    <html lang={locale} className={hanken.variable} suppressHydrationWarning>
      <head>
        <ScriptPreloadTheme />
      </head>
      <body>
        <DialogProvider labels={t.flora.dialog}>
          <SiteNav
            t={{ nav: t.nav, flora: t.flora }}
            localeToggle={<LocaleToggle />}
          />
          <main>{children}</main>
          <BGFooter
            brand={<IconBGLogo size={28} />}
            links={FOOTER_LINKS}
            legal={t.nav.legal}
          />
        </DialogProvider>
      </body>
    </html>
  );
}
