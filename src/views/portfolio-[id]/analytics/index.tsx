import type { CalendarDay, Dateable } from '@/types';

import { filterDays } from '../utils';

import Chart from './chart';

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
  return (
    <Chart days={filterDays(view, date, days)} />
  );
};
