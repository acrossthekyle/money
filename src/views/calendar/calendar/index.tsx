import type { Day, DayBudget } from '@/types';

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
  date: string;
  days: Day[];
  onAdd: (date: string) => void;
  onEdit: (date: string, budget: DayBudget) => void;
  onMore: (
    balance: number,
    date: string,
    budgets: DayBudget[],
    useModal: boolean,
  ) => void;
};

export default function Calendar({ date, days, onAdd, onEdit, onMore }: Props) {
  return (
    <Container>
      {days.map((day) => (
        <ContainerCell
          isFaded={day.isPad}
          isHighlighted={day.date === date}
          key={day.date}
        >
          {!day.isPad && (
            <ContainerCellBudgetAdd onClick={() => onAdd(day.date)} />
          )}
          <ContainerCellDate
            isFaded={day.isPad}
            isHighlighted={day.isToday}
            value={day.date}
          />
          <ContainerCellBalance isFaded={day.isPad} value={day.balance} />
          {day.budgets.length > 0 && (
            <ContainerCellBudgets hasMore={day.budgets.length > 2}>
              {day.budgets
                .slice(0, 2)
                .map((budget, index) => (
                  <ContainerCellBudget
                    isFaded={day.isPad}
                    key={`${day.date}-${index}`}
                    onClick={budget.isBudget ? () => onEdit(day.date, budget) : undefined}
                  >
                    <ContainerCellBudgetName>
                      {budget.name}
                    </ContainerCellBudgetName>
                    <ContainerCellBudgetAmount
                      type={budget.type}
                      value={budget.amount}
                    />
                  </ContainerCellBudget>
              ))}
            </ContainerCellBudgets>
          )}
          <ContainerCellBudgetMore
            count={day.budgets.length - 2}
            isFaded={day.isPad}
            onClick={useModal => onMore(day.balance, day.date, day.budgets, useModal)}
          />
        </ContainerCell>
      ))}
    </Container>
  );
};
