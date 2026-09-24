import { Fragment } from 'react';

import tw from '@/styles';
import type { CalendarMonth, Holding } from '@/types';
import Ui from '@/ui';
import { getBudgetDisplayData } from '@/utils/budgets';

import Budget from './budget';
import Day from './day';
import Header from './header';
import Return from './return';

type Props = {
  calendar: CalendarMonth;
  holding: Holding;
};

export default function Budgets({
  calendar,
  holding,
}: Props) {
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
      <Header holding={holding} />
      <Ui.Components.Divider />
      {renderables.map((day, index) => (
        <Fragment key={index}>
          {index !== 0 && <Ui.Components.Divider />}
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
                  />
                </li>
              );
            })}
            {day.return.amount !== null && (
              <li>
                <Return
                  amount={String(day.return.amount)}
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
    flex flex-col gap-6
    mb-4
  `,
});
