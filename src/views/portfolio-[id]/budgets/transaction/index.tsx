'use client';

import type { Budget, Dateable } from '@/types';

import { TransactionContainer } from '../components';

type Props = {
  budget: Budget;
  date: Dateable;
  isHighlighted: boolean;
  onClick: (budget: Budget, date: Dateable) => void;
};

export default function Transaction({
  children,
  budget,
  date,
  isHighlighted,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <TransactionContainer
      isHighlighted={isHighlighted}
      onClick={() => onClick(budget, date)}
    >
      {children}
    </TransactionContainer>
  );
};
