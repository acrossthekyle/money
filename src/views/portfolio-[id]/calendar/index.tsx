'use client';

import tw from '@/styles';
import type { CalendarDay, Dateable, Holding } from '@/types';

import Month from './month';
import Week from './week';

type Props = {
  date: Dateable;
  days: CalendarDay[];
  holding: Holding;
  onClick: (dateable: Dateable, view: string) => void;
  view: string;
};

export default function Calendar({
  date,
  days,
  holding,
  onClick,
  view,
}: Props) {
  return (
    <>
      {view === 'calendar' && (
        <Month
          days={days}
          date={date}
          holding={holding}
          onClick={onClick}
        />
      )}
      {view === 'upcoming' && (
        <Week
          days={days}
          date={date}
          holding={holding}
          onClick={onClick}
        />
      )}
    </>
  );
};

const styles = tw({
  //
});
