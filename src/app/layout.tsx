import '../globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren, Suspense } from 'react';

import DialogProvider from '@/contexts/dialog';
import TimezoneProvider from '@/contexts/timezone';
import { get as preferences } from '@/getters/preferences';
import { LayoutBody, LayoutHeader } from '@/layout';

export const metadata: Metadata = {
  title: {
    template: `%s ⌁ Project Basalt`,
    default: 'Dashboard ⌁ Project Basalt',
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const { zone } = await preferences();

  return (
    <html
      className="h-full"
      lang="en-US"
      suppressHydrationWarning
    >
      <Suspense fallback={null}>
        <TimezoneProvider zone={zone}>
          <DialogProvider>
            <LayoutBody>
              <noscript>
                <div
                  aria-live="polite"
                  className="fixed inset-0 bg-(--background) z-1000 flex items-center justify-center"
                >
                  <p className="w-full max-w-sm text-sm">
                    <span className="font-black uppercase text-xs">Warning:</span> JavaScript is disabled in your browser. This site will not work properly. Please enable JavaScript and then refresh this page. Thank you.
                  </p>
                </div>
              </noscript>
              <ThemeProvider>
                <LayoutHeader />
                {children}
              </ThemeProvider>
            </LayoutBody>
          </DialogProvider>
        </TimezoneProvider>
      </Suspense>
    </html>
  );
}
