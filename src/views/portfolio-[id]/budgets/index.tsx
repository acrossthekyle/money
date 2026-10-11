'use client';

import { Fragment } from 'react';

import tw, { cs } from '@/styles';
import type { Budget, CalendarDay, Dateable, Holding } from '@/types';
import { currency } from '@/utils';
import { getBudgetDisplayData } from '@/utils/budgets';

import {
  TransactionAvatar,
  TransactionContent,
  TransactionContentLower,
  TransactionContentName,
  TransactionContentAmount,
  TransactionContentUpper,
} from './components';
import Empty from './empty';
import Return from './return';
import Transaction from './transaction';

type Props = {
  days: CalendarDay[];
  date: Dateable;
  holding: Holding;
  onClick: (budget: Budget, date: Dateable) => void;
  view: string;
};

export default function Budgets({
  days,
  date,
  holding,
  onClick,
  view,
}: Props) {
  if (view === 'calendar' || view === 'analytics') {
    return null;
  }

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
              {day.budgets.map((budget, index) => {
                const { amount, isNegative } = getBudgetDisplayData(
                  budget,
                  day.debits,
                );

                // const isNotAssignedToHolding = budget.parent !== holding.id;

                return (
                  <li key={`${day.dateable.iso}-${index}`}>
                    <Transaction
                      budget={budget}
                      date={day.dateable}
                      isHighlighted={date.iso === day.dateable.iso}
                      onClick={onClick}
                    >
                      <TransactionAvatar type={budget.category} />
                      <TransactionContent>
                        <TransactionContentUpper>
                          <TransactionContentName>{budget.name}</TransactionContentName>
                          <TransactionContentAmount isNegative={isNegative}>
                            ${currency(amount)}
                          </TransactionContentAmount>
                        </TransactionContentUpper>
                        <TransactionContentLower>
                          <span>{day.dateable.display}</span>
                          <span>{budget.category}</span>
                        </TransactionContentLower>
                      </TransactionContent>
                    </Transaction>
                  </li>
                );
              })}
              {day.return.amount !== null && (
                <li>
                  <Return
                    isHighlighted={date.iso === day.dateable.iso}
                    onClick={() => {}}
                  >
                    <TransactionAvatar type="return" />
                    <TransactionContent>
                      <TransactionContentUpper>
                        <TransactionContentName>
                          {day.return.label}
                        </TransactionContentName>
                        <TransactionContentAmount isNegative={!day.return.isPositive}>
                          ${currency(day.return.amount)}
                        </TransactionContentAmount>
                      </TransactionContentUpper>
                      <TransactionContentLower>
                        <span>{day.dateable.display}</span>
                        <span>
                          {['savings', 'checking', 'credit_card'].includes(holding.type) && (
                            <>Growth</>
                          )}
                          {['retirement'].includes(holding.type) && (
                            <>Return</>
                          )}
                          {['property'].includes(holding.type) && (
                            <>Worth</>
                          )}
                        </span>
                      </TransactionContentLower>
                    </TransactionContent>
                  </Return>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      ) : (
        <p>
          <Empty onClick={() => {}}>
            <TransactionAvatar type="none" />
            <TransactionContent>
              <TransactionContentUpper>
                N/A
              </TransactionContentUpper>
              <TransactionContentLower>
                {filtered[0].dateable.display} &mdash; {filtered[filtered.length - 1].dateable.display}
              </TransactionContentLower>
            </TransactionContent>
          </Empty>
        </p>
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
