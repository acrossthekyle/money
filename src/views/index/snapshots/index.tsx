import { format } from 'date-fns';

import tw from '@/styles';
import type { Metric } from '@/types';

import Accounts from './accounts';
import Assets from './assets';
import Checking from './checking';
import Credit from './credit';
import NetWorth from './net';
import Other from './other';
import Retirement from './retirement';
import Savings from './savings';

type Props = {
  metrics: Metric[];
};

export default function Snapshots({ metrics }: Props) {
  if (metrics.length === 0) {
    return null;
  }

  const today = format(new Date(), 'MM/dd/yyyy');

  return (
    <section aria-label="data overviews/snapshots" className={styles.container}>
      <ul className={styles.items}>
        <NetWorth date={today} metrics={metrics} />
        <Accounts date={today} metrics={metrics} />
        <Savings date={today} metrics={metrics} />
        <Checking date={today} metrics={metrics} />
        <Credit date={today} metrics={metrics} />
        <Assets date={today} metrics={metrics} />
        <Retirement date={today} metrics={metrics} />
        <Other date={today} metrics={metrics} />
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    order-0
    border-b border-current/7.5
    pb-4

    md:block
    md:col-span-24
  `,
  items: `
    grid grid-cols-1 gap-4

    xxs:grid-cols-2
    md:grid-cols-4
  `,
});
