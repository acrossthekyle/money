import type { CalendarMonth, Dateable, Holding } from '@/types'

import Budgets from './budgets';
import Calendar from './calendar';
import Overview from './overview';

type Props = {
  data: {
    calendar?: CalendarMonth;
    date: Dateable;
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
      <Budgets
        calendar={data.calendar}
        date={data.date}
        holding={data.holding}
      />
    </>
  );
};
