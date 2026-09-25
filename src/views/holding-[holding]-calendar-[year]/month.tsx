import Link from 'next/link';

import tw, { cs } from '@/styles';
import type { CalendarMonth } from '@/types';
import { pad } from '@/utils';

import Day from './day';

type Props = {
  id: string;
  month: CalendarMonth;
  year: string;
};

export default function Month({ id, month, year }: Props) {
  return (
    <Link
      className={
        cs(
          styles.item,
          month.isPastMonth && styles.disabled,
        )
      }
      href={
        `/holding/${id}/${year}/${pad(month.month + 1)}/${month.isThisMonth ? month.todayISO.split('-')[2] : '01'}`
      }
    >
      <h3 className={styles.heading}>{month.name}</h3>
      <div
        className={
          cs(
            styles.days,
            month.isPastMonth && styles.faded,
          )
        }
      >
        {month.days.map((day) => (
          <Day day={day} key={day.iso} />
        ))}
      </div>
    </Link>
  );
};

const styles = tw({
  disabled: `
    pointer-events-none
  `,
  item: `
    group
    w-full h-full
  `,
  heading: `
    mb-2
    uppercase
    text-base

    md:text-sm
  `,
  days: `
    grid grid-cols-7 grid-rows-6 gap-y-1 gap-x-1
    p-2 pl-1.5
    bg-(--foreground)
    text-(--background)
    rounded-md

    motion-safe:duration-300

    group-hover:bg-(--background)
    group-hover:text-(--foreground)
  `,
  faded: `
    bg-(--foreground)/50
  `,
})
