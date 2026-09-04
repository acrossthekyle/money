'use client';

import { Fragment } from 'react';

import type { Calendar, Holding } from '@/types';
import { formatNumber } from '@/utils';

import Budget from './budget';
import {
  Container,
  ContainerCell,
  ContainerCellDate,
  ContainerCellBalance,
  ContainerCellBudgets,
  ContainerCellBudget,
  ContainerCellBudgetAdd,
  ContainerCellBudgetMore,
  ContainerCellBudgetName,
  ContainerCellBudgetAmount,
} from './components';
import Message from './message';
import { useModel } from './model';

type Props = {
  days: Array<Calendar[]>;
  holdings: Holding[];
  parent: string;
};

export default function Calendar({ days, holdings, parent }: Props) {
  const { budget, date, handleBudget, handleDone, message } = useModel();

  return (
    <>
      <Container>
        {days.map((week, index) => (
          <Fragment key={index}>
            {week.map((day) => (
              <ContainerCell
                isFaded={day.isPad}
                isHighlighted={day.isToday}
                key={day.date}
              >
                {!day.isPad && !parent.includes('overview') && (
                  <ContainerCellBudgetAdd
                    onClick={() => handleBudget(day.date)}
                  />
                )}
                <ContainerCellDate
                  isFaded={day.isPad}
                  isHighlighted={day.isToday}
                  value={day.date}
                />
                <ContainerCellBalance
                  isFaded={day.isPad}
                  isNegative={day.balance < 0}
                >
                  {formatNumber(day.balance)}
                </ContainerCellBalance>
                {day.budgets.length > 0 && (
                  <ContainerCellBudgets>
                    {day.budgets.slice(0, 2).map((item, key) => (
                      <ContainerCellBudget
                        isFaded={day.isPad}
                        key={`${index}-week-${key}`}
                        onClick={parent.includes('overview') ? undefined : () => handleBudget(day.date, item)}
                      >
                        <ContainerCellBudgetName>
                          {item.name}
                        </ContainerCellBudgetName>
                        <ContainerCellBudgetAmount type={item.type}>
                          {formatNumber(item.amount)}
                        </ContainerCellBudgetAmount>
                      </ContainerCellBudget>
                    ))}
                    {day.budgets.length > 2 && (
                      <ContainerCellBudgetMore isFaded={day.isPad}>
                        {day.budgets.length - 2} more...
                      </ContainerCellBudgetMore>
                    )}
                  </ContainerCellBudgets>
                )}
              </ContainerCell>
            ))}
          </Fragment>
        ))}
      </Container>
      <Budget
        holdings={holdings}
        budget={budget}
        date={date}
        onDone={handleDone}
        parent={parent}
      />
      <Message value={message} />
    </>
  );
};
