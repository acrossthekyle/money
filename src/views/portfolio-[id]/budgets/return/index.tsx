'use client';

import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

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
  day: CalendarDay;
  isHighlighted: boolean;
};

export default function Return({
  day,
  isHighlighted,
}: Props) {
  const { handleOnClick } = useModel(day);

  return (
    <TransactionContainer
      isHighlighted={isHighlighted}
      onClick={handleOnClick}
    >
      <TransactionAvatar type="return" />
      <TransactionContent>
        <TransactionContentUpper>
          <TransactionContentName>
            {day.return.label}
          </TransactionContentName>
          <TransactionContentAmount isNegative={!day.return.isPositive}>
            ${currency(String(day.return.amount))}
          </TransactionContentAmount>
        </TransactionContentUpper>
        <TransactionContentLower>
          <span>{day.dateable.display}</span>
          <span>{day.return.type}</span>
        </TransactionContentLower>
      </TransactionContent>
    </TransactionContainer>
  );
};
