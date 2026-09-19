'use client';

import { format } from 'date-fns';
import { TextAlignEnd, TrendingDown, TrendingUp } from 'lucide-react';

import { useHoldings } from '@/hooks/useHoldings';
import { useTimezone } from '@/hooks/useTimezone';
import tw from '@/styles';
import type { Day, Holding } from '@/types'
import { currency, date } from '@/utils';

type Props = {
  calendar: Day[];
  holding: Holding;
  saved: string;
};

export default function Section({ calendar, holding, saved }: Props) {
  const { zone } = useTimezone();

  const { onHoldings } = useHoldings();

  const filtered = calendar.days.filter(day => day.isInMonth);
  const start = filtered[0];
  const end = filtered[filtered.length - 1];

  const isTrendingUp = start.balance < end.balance;

  return (
    <section aria-label="accounts and assets" className={styles.container}>
      <h1 className={styles.header}>
        <span className={styles.title}>
          {holding.name}{holding.number && `. . . ${holding.number}`}
        </span>
        <span className={styles.lid}>{holding.type}</span>
      </h1>
      <button className={styles.toggle} onClick={onHoldings} type="button">
        <TextAlignEnd className={styles.ellipsis} />
      </button>
      <p className={styles.balance}>
        <span className={styles.disclaimer}>
          Balance as of Today {format(date(zone), 'MM/dd/yyyy')}
        </span>
        <span className={styles.amount}>
          {holding.balance < 0 && '-'}${currency(holding.balance)}
        </span>
      </p>
      {isTrendingUp ? (
        <TrendingUp className={styles.trend} />
      ) : (
        <TrendingDown className={styles.trend} />
      )}
    </section>
  );
};

const styles = tw({
  container: `
    col-start-1 row-start-1 col-span-8 row-span-3
    relative
    mx-10
    p-4
    bg-(--foreground)
    text-(--background)
    uppercase
    rounded-xl
  `,
  header: `
    flex flex-col gap-1.5
    leading-[1]
    truncate
  `,
  title: `
    font-black
  `,
  lid: `
    text-tiny
  `,
  toggle: `
    absolute top-2 right-1
    p-2
  `,
  ellipsis: `
    w-5 h-5
    stroke-2
  `,
  balance: `
    absolute bottom-4 right-4
    flex flex-col items-end gap-2
  `,
  disclaimer: `
    text-xtiny
    leading-[1]
  `,
  amount: `
    text-xl
    font-roboto
    leading-[0.8]
  `,
  trend: `
    absolute left-4 bottom-2.5
    w-5 h-5
    stroke-2
  `,
});
