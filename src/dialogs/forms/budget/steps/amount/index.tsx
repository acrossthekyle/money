'use client';

import Ui from '@/ui';

import {
  Action,
  Actions,
  Container,
  Content,
  Header,
} from '../../../components';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  isNegative: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  isEditing,
  isNegative,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { amount, handleOnChange, isBlocked } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Ui.Form.Currency
          isNegative={isNegative}
          onChange={handleOnChange}
          value={amount}
        />
      </Content>
      <Actions>
        {children}
        <Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('amount', amount)}
        >
          Next
        </Action>
      </Actions>
    </Container>
  );
};
