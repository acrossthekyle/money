import { SyncProvider, ToastProvider } from '@/contexts';
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
    <ToastProvider>
      <StoreProvider
        data={{
          budgets,
          holdings,
          pinned,
          zone,
        }}
      >
        <SyncProvider synced={synced} zone={zone}>
          <Main>
            {children}
          </Main>
          <Menu />
          <Options />
          <Budget />
          <Holding />
          <Transactions />
          <Toasts />
          <Sync canSync={!!token} />
          <Link />
          <Policies />
        </SyncProvider>
      </StoreProvider>
    </ToastProvider>
  );
}
