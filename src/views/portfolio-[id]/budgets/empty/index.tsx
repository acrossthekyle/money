'use client';

import { TransactionContainer } from '../components';

type Props = {
  onClick: () => void;
};

export default function Empty({
  children,
  onClick,
}: React.PropsWithChildren<Props>) {
  return (
    <TransactionContainer onClick={() => onClick()}>
      {children}
    </TransactionContainer>
  );
};
