'use client';

import { TransactionContainer } from '../components';

type Props = {
  isHighlighted: boolean;
  onClick: () => void;
};

export default function Return({
  children,
  isHighlighted,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <TransactionContainer
      isHighlighted={isHighlighted}
      onClick={() => onClick()}
    >
      {children}
    </TransactionContainer>
  );
};
