'use client';

import type { CalendarDay, Dateable } from '@/types';

import { filterDays } from '../utils';

import Chart from './chart';
import Overview from './overview';

type Props = {
  date: Dateable;
  days: CalendarDay[];
  view: string;
};

export default function Analytics({
  date,
  days,
  view,
}: Props) {
  const filtered = filterDays(view, date, days);

  return (
    <>
      <Chart days={filtered} />
      <Overview days={filtered} />
    </>
  );
};
