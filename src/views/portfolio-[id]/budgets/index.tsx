import { CARD_RADIUS } from '@/constants';
import tw from '@/styles';
import type { CalendarDay, Dateable } from '@/types';

import { filterDays } from '../utils';

import Empty from './empty';
import Return from './return';
import Transaction from './transaction';
import { getBudgets } from './utils';

type Props = {
  days: CalendarDay[];
  date: Dateable;
  view: string;
};

export default function Budgets({
  days,
  date,
  view,
}: Props) {
  const filtered = filterDays(view, date, days);

  if (filtered.length === 0) {
    return null;
  }

  const iterables = getBudgets(filtered);

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>
        Upcoming
      </h2>
      {iterables.length > 0 ? (
        <ul className={styles.items}>
          {iterables.map((iterable, index: number) => (
            <li key={`${iterable.day.dateable.iso}-${index}`}>
              {iterable.type === 'budget' && iterable.budget && (
                <Transaction
                  budget={iterable.budget}
                  day={iterable.day}
                  isHighlighted={date.iso === iterable.day.dateable.iso}
                />
              )}
              {iterable.type === 'return' && (
                <Return
                  day={iterable.day}
                  isHighlighted={date.iso === iterable.day.dateable.iso}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Empty
          range={[
            filtered[0].dateable.display,
            filtered[filtered.length - 1].dateable.display,
          ]}
        />
      )}
    </section>
  );
};

const styles = tw({
  container: `
    relative
    p-4 pl-3
    border border-current/6
    bg-(--foreground)/2

    ${CARD_RADIUS}
  `,
  header: `
    mb-4 pl-1
    font-medium
    text-sm
    uppercase

    md:text-xs
  `,
  items: `
    group
    flex flex-col gap-5
  `,
});
