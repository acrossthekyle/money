'use client';

import { useState } from 'react';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Budget, CalendarMonth, CalendarYear, Holding } from '@/types'

import Amounts from './amounts';
import Balance from './balance';
import Budgets from './budgets';
import Calendar from './calendar';
import Holdings from './holdings';
import Placeholder from './placeholder';

type Props = {
  data: {
    calendar: {
      years: CalendarYear[];
      month?: CalendarMonth;
    };
    date: string;
    holding?: Holding;
    holdings: Holding[];
    metrics: {
      netWorth: number;
    };
  };
};

export default function View({ data }: Props) {
  const [budget, setBudget] = useState<Budget | undefined>();
  const [holding, setHolding] = useState<Holding | undefined>();

  const handleOnSetBudget = (value?: Budget) => {
    setBudget(value);
  };

  const handleOnSetHolding = (value?: Holding) => {
    setHolding(value);
  };

  if (!data.calendar.month || !data.holding) {
    return null;
  }

  return (
    <>
      <main className={styles.container}>
        <Holdings
          calendar={data.calendar.month}
          holding={data.holding}
          onEdit={handleOnSetHolding}
        />
        <Calendar
          calendar={data.calendar.month}
          date={data.date}
          holding={data.holding}
          onAdd={handleOnSetBudget}
          onEdit={handleOnSetBudget}
        />
        <Amounts
          calendar={data.calendar.month}
        />
        <Placeholder />
        <Balance
          calendar={data.calendar.month}
          date={data.date}
          holding={data.holding}
        />
        <Budgets
          calendar={data.calendar.month}
          date={data.date}
          holding={data.holding}
          onAdd={handleOnSetBudget}
          onEdit={handleOnSetBudget}
        />
      </main>
      <Dialogs.Menu
        onAdd={handleOnSetHolding}
        netWorth={data.metrics.netWorth}
      />
      <Dialogs.Holding holding={holding} />
      <Dialogs.Holdings holding={data.holding} holdings={data.holdings} />
      <Dialogs.Year date={data.date} years={data.calendar.years} />
      <Dialogs.Budget
        budget={budget}
        date={data.date}
        holdings={data.holdings}
        parent={data.holding.id}
      />
    </>
  );
};

const styles = tw({
  container: `
    relative
    grid grid-cols-24
    h-auto
    mt-14
    pb-0

    md:grid-rows-12
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
    lg:dark:before:bg-(--foreground)/22.5

    after:hidden
    after:absolute
    after:top-0
    after:bottom-10
    after:right-1/2
    after:w-px
    after:bg-(--foreground)/12.5
    dark:after:bg-(--foreground)/22.5

    md:after:block
    lg:after:right-1/3
  `,
});
