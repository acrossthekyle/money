import tw from '@/styles';
import type { CalendarMonth, Dateable, Holding } from '@/types';
import Ui from '@/ui';
import { getBudgetDisplayData } from '@/utils/budgets';

import Budget from './budget';
import Header from './header';
import Return from './return';

type Props = {
  calendar: CalendarMonth;
  date: Dateable;
  holding: Holding;
};

export default function Budgets({
  calendar,
  date,
  holding,
}: Props) {
  const day = calendar.days.find(day => day.iso === date.iso);

  return (
    <>
      <Header date={date} day={day} holding={holding} />
      {day && (
        <>
          {(day.budgets.length > 0 || day.return.amount !== null) && (
            <Ui.Components.Divider />
          )}
          <ul className={styles.items}>
            {day?.budgets.map(budget => {
              const data = getBudgetDisplayData(budget, day.debits);

              return (
                <li className={styles.item} key={budget.id}>
                  <Budget
                    amount={data.amount}
                    budget={budget}
                    date={date}
                    day={{ date: day.date, iso: day.iso }}
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
        </>
      )}
    </>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-8
  `,
  item: `
    relative
  `,
});
