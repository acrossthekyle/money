'use client';

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
  const { handleOnChange, isBlocked, type } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Options>
        <Option
          isActive={type === 'credit'}
          onClick={() => handleOnChange('credit')}
        >
          <span>Income</span>
        </Option>
        <Option
          isActive={type === 'debit'}
          onClick={() => handleOnChange('debit')}
        >
          <span>Expense</span>
        </Option>
      </Options>
      <Action
        isBlocked={isBlocked}
        isEditing={isEditing}
        onClick={() => onNext('type', type)}
      >
        Next
      </Action>
    </Container>
  );
};
