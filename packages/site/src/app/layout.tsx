import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider, ScriptPreloadTheme } from '@binarygarden/flora/theme';
import { DialogProvider } from '@binarygarden/flora/overlay';
import { lightTheme, darkTheme } from '@/app/themes';
import { AppNavigation } from '@/app/_components/AppNavigation';

export const metadata: Metadata = {
  title: 'Flora',
  description: 'the plants of a particular region',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <title>Flora</title>
        <ScriptPreloadTheme lightTheme={lightTheme} darkTheme={darkTheme} />
      </head>
      <body>
        <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
          <DialogProvider>
            <AppNavigation>{children}</AppNavigation>
          </DialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
