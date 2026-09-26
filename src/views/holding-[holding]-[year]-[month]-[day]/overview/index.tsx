import type { CalendarMonth, Dateable, Holding } from '@/types'
import Ui from '@/ui';

import Balance from './balance';
import Name from './name';

type Props = {
  calendar: CalendarMonth;
  date: Dateable;
  holding: Holding;
};

export default function Overview({ calendar, date, holding }: Props) {
  const filtered = calendar.days.filter(day => day.isInMonth);

  const isTrendingUp = filtered[0].balance < filtered[filtered.length - 1].balance;

  const balance = calendar
    .days
    .filter(day => day.iso === date.iso)
    .reduce((accumulator, day) => {
      return accumulator + day.balance;
    }, 0);

  return (
    <>
      <Ui.Components.Divider />
      <Name date={date} holding={holding} />
      <Balance date={date} isTrendingUp={isTrendingUp} value={balance} />
    </>
  );
};
