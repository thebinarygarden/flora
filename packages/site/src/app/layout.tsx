import type { Metadata } from 'next';
import { Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { ScriptPreloadTheme } from '@binarygarden/flora/theme';
import { DialogProvider } from '@binarygarden/flora/overlay';
import { BGFooter } from '@binarygarden/flora/bg';
import { IconBGLogo } from '@binarygarden/flora/icons';
import { SiteNav } from '@/app/_components/SiteNav';

// Self-hosted by next/font, so there is no render-blocking request to Google
// and no flash of the fallback stack. flora only names the family.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'flora',
  description: 'react components for the binary garden',
  icons: { icon: '/favicon.ico' },
};

const FOOTER_LINKS = [
  { label: 'npm', href: 'https://www.npmjs.com/package/@binarygarden/flora' },
  { label: 'github', href: 'https://github.com/thebinarygarden/flora' },
  { label: 'trunk', href: 'https://binarygarden.com' },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={hanken.variable} suppressHydrationWarning>
      <head>
        <ScriptPreloadTheme />
      </head>
      <body>
        <DialogProvider>
          <SiteNav />
          <main>{children}</main>
          <BGFooter
            brand={<IconBGLogo size={28} />}
            links={FOOTER_LINKS}
            legal="© 2026 binary garden · mit"
          />
        </DialogProvider>
      </body>
    </html>
  );
}
