import type { CalendarMonth, Holding } from '@/types'

import Amounts from './amounts';
import Budgets from './budgets';
import Calendar from './calendar';
import Overview from './overview';

type Props = {
  data: {
    calendar?: CalendarMonth;
    date: string;
    holding?: Holding;
  };
};

export default function View({ data }: Props) {
  if (!data.calendar || !data.holding) {
    return null;
  }

  return (
    <>
      <Overview
        calendar={data.calendar}
        date={data.date}
        holding={data.holding}
      />
      <Calendar
        calendar={data.calendar}
        date={data.date}
        holding={data.holding}
      />
      <Amounts
        calendar={data.calendar}
      />
      <Budgets
        calendar={data.calendar}
        holding={data.holding}
      />
    </>
  );
};
