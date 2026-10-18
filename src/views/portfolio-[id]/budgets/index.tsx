import { Fragment } from 'react';

import tw from '@/styles';
import type { CalendarDay, Dateable, Holding } from '@/types';

import Empty from './empty';
import Return from './return';
import Transaction from './transaction';

type Props = {
  days: CalendarDay[];
  date: Dateable;
  holding: Holding;
};

export default function Budgets({
  days,
  date,
  holding,
}: Props) {
  const filtered = days.filter(
    ({ dateable }) => dateable.week === date.week && dateable.year === date.year
  );

  if (filtered.length === 0) {
    return null;
  }

  const hasTransactions = filtered.reduce((accumulator, day) => {
    if (day.return.amount !== null) {
      return accumulator + 1;
    }

    return accumulator + day.budgets.length;
  }, 0) > 0;

  const hasDateMatches = filtered.some(day => {
    if (day.budgets.length > 0 || day.return.amount !== null) {
      return day.dateable.iso === date.iso;
    }
  });

  return (
    <section className={styles.container}>
      <h2 className={styles.header}>
        Upcoming
      </h2>
      {hasTransactions ? (
        <ul className={styles.items}>
          {filtered.map((day) => (
            <Fragment key={day.dateable.iso}>
              {day.budgets.map((budget, index) => (
                <li key={`${day.dateable.iso}-${index}`}>
                  <Transaction
                    budget={budget}
                    day={day}
                    holding={holding}
                    isHighlighted={hasDateMatches ? date.iso !== day.dateable.iso : false}
                  />
                </li>
              ))}
              {day.return.amount !== null && (
                <li>
                  <Return
                    day={day}
                    holding={holding}
                    isHighlighted={hasDateMatches ? date.iso !== day.dateable.iso : false}
                  />
                </li>
              )}
            </Fragment>
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
    p-4 pl-3
    border border-current/6
    rounded-4xl
    bg-(--foreground)/2

    md:rounded-2xl
  `,
  header: `
    mb-4 pl-1
    font-medium
    text-base

    md:text-sm
  `,
  items: `
    group
    flex flex-col gap-5
  `,
});
