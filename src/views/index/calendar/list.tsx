'use client';

import { format, getDate } from 'date-fns';
import { Pen } from 'lucide-react';

import { useBudget } from '@/hooks';
import tw, { cs } from '@/styles';
import type { Budget, CalendarMonth, Holding } from '@/types';
import { currency } from '@/utils';
import { getBudgetDisplayData } from '@/utils/budgets';

type Props = {
  calendar: CalendarMonth;
  holding: Holding;
  isCompact: boolean;
  onEdit: (budget: Budget) => void;
};

export default function List({
  calendar,
  holding,
  isCompact,
  onEdit,
}: Props) {
  const { onBudget } = useBudget();

  const handleOnEdit = (budget: Budget) => {
    onEdit(budget);

    onBudget();
  };

  return (
    <ul className={styles.container}>
      {calendar
        .days
        .filter(day => {
          const needsBudgets = isCompact ? day.budgets.length > 0 : true;

          if (calendar.isThisMonth) {
            return day.isInMonth && !day.isBeforeToday && needsBudgets;
          }

          return day.isInMonth && needsBudgets;
        })
        .map((day) => (
          <li className={styles.item} key={day.iso}>
            <h3 className={styles.heading}>
              <span className={styles.date}>{getDate(day.date)}</span>
              <span className={styles.row}>
                <span>{format(day.date, 'MMMM do')}</span>
                <span className={styles.balance}>${currency(day.balance)}</span>
              </span>
            </h3>
            <ul className={styles.budgets}>
              {day.budgets.length === 0 && (
                <li className={styles.budget}>
                  <span className={styles.faded}>No scheduled budgets</span>
                </li>
              )}
              {day.budgets.length > 0 && (
                <>
                  {day.budgets.map((budget) => {
                    const data = getBudgetDisplayData(budget, day.debits);

                    return (
                      <li key={budget.id}>
                        <button
                          className={styles.budget}
                          disabled={budget.parent !== holding.id}
                          onClick={() => handleOnEdit(budget)}
                          title="Edit budget"
                          type="button"
                        >
                          <p className={styles.content}>
                            <span>{budget.name}</span>
                            <span
                              className={
                                cs(
                                  styles.amount,
                                  data.isNegative ? styles.negative : styles.positive,
                                )
                              }
                            >
                              ${currency(data.amount)}
                            </span>
                          </p>
                          {budget.parent === holding.id && (
                            <Pen className={styles.pen} />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </li>
        ))
      }
    </ul>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-8
    mx-4 mt-6
    pb-4

    md:hidden
  `,
  item: `
    relative
    text-sm
  `,
  heading: `
    flex items-center gap-4
    font-bold
    text-base
  `,
  date: `
    flex items-center justify-center shrink-0
    w-9 h-9
    bg-(--foreground)
    text-(--background) text-sm
    font-normal
    rounded-full
  `,
  row: `
    flex items-center justify-between
    w-full
  `,
  balance: `
    font-roboto font-light
    text-current/75
  `,
  budgets: `
    flex flex-col gap-6
    ml-9 mt-2
    py-2 pl-4
  `,
  budget: `
    relative
    flex items-center
    w-full
    h-10
    pr-8 pl-4
    text-left text-sm
    border-l border-current/17.5
  `,
  content: `
    flex flex-col justify-center gap-3
    leading-[1]
  `,
  amount: `
    font-roboto
  `,
  pen: `
    absolute top-1/2 right-0
    -translate-y-1/2
    w-4 h-4
    stroke-1
  `,
  faded: `
    text-current/50
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500
  `,
  icon: `
    w-5 h-5
    stroke-1
  `,
});
