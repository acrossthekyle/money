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
  const { end, handleOnChange } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Ui.Form.Input
          className="!w-66"
          value={end}
          name="end"
          onChange={handleOnChange}
          type="date"
        />
      </Content>
      <Action
        isEditing={isEditing}
        onClick={() => onNext('end', end)}
      >
        {end ? 'Next' : 'Skip'}
      </Action>
    </Container>
  );
};
