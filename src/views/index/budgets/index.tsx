import { format } from 'date-fns';
import { Pen, Plus } from 'lucide-react';

import tw, { cs } from '@/styles';
import { currency } from '@/utils';

type Props = {
  // todo
};

function getBudgetInfo(budget: Budget, credits, debits) {
  const existsInDebits = debits.find(debit => debit.budget === budget.id);

  return {
    isNegative: existsInDebits,
    amount: budget.amount,
  };
};

export default function Section({ calendar, date }: Props) {
  const found = calendar.days.findIndex(day => day.iso === date);

  const current = calendar.days[found];

  const upcoming = calendar.days.find((day, index) => {
    return index > found && day.isInMonth && day.budgets.length > 0;
  });

  return (
    <section aria-label="budgets for selected day" className={styles.container}>
      <h2 className={styles.header}>
        <span className={styles.day}>
          {format(current.date, 'dd')}
        </span>
        <span className={styles.stacked}>
          <span className={styles.month}>
            {format(current.date, 'MMMM')}
          </span>
          <span className={styles.year}>
            {format(current.date, 'yyyy')}
          </span>
        </span>
      </h2>
      <div>
        <h3 className={styles.heading}>Current</h3>
        <ul className={styles.items}>
          {current.budgets.length > 0 ? current.budgets.map((budget, index) => {
            const info = getBudgetInfo(budget, current.credits, current.debits);

            return (
              <li key={budget.id}>
                <button className={styles.item} type="button">
                  {index === 0 ? (
                    <span className={styles.square}>
                      {format(current.date, 'dd')}
                    </span>
                  ) : (
                    <span className={styles.spacer} />
                  )}
                  <p className={styles.content}>
                    <span className={styles.name}>{budget.name}</span>
                    <span
                      className={
                        cs(
                          styles.amount,
                          info.isNegative ? styles.negative : styles.positive,
                        )
                      }
                    >
                      ${currency(info.amount)}
                    </span>
                  </p>
                  <Pen className={styles.pen} />
                </button>
              </li>
            );
          }) : (
            <li>
              <button className={styles.item} disabled type="button">
                <span className={styles.square}>
                  {format(current.date, 'dd')}
                </span>
                <p className={styles.content}>
                  <span className={styles.name}>No budgets scheduled</span>
                  <span className={styles.amount}>
                    ---
                  </span>
                </p>
              </button>
            </li>
          )}
        </ul>
        <hr className={styles.divider} />
        <h3 className={styles.heading}>Upcoming</h3>
        <ul className={styles.items}>
          {upcoming?.budgets.length > 0 ? upcoming?.budgets.map((budget, index) => {
            const info = getBudgetInfo(budget, upcoming.credits, upcoming.debits);

            return (
              <li key={budget.id}>
                <button className={styles.item} type="button">
                  {index === 0 ? (
                    <span className={styles.square}>
                      {format(upcoming.date, 'dd')}
                    </span>
                  ) : (
                    <span className={styles.spacer} />
                  )}
                  <p className={styles.content}>
                    <span className={styles.name}>{budget.name}</span>
                    <span
                      className={
                        cs(
                          styles.amount,
                          info.isNegative ? styles.negative : styles.positive,
                        )
                      }
                    >
                      ${currency(info.amount)}
                    </span>
                  </p>
                  <Pen className={styles.pen} />
                </button>
              </li>
            );
          }) : (
            <li>
              <button className={styles.item} disabled type="button">
                <span className={styles.square}>
                  --
                </span>
                <p className={styles.content}>
                  <span className={styles.name}>---</span>
                </p>
              </button>
            </li>
          )}
        </ul>
        <button className={styles.add} type="button">
          <Plus className={styles.plus} />
        </button>
      </div>
    </section>
  );
};

const styles = tw({
  container: `
    relative
    col-start-17 row-start-1 col-span-8 row-span-12
    flex flex-col justify-between
    mx-10
  `,
  header: `
    flex items-end gap-3
  `,
  day: `
    text-9xl
    font-geist font-black
    leading-[0.8]
  `,
  stacked: `
    flex flex-col gap-1
    pb-0.75
    text-sm
  `,
  month: `
    uppercase
    font-bold
    leading-[1]
  `,
  year: `
    text-current/50
    leading-[1]
  `,
  divider: `
    bg-transparent
    border-t border-current/12.5
  `,
  heading: `
    mb-3 mt-5
    text-tiny
    uppercase
    font-black
  `,
  items: `
    flex flex-col gap-6
    pb-6
  `,
  item: `
    relative
    flex gap-4
    w-full
    text-left
  `,
  square: `
    flex items-center justify-center
    w-9 h-9
    bg-(--foreground)
    text-(--background)
    rounded-md
  `,
  spacer: `
    w-9 h-9
  `,
  content: `
    flex flex-col justify-center gap-2
  `,
  name: `
    leading-[1]
    text-sm
    font-medium
  `,
  amount: `
    leading-[1]
    font-roboto
    text-xs
  `,
  pen: `
    absolute top-1/2 right-0
    -translate-y-1/2
    w-4 h-4
    stroke-1
  `,
  add: `
    flex items-center justify-center
    w-9 h-9
    mt-4
    border border-current/22.5
    rounded-md
  `,
  plus: `
    h-4 w-4
    stroke-2
  `,
  negative: `
    text-red-500
  `,
  positive: `
    text-green-500
  `,
});
