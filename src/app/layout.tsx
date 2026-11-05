import '../globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Lobster, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ReactNode, Suspense } from 'react';

import { get } from '@/getters/root';
import { Body, Scripting, Wrapper } from '@/layout';
import Store from '@/store';

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

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await get();

  return (
    <Wrapper
      className={`${sans.variable} ${mono.variable} ${serif.variable} h-full`}
    >
      <Body>
        <Scripting />
        <ThemeProvider>
          <Suspense fallback={null}>
            <Store data={data}>
              {children}
            </Store>
          </Suspense>
        </ThemeProvider>
      </Body>
    </Wrapper>
  );
}
