'use client';

import {
  TransactionAvatar,
  TransactionContainer,
  TransactionContent,
  TransactionContentLower,
  TransactionContentUpper,
} from '../components';

import { useModel } from './model';

type Props = {
  onClick: () => void;
  range: string[];
};

export default function Empty({
  onClick,
  range,
}: Props) {
  const { handleOnClick } = useModel(range);

  return (
    <TransactionContainer onClick={handleOnClick}>
      <TransactionAvatar type="none" />
      <TransactionContent>
        <TransactionContentUpper>
          N/A
        </TransactionContentUpper>
        <TransactionContentLower>
          {range[0]} &mdash; {range[1]}
        </TransactionContentLower>
      </TransactionContent>
    </TransactionContainer>
  );
};
