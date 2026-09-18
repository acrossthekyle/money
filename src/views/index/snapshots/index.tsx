import { format } from 'date-fns';

import tw from '@/styles';
import type { Metric } from '@/types';

import Accounts from './accounts';
import Assets from './assets';
import Checking from './checking';
import Credit from './credit';
import NetWorth from './net';
import Property from './property';
import Retirement from './retirement';
import Savings from './savings';

type Props = {
  metrics: Metric[];
  today: Date;
};

export default function Snapshots({ metrics, today }: Props) {
  if (metrics.length === 0) {
    return null;
  }

  const date = format(today, 'MM/dd/yyyy');

  return (
    <section aria-label="data overviews/snapshots" className={styles.container}>
      <ul className={styles.items}>
        <NetWorth date={date} metrics={metrics} />
        <Accounts date={date} metrics={metrics} />
        <Assets date={date} metrics={metrics} />
        <Savings date={date} metrics={metrics} />
        <Checking date={date} metrics={metrics} />
        <Credit date={date} metrics={metrics} />
        <Retirement date={date} metrics={metrics} />
        <Property date={date} metrics={metrics} />
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    relative
    order-0
    border-b border-current/7.5 dark:border-current/12.5

    before:absolute
    before:left-0
    before:top-0
    before:bottom-0
    before:z-10
    before:w-4
    before:bg-linear-to-r
    before:from-(--background)
    before:to-transparent

    after:absolute
    after:right-0
    after:top-0
    after:bottom-0
    after:z-10
    after:w-4
    after:bg-linear-to-l
    after:from-(--background)
    after:to-transparent

    md:block
    md:col-span-24
  `,
  items: `
    flex gap-4
    overflow-x-auto
    px-4 pb-4

    lg:grid
    lg:grid-cols-4
  `,
});
