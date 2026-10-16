'use client';

import { useState } from 'react';

import { Dialogs } from '@/dialogs';
import { useForecast } from '@/hooks';
import { Main } from '@/layout';
import type { Dateable, Holding } from '@/types'

import Analytics from './analytics';
import Budgets from './budgets';
import Header from './header';
import Month from './month';
import Options from './options';
import Week from './week';

type Props = {
  data: {
    holding?: Holding;
    holdings: Holding[];
  };
};

export default function View({ data }: Props) {
  const [view, setView] = useState('week');

  const { calendar, date, onDate } = useForecast();

  const handleOnWeek = () => {
    setView('week');
  };

  const handleOnMonth = () => {
    setView('month');
  };

  const handleOnAnalytics = () => {
    setView('analytics');
  };

  const handleOnCalendar = (dateable: Dateable, display: string) => {
    setView(display);

    onDate(dateable);
  };

  const handleOnToday = (dateable: Dateable) => {
    onDate(dateable);
  };

  if (!calendar || !data.holding) {
    return null;
  }

  return (
    <>
      <Main>
        <Header
          date={date}
          holding={data.holding}
        />
        <Options
          date={date}
          onAnalytics={handleOnAnalytics}
          onMonth={handleOnMonth}
          onToday={handleOnToday}
          onWeek={handleOnWeek}
          view={view}
        />
        {view === 'analytics' && (
          <Analytics
            date={date}
            days={calendar}
            onClick={handleOnCalendar}
          />
        )}
        {view === 'month' && (
          <Month
            date={date}
            days={calendar}
            onClick={handleOnCalendar}
          />
        )}
        {view === 'week' && (
          <>
            <Week
              date={date}
              days={calendar}
              onClick={handleOnCalendar}
            />
            <Budgets
              days={calendar}
              date={date}
              holding={data.holding}
            />
          </>
        )}
      </Main>
      <Dialogs.Holding />
      <Dialogs.Budget holdings={data.holdings} parent={data.holding.id} />
      <Dialogs.Transaction />
      <Dialogs.Return />
      <Dialogs.Empty />
    </>
  );
};
