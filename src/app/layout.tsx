import '../globals.css';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren, Suspense } from 'react';

import DialogProvider from '@/contexts/dialog';
import { LayoutBody, LayoutHeader } from '@/layout';

export const metadata: Metadata = {
  title: {
    template: `%s ⌁ Money`,
    default: 'Calendar ⌁ Money',
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
            <ThemeProvider>
              <LayoutHeader />
              <main>
                {children}
              </main>
            </ThemeProvider>
          </LayoutBody>
        </DialogProvider>
      </Suspense>
    </html>
  );
}
