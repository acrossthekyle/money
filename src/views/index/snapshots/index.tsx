import { format } from 'date-fns';

import tw from '@/styles';
import type { Holding } from '@/types';

import Accounts from './accounts';
import Assets from './assets';
import Checking from './checking';
import Credit from './credit';
import NetWorth from './net';
import Other from './other';
import Retirement from './retirement';
import Savings from './savings';

type Props = {
  items: Holding[];
};

export default function Snapshots({ items }: Props) {
  if (items.length === 0) {
    return null;
  }

  const today = format(new Date(), 'MM/dd/yyyy');

  return (
    <section aria-label="data overviews/snapshots" className={styles.container}>
      <ul className={styles.items}>
        <NetWorth date={today} items={items} />
        <Accounts date={today} items={items} />
        <Savings date={today} items={items} />
        <Checking date={today} items={items} />
        <Credit date={today} items={items} />
        <Assets date={today} items={items} />
        <Retirement date={today} items={items} />
        <Other date={today} items={items} />
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    col-span-10
  `,
  items: `
    grid grid-cols-1 gap-4

    md:grid-cols-2
  `,
});
