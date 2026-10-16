'use client';

import type { CalendarDay, Holding } from '@/types';
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
  holding: Holding;
  isHighlighted: boolean;
};

export default function Return({
  day,
  holding,
  isHighlighted,
}: Props) {
  const { handleOnClick } = useModel(day, holding);

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
    </TransactionContainer>
  );
};
