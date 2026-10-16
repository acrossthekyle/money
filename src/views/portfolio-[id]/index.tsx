'use client';

import { Dialogs } from '@/dialogs';
import { Main } from '@/layout';
import type { Holding } from '@/types'

import Analytics from './analytics';
import Budgets from './budgets';
import Header from './header';
import Month from './month';
import Options from './options';
import Week from './week';

import { useModel } from './model';

type Props = {
  data: {
    holding?: Holding;
    holdings: Holding[];
  };
};

export default function View({ data }: Props) {
  const {
    date,
    days,
    handleOnAnalytics,
    handleOnCalendar,
    handleOnMonth,
    handleOnToday,
    handleOnWeek,
    view,
  } = useModel();

  if (!data.holding || !date || !days) {
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
            days={days}
            onClick={handleOnCalendar}
          />
        )}
        {view === 'month' && (
          <Month
            date={date}
            days={days}
            onClick={handleOnCalendar}
          />
        )}
        {view === 'week' && (
          <>
            <Budgets
              date={date}
              days={days}
              holding={data.holding}
            />
            <Week
              date={date}
              days={days}
              onClick={handleOnCalendar}
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
