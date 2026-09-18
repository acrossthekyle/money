'use client';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Day, Holding } from '@/types'
import Ui from '@/ui';

import Amounts from './amounts';
import Balance from './balance';
import Budgets from './budgets';
import Calendar from './calendar';
import Holdings from './holdings';
import Placeholder from './placeholder';

type Props = {
  data: {
    calendar: Day[];
    current: {
      calendar: string;
      date: string;
    };
    holdings: Holding[];
    metrics: {
      netWorth: number;
    };
    saved: string;
  };
};

export default function View({ data }: Props) {
  const calendar = data.calendar
    .find(year => year.months.find(month => month.id === data.current.calendar))
    .months
    .find(month => month.id === data.current.calendar);

  return (
    <>
      <main className={styles.container}>
        <Holdings calendar={calendar} holdings={data.holdings} saved={data.saved} />
        <Calendar calendar={calendar} date={data.current.date} />
        <Amounts />
        <Placeholder date={data.current.date} />
        <Balance calendar={calendar} date={data.current.date} />
        <Budgets />
      </main>
      <Dialogs.Menu netWorth={data.metrics.netWorth} />
      <Dialogs.Holding />
      <Dialogs.Holdings holdings={data.holdings} />
    </>
  );
};

const styles = tw({
  container: `
    grid grid-cols-24 grid-rows-12 gap-10
    h-[calc(100svh-6rem)]
    mt-24
    px-10 pb-10
  `,
});
