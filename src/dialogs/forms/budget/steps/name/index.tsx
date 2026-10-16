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
  const { handleOnChange, isBlocked, name } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Ui.Form.Input
          value={name}
          maxLength={48}
          name="name"
          onChange={handleOnChange}
          placeholder="Eg. Paramount+"
          type="text"
        />
      </Content>
      <Action
        isBlocked={isBlocked}
        isEditing={isEditing}
        onClick={() => onNext('name', name)}
      >
        Next
      </Action>
    </Container>
  );
};
