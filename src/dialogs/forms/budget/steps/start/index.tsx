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
  const { handleOnChange, isBlocked, start } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Ui.Form.Input
          className="!w-66 md:!w-50"
          value={start}
          name="start"
          onChange={handleOnChange}
          type="date"
        />
      </Content>
      <Actions>
        {children}
        <Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('start', start)}
        >
          Next
        </Action>
      </Actions>
    </Container>
  );
};
