'use client';

import { useState } from 'react';

import { Dialogs } from '@/dialogs';
import { useBudget, useCalendar } from '@/hooks';
import { Main } from '@/layout';
import type { Budget, Holding } from '@/types'

import Budgets from './budgets';
import Calendar from './calendar';
import Overview from './overview';

type Props = {
  data: {
    holding?: Holding;
    holdings: Holding[];
  };
};

export default function View({ data }: Props) {
  const [budget, setBudget] = useState<Budget | undefined>();
  const [view, setView] = useState('upcoming');

  const { onBudget } = useBudget();
  const { calendar, date, onDate } = useCalendar();

  const handleOnBudget = (item: Budget, dateable: Dateable) => {
    setBudget(item);

    onDate(dateable);

    onBudget();
  };

  const handleOnCalendar = (dateable: Dateable, value: string) => {
    setView(value);

    onDate(dateable);
  };

  if (!calendar || !data.holding) {
    return null;
  }

  return (
    <>
      <Main>
        <Overview
          date={date}
          holding={data.holding}
          onAdd={() => setBudget(undefined)}
          onCalendar={() => setView('calendar')}
          onToday={onDate}
          onUpcoming={() => setView('upcoming')}
          view={view}
        />
        <Calendar
          date={date}
          days={calendar}
          holding={data.holding}
          onClick={handleOnCalendar}
          view={view}
        />
        <Budgets
          days={calendar}
          date={date}
          holding={data.holding}
          onClick={handleOnBudget}
          view={view}
        />
      </Main>
      <Dialogs.Holding date={date} holding={data.holding} />
      <Dialogs.Budget
        budget={budget}
        date={date}
        holdings={data.holdings}
        parent={data.holding.id}
      />
    </>
  );
};
