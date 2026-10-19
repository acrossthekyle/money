'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

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
  const { handleOnChange, rate } = useModel(value);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Input
          allowNegativeValue={true}
          className={styles.input}
          id="percent"
          name="percent"
          placeholder="% 0.00"
          decimalsLimit={2}
          decimalScale={2}
          disableGroupSeparators
          fixedDecimalLength={2}
          maxLength={5}
          prefix="% "
          onChange={handleOnChange}
          value={rate}
        />
      </Content>
      <Actions>
        {children}
        <Action
          isEditing={isEditing}
          onClick={() => onNext('interest', rate)}
        >
          {rate ? 'Next' : 'Skip'}
        </Action>
      </Actions>
    </Container>
  );
};

const styles = tw({
  input: `
    py-2.25
    border-b border-current/22.5
    outline-none
    w-20
    text-center
  `,
});
