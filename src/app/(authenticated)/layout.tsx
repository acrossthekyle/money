import { ReactNode } from 'react';

import { DrawerProvider, ToastProvider } from '@/contexts';
import { Budget, Holding, Menu, Transactions } from '@/drawers';
import { get } from '@/getters/root';
import { Header, Main, Toasts } from '@/layout';
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
          <Menu />
          <Header isAuthenticated={true} />
          <Main>
            {children}
          </Main>
          <Budget />
          <Holding />
          <Transactions />
          <Toasts />
        </StoreProvider>
      </ToastProvider>
    </DrawerProvider>
  );
}
