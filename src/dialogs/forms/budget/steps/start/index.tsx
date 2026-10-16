'use client';

import Ui from '@/ui';

import {
  Action,
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
  header,
  isActive,
  isEditing,
  onNext,
  value,
}: Props) {
  const { handleOnChange, isBlocked, start } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Ui.Form.Input
          className="!w-50"
          value={start}
          name="start"
          onChange={handleOnChange}
          type="date"
        />
      </Content>
      <Action
        isBlocked={isBlocked}
        isEditing={isEditing}
        onClick={() => onNext('start', start)}
      >
        Next
      </Action>
    </Container>
  );
};
