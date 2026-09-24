'use client';

import { useState } from 'react';

import { Dialogs } from '@/dialogs';
import tw from '@/styles';
import type { Budget, CalendarMonth, CalendarYear, Holding } from '@/types'

import Amounts from './amounts';
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
          date={data.date}
          holding={data.holding}
          onEdit={handleOnSetHolding}
        />
        <Calendar
          calendar={data.calendar.month}
          date={data.date}
          holding={data.holding}
          onEdit={handleOnSetBudget}
        />
        <Amounts calendar={data.calendar.month} />
        <Budgets
          calendar={data.calendar.month}
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
    flex flex-col gap-4
    w-full max-w-sm
    mx-auto
    px-6 pb-8

    lg:pb-6
  `,
  divider: `
    h-px w-4
    my-4
    bg-(--foreground)/75
  `,
});
