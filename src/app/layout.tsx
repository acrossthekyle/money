import '../globals.css';

import type { Metadata } from 'next';
import { Geist, Roboto_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren, Suspense } from 'react';

import { metrics } from '@/algorithms/metrics';
import { DialogProvider, LoadingProvider, TimezoneProvider } from '@/contexts';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import {
  LayoutBody,
  LayoutHeader,
  LayoutLoading,
  LayoutMain,
  LayoutScripting,
} from '@/layout';

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

export default async function RootLayout({ children }: PropsWithChildren) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const { netWorth } = await metrics(holdings);

  return (
    <html
      className={`${sans.variable} ${mono.variable} h-full`}
      lang="en-US"
      suppressHydrationWarning
    >
      <Suspense fallback={null}>
        <TimezoneProvider zone={zone}>
          <LoadingProvider>
            <DialogProvider>
              <LayoutBody>
                <LayoutScripting />
                <ThemeProvider>
                  <LayoutHeader />
                  <LayoutMain data={{ netWorth }}>
                    {children}
                  </LayoutMain>
                  <LayoutLoading />
                </ThemeProvider>
              </LayoutBody>
            </DialogProvider>
          </LoadingProvider>
        </TimezoneProvider>
      </Suspense>
    </html>
  );
}
