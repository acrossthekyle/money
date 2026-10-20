'use client';

import tw from '@/styles';
import Ui from '@/ui';

import {
  Action,
  Actions,
  Container,
  Content,
  Header,
  Option,
  Options,
} from '../../../components';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  isExpense: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  isEditing,
  isExpense,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const {
    amount,
    handleOnChange,
    handleOnType,
    isBlocked,
    type,
  } = useModel(value, isExpense);

  return (
    <Container isActive={isActive}>
      <Header>{header}</Header>
      <Content>
        <Options className={styles.options}>
          <Option
            isActive={type === 'credit'}
            onClick={() => handleOnType('credit')}
          >
            <span>Income</span>
          </Option>
          <Option
            isActive={type === 'debit'}
            onClick={() => handleOnType('debit')}
          >
            <span>Expense</span>
          </Option>
        </Options>
        <Ui.Form.Currency
          id="transaction-amount"
          isNegative={type === 'debit'}
          onChange={handleOnChange}
          value={amount}
        />
      </Content>
      <Actions>
        {children}
        <Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('amount', type === 'debit' ? `-${amount}` : amount)}
        >
          Next
        </Action>
      </Actions>
    </Container>
  );
};

const styles = tw({
  options: `
    mb-4
  `,
});
