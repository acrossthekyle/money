'use client';

import {
  Action,
  Container,
  Header,
  Option,
  Options,
} from '../../../components';
import { SCHEDULES } from '../../constants';

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
  const { handleOnChange, isBlocked, schedule } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Options>
        {SCHEDULES.map((item) => (
          <Option
            isActive={schedule === item.value}
            key={item.value}
            onClick={() => handleOnChange(item.value)}
          >
            <span>{item.name}</span>
          </Option>
        ))}
      </Options>
      <Action
        isBlocked={isBlocked}
        isEditing={isEditing}
        onClick={() => onNext('schedule', schedule)}
      >
        Next
      </Action>
    </Container>
  );
};
