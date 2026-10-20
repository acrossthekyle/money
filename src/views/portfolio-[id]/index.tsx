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
          onMonth={handleOnMonth}
          onToday={handleOnToday}
          onWeek={handleOnWeek}
          view={view}
        />
        {view === 'month' && (
          <Month
            date={date}
            days={days}
            onClick={handleOnCalendar}
          />
        )}
        {view === 'week' && (
          <Week
            date={date}
            days={days}
            onClick={handleOnCalendar}
          />
        )}
        <Budgets
          date={date}
          days={days}
          view={view}
        />
        <Analytics
          date={date}
          days={days}
          view={view}
        />
      </Main>
      <Dialogs.Holding />
      <Dialogs.Budget holdings={data.holdings} parent={data.holding.id} />
      <Dialogs.Transaction holding={data.holding} />
      <Dialogs.Return />
      <Dialogs.Empty />
    </>
  );
};
