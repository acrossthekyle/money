import '../globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren, Suspense } from 'react';

import DialogProvider from '@/contexts/dialog';
import { LayoutBody, LayoutHeader } from '@/layout';

export const metadata: Metadata = {
  title: {
    template: `%s`,
    default: 'Dashboard',
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className="h-full"
      lang="en-US"
      suppressHydrationWarning
    >
      <Suspense fallback={null}>
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
      </Suspense>
    </html>
  );
}
