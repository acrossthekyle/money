'use client';

import tw from '@/styles';
import type { CalendarDay, Dateable } from '@/types';

import Chart from './chart';
import Navigation from './navigation';
import Overview from './overview';
import { filterDays } from './utils';

type Props = {
  date: Dateable;
  days: CalendarDay[];
  onClick: (dateable: Dateable, view: string) => void;
};

export default function Analytics({
  date,
  days,
  onClick,
}: Props) {
  return (
    <>
      <div className={styles.container}>
        <Navigation date={date} onClick={onClick} />
        <Chart days={filterDays(date, days)} />
      </div>
      <Overview days={days} />
    </>
  );
};

const styles = tw({
  container: `
    relative
    rounded-4xl
    border border-current/12
    bg-(--foreground)/2

    md:rounded-2xl
  `,
});
