import { addDays, format, startOfMonth } from 'date-fns';

import type { Day, DayBudget } from '@/types';
import { formatNumber } from '@/utils';

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

type Props = {
  canInteract: boolean;
  days: Day[];
  onAdd: (date: string) => void;
  onEdit: (date: string, budget: DayBudget) => void;
};

export default function Calendar({ canInteract, days, onAdd, onEdit }: Props) {
  if (days.length === 0) {
    const today = addDays(startOfMonth(new Date()), -3);

    return (
      <Container>
        {Array.from({ length: 35 }, (_, index) => (
          <ContainerCell isFaded={index < 3} isHighlighted={false} key={index}>
            <ContainerCellDate
              isFaded={index < 3 || index > 32}
              isHighlighted={false}
              value={format(addDays(today, index), 'yyyy-MM-dd')}
            />
            <ContainerCellBalance
              isFaded={index < 3 || index > 32}
              isNegative={false}
            >
              {formatNumber(0.00)}
            </ContainerCellBalance>
          </ContainerCell>
        ))}
      </Container>
    );
  }

  return (
    <Container>
      {days.map((day) => (
        <ContainerCell
          isFaded={day.isPad}
          isHighlighted={day.isToday}
          key={day.date}
        >
          {!day.isPad && canInteract && (
            <ContainerCellBudgetAdd
              onClick={() => onAdd(day.date)}
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
              {day.budgets.slice(0, 2).map((budget, index) => (
                <ContainerCellBudget
                  isFaded={day.isPad}
                  key={`${day.date}-${index}`}
                  onClick={canInteract && budget.isBudget ? () => onEdit(day.date, budget) : undefined}
                >
                  <ContainerCellBudgetName>
                    {budget.name}
                  </ContainerCellBudgetName>
                  <ContainerCellBudgetAmount type={budget.type}>
                    {formatNumber(Number(budget.amount))}
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
    </Container>
  );
};
