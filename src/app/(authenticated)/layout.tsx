import { ReactNode } from 'react';

import { DrawerProvider, StaleProvider, ToastProvider } from '@/contexts';
import {
  Balances,
  Budget,
  Holding,
  Menu,
  Options,
  Stale,
  Transactions,
} from '@/drawers';
import { get } from '@/getters/root';
import { Main, Toasts } from '@/layout';
import StoreProvider from '@/store';

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await get();

  return (
    <DrawerProvider>
      <ToastProvider>
        <StoreProvider data={data}>
          <StaleProvider updated={data.updated} zone={data.zone}>
            <Main>
              {children}
            </Main>
            <Menu />
            <Options />
            <Budget />
            <Holding />
            <Transactions />
            <Toasts />
            <Stale />
            <Balances />
          </StaleProvider>
        </StoreProvider>
      </ToastProvider>
    </DrawerProvider>
  );
}
