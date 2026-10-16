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
                    isHighlighted={date.iso === day.dateable.iso}
                  />
                </li>
              ))}
              {day.return.amount !== null && (
                <li>
                  <Return
                    day={day}
                    holding={holding}
                    isHighlighted={date.iso === day.dateable.iso}
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
    p-4
    border border-current/6
    rounded-xl
    bg-(--foreground)/2
  `,
  header: `
    mb-4
    font-medium
    text-sm
  `,
  items: `
    flex flex-col gap-5
  `,
});
