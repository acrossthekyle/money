'use client';

import { useState } from 'react';

import { Dialogs } from '@/dialogs';
import { useBudget, useCalendar, useTransaction } from '@/hooks';
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
  const [view, setView] = useState('upcoming');

  const { calendar, date, onDate } = useCalendar();

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
          view={view}
        />
      </Main>
      <Dialogs.Holding date={date} holding={data.holding} />
      <Dialogs.Budget holdings={data.holdings} parent={data.holding.id} />
      <Dialogs.Transaction />
      <Dialogs.Return />
      <Dialogs.Empty />
    </>
  );
};
