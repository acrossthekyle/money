'use client';

import { format } from 'date-fns';
import { TextAlignEnd, TrendingDown, TrendingUp } from 'lucide-react';

import { MONTHS } from '@/constants';
import { useHolding, useHoldings, useTimezone } from '@/hooks';
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

  const budgets = calendar
    .days
    .filter(day => !day.isBeforeToday && day.isInMonth)
    .reduce((accumulator, day) => {
      return accumulator + day.budgets.length;
    }, 0);

  const handleOnEdit = () => {
    onEdit(holding);

    onHolding();
  }

  return (
    <section aria-label="accounts and assets" className={styles.container}>
      <button
        className={styles.content}
        onClick={handleOnEdit}
        title="Edit account/asset"
        type="button"
      >
        <h1 className={styles.header}>
          <span className={styles.title}>
            {holding.name}
          </span>
          <span className={styles.lid}>
            {!!holding.institution && `${holding.institution} • `}
            {holding.type}
            {holding.number && ` . . . ${holding.number}`}
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
        <p className={styles.budgets}>
          <span className={styles.disclaimer}>
            {calendar.isThisMonth ? 'Remaining ' : ''}in {MONTHS[calendar.month]}
          </span>
          <span className={styles.amount}>
            {budgets} Budgets
          </span>
        </p>
        {isTrendingUp ? (
          <TrendingUp className={styles.trend} />
        ) : (
          <TrendingDown className={styles.trend} />
        )}
      </button>
      <button
        className={styles.toggle}
        onClick={onHoldings}
        title="View all accounts/assets"
        type="button"
      >
        <TextAlignEnd className={styles.menu} />
      </button>
    </section>
  );
};

const styles = tw({
  container: `
    col-start-1 row-start-1 col-span-24
    relative
    h-40
    mx-4

    md:col-span-12
    md:row-span-3
    md:h-auto
    md:mx-10
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
    hidden
    absolute bottom-4 right-4
    flex-col items-end gap-2

    md:flex
  `,
  budgets: `
    absolute bottom-4 right-4
    flex flex-col items-end gap-2

    md:hidden
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
