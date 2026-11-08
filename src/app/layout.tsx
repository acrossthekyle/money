import '../globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Lobster, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ReactNode, Suspense } from 'react';

import { Body, Scripting, Wrapper } from '@/layout';

export const metadata: Metadata = {
  title: {
    template: `%s ⌁ Basalt`,
    default: 'Basalt',
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Wrapper className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <Body>
        <Scripting />
        <ThemeProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </ThemeProvider>
      </Body>
    </Wrapper>
  );
}
