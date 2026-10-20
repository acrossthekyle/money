'use client';

import type { Budget, CalendarDay } from '@/types';
import { currency } from '@/utils';
import { getBudgetDisplayData } from '@/utils/budgets';

import {
  TransactionAvatar,
  TransactionContainer,
  TransactionContent,
  TransactionContentLower,
  TransactionContentName,
  TransactionContentAmount,
  TransactionContentUpper,
} from '../components';

import { useModel } from './model';

type Props = {
  budget: Budget;
  day: CalendarDay;
  isHighlighted: boolean;
};

export default function Transaction({
  budget,
  day,
  isHighlighted,
}: Props) {
  const { handleOnClick } = useModel(budget, day);

  const { amount, isNegative } = getBudgetDisplayData(
    day.debits,
    budget,
  );

  return (
    <TransactionContainer onClick={handleOnClick}>
      <TransactionAvatar isHighlighted={isHighlighted} type={budget.category} />
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
    </TransactionContainer>
  );
};
