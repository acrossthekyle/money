'use client';

import { format } from 'date-fns';
import { TextAlignEnd, TrendingDown, TrendingUp } from 'lucide-react';

import { useHolding } from '@/hooks/useHolding';
import { useHoldings } from '@/hooks/useHoldings';
import { useTimezone } from '@/hooks/useTimezone';
import tw from '@/styles';
import type { CalendarMonth, Holding } from '@/types'
import { currency, date } from '@/utils';

type Props = {
  calendar: CalendarMonth;
  holding: Holding;
  onEdit: (holding: Holding) => void;
};

export default function Section({ calendar, holding, onEdit }: Props) {
  const { zone } = useTimezone();

  const { onHolding } = useHolding();
  const { onHoldings } = useHoldings();

  const filtered = calendar.days.filter(day => day.isInMonth);
  const start = filtered[0];
  const end = filtered[filtered.length - 1];

  const isTrendingUp = start.balance < end.balance;

  const handleOnEdit = () => {
    onEdit(holding);

    onHolding();
  }

  return (
    <section aria-label="accounts and assets" className={styles.container}>
      <button
        className={styles.content}
        onClick={handleOnEdit}
        type="button"
      >
        <h1 className={styles.header}>
          <span className={styles.title}>
            {holding.name}{holding.number && `. . . ${holding.number}`}
          </span>
          <span className={styles.lid}>
            {!!holding.institution && `${holding.institution} • `}{holding.type}
          </span>
        </h1>
        <p className={styles.balance}>
          <span className={styles.disclaimer}>
            Balance as of Today {format(date(zone), 'MM/dd/yyyy')}
          </span>
          <span className={styles.amount}>
            {Number(holding.balance) < 0 && '-'}${currency(holding.balance)}
          </span>
        </p>
        {isTrendingUp ? (
          <TrendingUp className={styles.trend} />
        ) : (
          <TrendingDown className={styles.trend} />
        )}
      </button>
      <button className={styles.toggle} onClick={onHoldings} type="button">
        <TextAlignEnd className={styles.menu} />
      </button>
    </section>
  );
};

const styles = tw({
  container: `
    col-start-1 row-start-1 col-span-24 row-span-3
    relative
    mx-4

    md:mx-10
    md:col-span-12
    md:row-span-3
    lg:col-span-8
  `,
  content: `
    relative z-0
    flex flex-col
    w-full h-full
    p-4
    bg-(--foreground)
    text-(--background) text-left
    uppercase
    rounded-xl

    light:shadow-lg/25

    md:light:shadow-xl/25
  `,
  header: `
    flex flex-col gap-1.5
    leading-[1]
  `,
  title: `
    pr-8
    font-black
    truncate
  `,
  lid: `
    text-tiny
  `,
  toggle: `
    absolute top-2 right-1 z-10
    p-2
    text-(--background)
  `,
  menu: `
    w-6 h-6
    stroke-2

    md:w-5
    md:h-5
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
    w-6 h-6
    stroke-2

    md:w-5
    md:h-5
  `,
});
