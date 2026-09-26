import type { CalendarMonth, Dateable, Holding } from '@/types'

import Amounts from './amounts';
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
  console.log('data: ', data);
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
      <Amounts calendar={data.calendar} />
      <Budgets
        calendar={data.calendar}
        date={data.date}
        holding={data.holding}
      />
    </>
  );
};
