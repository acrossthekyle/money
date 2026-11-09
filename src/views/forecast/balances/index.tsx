import { ArrowDown, Play, Square, ArrowUp } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { Budget, CalendarDay, Holding } from '@/types';
import { currency } from '@/utils';

type Filtered = {
  budget?: Budget;
  day: CalendarDay;
  type: string;
};

type Props = {
  days: CalendarDay[];
};

export default function Balances({ days }: Props) {
  const filtered = days.filter(({ dateable }) => dateable.isInMonth && !dateable.isBeforeToday);

  const balances = filtered.map((day: CalendarDay) => day.balance);

  const start = balances[0];
  const lowest = Math.min(...balances);
  const highest = Math.max(...balances);
  const end = balances[balances.length - 1];

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>Balance</h2>
      <ul className={styles.stats}>
        <li className={styles.stat}>
          <span className={styles.label}>
            <Play className={styles.icon} /> Start
          </span>
          <span className={styles.value}>{start < 0 ? '-' : ''}${currency(start)}</span>
        </li>
        <li className={styles.stat}>
          <span className={styles.label}>
            <Square className={styles.icon} /> End
          </span>
          <span className={styles.value}>{end < 0 ? '-' : ''}${currency(end)}</span>
        </li>
        <li className={styles.stat}>
          <span className={styles.label}>
            <ArrowUp className={styles.icon} /> High
          </span>
          <span className={styles.value}>{highest < 0 ? '-' : ''}${currency(highest)}</span>
        </li>
        <li className={styles.stat}>
          <span className={styles.label}>
            <ArrowDown className={styles.icon} /> Low
          </span>
          <span className={styles.value}>{lowest < 0 ? '-' : ''}${currency(lowest)}</span>
        </li>
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    flex gap-4
    mt-6
    font-roboto
    text-tiny
  `,
  header: `
    font-bold
    uppercase
  `,
  stats: `
    flex-1
    flex flex-col gap-2
  `,
  stat: `
    flex justify-between gap-2
  `,
  label: `
    flex items-center gap-2
    text-left
    uppercase
  `,
  value: `
    text-right
  `,
  icon: `
    size-2.5
  `,
});
