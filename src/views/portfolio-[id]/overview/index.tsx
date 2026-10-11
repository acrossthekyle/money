'use client';

import type { Dateable, Holding } from '@/types'

import Header from './header';
import Options from './options';

type Props = {
  date: Dateable;
  holding: Holding;
  onAdd: () => void;
  onCalendar: () => void;
  onToday: (dateable: Dateable) => void;
  onUpcoming: () => void;
  view: string;
};

export default function Overview({
  date,
  holding,
  onAdd,
  onCalendar,
  onToday,
  onUpcoming,
  view,
}: Props) {
  return (
    <>
      <Header
        date={date}
        holding={holding}
      />
      <Options
        date={date}
        holding={holding}
        onAdd={onAdd}
        onCalendar={onCalendar}
        onToday={onToday}
        onUpcoming={onUpcoming}
        view={view}
      />
    </>
  );
};
