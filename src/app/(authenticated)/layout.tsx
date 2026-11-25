import { DrawerProvider, SyncProvider, ToastProvider } from '@/contexts';
import { db } from '@/db';
import {
  Budget,
  Holding,
  Link,
  Menu,
  Options,
  Policies,
  Sync,
  Transactions,
} from '@/drawers';
import { Main, Toasts } from '@/layout';
import StoreProvider from '@/store';

export default async function Layout({ children }: React.PropsWithChildren) {
  const { budgets } = await db.tables.budgets();
  const { holdings } = await db.tables.holdings();
  const { pinned, synced, token, zone } = await db.tables.settings();

  const isDemo = process.env.APP_ENVIRONMENT === 'demo';

  return (
    <DrawerProvider>
      <ToastProvider>
        <StoreProvider
          data={{
            budgets,
            holdings,
            pinned,
            zone,
          }}
        >
          <SyncProvider isDemo={isDemo} synced={synced} zone={zone}>
            <Main>
              {children}
            </Main>
            <Menu />
            <Options isDemo={isDemo} />
            <Budget />
            <Holding />
            <Transactions />
            <Toasts />
            {!isDemo && (
              <Sync canSync={!!token} />
            )}
            <Link />
            <Policies />
          </SyncProvider>
        </StoreProvider>
      </ToastProvider>
    </DrawerProvider>
  );
}
