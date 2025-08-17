import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@flora/ui/theme";
import { lightTheme, darkTheme } from "@/app/themes";
import { AppNavigation } from "@/components/navigation/AppNavigation";

export const metadata: Metadata = {
  title: "Flora",
  description: "the plants of a particular region",
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
        <ThemeScript lightTheme={lightTheme} darkTheme={darkTheme} />
      </head>
      <body>
        <ThemeProvider lightTheme={lightTheme} darkTheme={darkTheme}>
          <AppNavigation>
            {children}
          </AppNavigation>
        </ThemeProvider>
      </body>
    </html>
  );
}
