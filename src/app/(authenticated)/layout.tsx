import { IS_DEMO } from '@/constants';
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
          <SyncProvider isDemo={IS_DEMO} synced={synced} zone={zone}>
            <Main>
              {children}
            </Main>
            <Menu />
            <Options isDemo={IS_DEMO} />
            <Budget />
            <Holding />
            <Transactions />
            <Toasts />
            {!IS_DEMO && (
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
