import { ReactNode } from 'react';

import { DrawerProvider } from '@/contexts';
import { Budget, Holding, Transactions } from '@/drawers';
import { get } from '@/getters/root';
import { Header, Main, Menu } from '@/layout';
import StoreProvider from '@/store';

export default async function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await get();

  return (
    <DrawerProvider>
      <StoreProvider data={data}>
        <Menu />
        <Header isAuthenticated={true} />
        <Main>
          {children}
        </Main>
        <Budget />
        <Holding />
        <Transactions />
      </StoreProvider>
    </DrawerProvider>
  );
}
