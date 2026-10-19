'use client';

import type { Holding } from '@/types';

import {
  Action,
  Actions,
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
  children,
  header,
  holdings,
  isActive,
  isEditing,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
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
      <Actions>
        {children}
        <Action
          isEditing={isEditing}
          onClick={() => onNext('transferee', transferee)}
        >
          {transferee ? 'Next' : 'Skip'}
        </Action>
      </Actions>
    </Container>
  );
};
