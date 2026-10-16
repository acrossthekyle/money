'use client';

import type { Holding } from '@/types';

import {
  Action,
  Container,
  Header,
  Option,
  Options,
} from '../../../components';

import { useModel } from './model';

type Props = {
  header: string;
  holdings: Holding[];
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  header,
  holdings,
  isActive,
  isEditing,
  onNext,
  value,
}: Props) {
  const { handleOnChange, transferee } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Options>
        {holdings.map((holding) => (
          <Option
            isActive={transferee === holding.id}
            key={holding.id}
            onClick={() => handleOnChange(holding.id)}
          >
            <span>{holding.name}</span>
          </Option>
        ))}
      </Options>
      <Action
        isEditing={isEditing}
        onClick={() => onNext('transferee', transferee)}
      >
        {transferee ? 'Next' : 'Skip'}
      </Action>
    </Container>
  );
};
