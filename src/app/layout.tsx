import '../globals.css';

import type { Metadata } from 'next';
import { Geist, Lobster, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren, Suspense } from 'react';

import { DialogProvider } from '@/contexts';
import { Body, Header, Scripting } from '@/layout';

export const metadata: Metadata = {
  title: {
    template: `%s ⌁ Basalt`,
    default: 'Portfolio ⌁ Basalt',
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

const sans = Geist({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist',
});

const mono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
});

const serif = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      className={`${sans.variable} ${mono.variable} ${serif.variable} h-full`}
      lang="en-US"
      suppressHydrationWarning
    >
      <Suspense fallback={null}>
        <DialogProvider>
          <Body>
            <Scripting />
            <ThemeProvider>
              <Header />
              {children}
            </ThemeProvider>
          </Body>
        </DialogProvider>
      </Suspense>
    </html>
  );
}
