'use client';

import { useState } from 'react';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Budget, Day, Holding } from '@/types'
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
  const [budget, setBudget] = useState<Budget | undefined>();
  const [holding, setHolding] = useState<Holding | undefined>();

  return (
    <>
      <main className={styles.container}>
        <Holding
          calendar={data.calendar.current}
          holding={data.holding}
          onEdit={setHolding}
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
          holding={data.holding}
          onAdd={setBudget}
          onEdit={setBudget}
        />
      </main>
      <Dialogs.Menu onAdd={setHolding} netWorth={data.metrics.netWorth} />
      <Dialogs.Holding holding={holding} />
      <Dialogs.Holdings holdings={data.holdings} />
      <Dialogs.Year date={data.current.date} years={data.calendar.all} />
      <Dialogs.Budget
        budget={budget}
        date={data.current.date}
        holdings={data.holdings}
        parent={data.holding.id}
      />
      <Dialogs.Budgets
        calendar={data.calendar.current}
        date={data.current.date}
        holding={data.holding}
        onAdd={setBudget}
        onEdit={setBudget}
      />
    </>
  );
};

const styles = tw({
  container: `
    relative
    grid grid-cols-24 grid-rows-12
    h-[calc(100svh-4rem)]
    mt-14
    pb-0

    md:mt-24
    md:pb-10
    md:h-[calc(100svh-6rem)]

    landscape-constrained:h-auto

    lg:before:absolute
    lg:before:top-0
    lg:before:bottom-10
    lg:before:left-1/3
    lg:before:w-px
    lg:before:bg-(--foreground)/12.5

    after:hidden
    after:absolute
    after:top-0
    after:bottom-10
    after:right-1/2
    after:w-px
    after:bg-(--foreground)/12.5

    md:after:block
    lg:after:right-1/3
  `,
});
