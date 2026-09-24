'use client';

import { format } from 'date-fns';
import { Fragment } from 'react';

import { useBudget } from '@/hooks';
import tw from '@/styles';
import type { Budget, CalendarMonth, Holding } from '@/types';
import { currency } from '@/utils';
import { getBudgetDisplayData } from '@/utils/budgets';

import Budget from './budget';
import Day from './day';
import Divider from './divider';
import Header from './header';
import Return from './return';

type Props = {
  calendar: CalendarMonth;
  holding: Holding;
  onAdd: () => void;
  onEdit: (budget: Budget) => void;
};

export default function List({
  calendar,
  holding,
  onAdd,
  onEdit,
}: Props) {
  const { onBudget } = useBudget();

  const handleOnEdit = (budget: Budget) => {
    onEdit(budget);

    onBudget();
  };

  const handleOnAdd = () => {
    onAdd();

    onBudget();
  };

  const renderables = calendar.days.filter(day => {
    const isDayValid = day.isInMonth &&
      (day.budgets.length > 0 || day.return.amount !== null);

    if (calendar.isThisMonth) {
      return !day.isBeforeToday && isDayValid;
    }

    return isDayValid;
  });

  return (
    <>
      <Header onAdd={handleOnAdd} />
      <Divider />
      {renderables.map((day, index) => (
        <Fragment key={index}>
          {index !== 0 && <Divider />}
          <Day date={day.date} balance={day.balance} />
          <ul className={styles.items}>
            {day.budgets.map(budget => {
              const data = getBudgetDisplayData(budget, day.debits);

              return (
                <li key={budget.id}>
                  <Budget
                    amount={data.amount}
                    budget={budget}
                    holding={holding}
                    isNegative={data.isNegative}
                    onEdit={() => handleOnEdit(budget)}
                  />
                </li>
              );
            })}
            {day.return.amount !== null && (
              <li>
                <Return
                  amount={day.return.amount}
                  isPositive={day.return.isPositive}
                  label={day.return.label}
                  rate={holding.interest}
                />
              </li>
            )}
          </ul>
        </Fragment>
      ))}
    </>
  );
};

const styles = tw({
  items: `
    mb-4
    flex flex-col gap-4
  `,





  container: `
    flex flex-col
  `,
  item: `
    relative
    text-sm
  `,
  add: `
    uppercase
    font-normal
    text-xs
    underline underline-offset-4
  `,
  heading: `
    flex items-center justify-between
    w-full
    font-roboto font-bold
    text-sm
    uppercase
  `,
  divider: `
    h-px w-4
    my-8
    bg-(--foreground)/75
  `,

  budgets: `
    flex flex-col gap-6
  `,
  budget: `
    relative
    flex flex-col
    w-full
    text-left text-xs
    font-roboto
    uppercase
  `,
});
