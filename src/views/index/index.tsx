'use client';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Day, Holding } from '@/types'
import Ui from '@/ui';

import Amounts from './amounts';
import Balance from './balance';
import Budgets from './budgets';
import Calendar from './calendar';
import Holding from './holding';
import Placeholder from './placeholder';

type Props = {
  data: {
    calendar: {
      all: Day[][];
      current: Day[];
    };
    current: {
      date: string;
      key: string;
    };
    holding: Holding;
    holdings: Holding[];
    metrics: {
      netWorth: number;
    };
    saved: string;
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <main className={styles.container}>
        <Holding
          calendar={data.calendar.current}
          holding={data.holding}
        />
        <Calendar
          calendar={data.calendar.current}
          date={data.current.date}
        />
        <Amounts
          calendar={data.calendar.current}
        />
        <Placeholder />
        <Balance
          calendar={data.calendar.current}
          date={data.current.date}
        />
        <Budgets
          calendar={data.calendar.current}
          date={data.current.date}
        />
      </main>
      <Dialogs.Menu netWorth={data.metrics.netWorth} />
      <Dialogs.Holding />
      <Dialogs.Holdings holdings={data.holdings} />
      <Dialogs.Year date={data.current.date} years={data.calendar.all} />
      {/*<Dialogs.Budget
        holding={data.holding}
      />*/}
    </>
  );
};

const styles = tw({
  container: `
    relative
    grid grid-cols-24 grid-rows-12
    h-[calc(100svh-6rem)]
    mt-24
    pb-10

    before:absolute
    before:top-0
    before:bottom-10
    before:left-1/3
    before:w-px
    before:bg-(--foreground)/12.5

    after:absolute
    after:top-0
    after:bottom-10
    after:right-1/3
    after:w-px
    after:bg-(--foreground)/12.5
  `,
});
