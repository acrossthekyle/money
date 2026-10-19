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
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  isEditing,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { balance, handleOnChange, isBlocked } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Ui.Form.Currency onChange={handleOnChange} value={balance} />
      </Content>
      <Actions>
        {children}
        <Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('balance', balance)}
        >
          Next
        </Action>
      </Actions>
    </Container>
  );
};
