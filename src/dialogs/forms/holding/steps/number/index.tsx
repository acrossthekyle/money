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
  const { handleOnChange, number } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Ui.Form.Input
          className="!w-20"
          value={number}
          maxLength={4}
          name="number"
          onChange={handleOnChange}
          placeholder="1234"
          type="text"
        />
      </Content>
      <Actions>
        {children}
        <Action
          isEditing={isEditing}
          onClick={() => onNext('number', number)}
        >
          {number ? 'Next' : 'Skip'}
        </Action>
      </Actions>
    </Container>
  );
};
