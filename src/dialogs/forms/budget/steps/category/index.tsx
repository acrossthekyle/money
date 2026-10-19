'use client';

import {
  Action,
  Actions,
  Container,
  Header,
  Option,
  Options,
} from '../../../components';
import { CATEGORIES } from '../../constants';

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
  const { category, handleOnChange, isBlocked } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Options>
        {CATEGORIES.map((item) => (
          <Option
            isActive={category === item.value}
            key={item.value}
            onClick={() => handleOnChange(item.value)}
          >
            <span>{item.name}</span>
          </Option>
        ))}
      </Options>
      <Actions>
        {children}
        <Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('category', category)}
        >
          Next
        </Action>
      </Actions>
    </Container>
  );
};
