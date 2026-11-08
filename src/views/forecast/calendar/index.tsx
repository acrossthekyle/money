import type { CalendarDay, Dateable } from '@/types';

import Days from './days';
import Navigation from './navigation';

type Props = {
  date: Dateable;
  days: CalendarDay[];
};

export default function Calendar({ date, days }: Props) {
  return (
    <section aria-label="calendar">
      <Navigation date={date} />
      <Days date={date} days={days} />
    </section>
  );
};
