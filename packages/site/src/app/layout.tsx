import type { Metadata } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { ScriptPreloadTheme } from '@binarygarden/flora/theme';
import { DialogProvider, ToastProvider } from '@binarygarden/flora/overlay';
import { SiteFoot } from '@/components/site-chrome';
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
          <ToastProvider labels={t.flora.toast}>
            {/* each page renders its own SiteNav and <main> */}
            {children}
            <SiteFoot />
          </ToastProvider>
        </DialogProvider>
      </body>
    </html>
  );
}
