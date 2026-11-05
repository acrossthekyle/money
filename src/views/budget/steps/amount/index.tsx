'use client';

import tw from '@/styles';
import Ui from '@/ui';

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
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Content>
        <Ui.Form.Options className={styles.options}>
          <Ui.Form.Option
            isActive={type === 'credit'}
            onClick={() => handleOnType('credit')}
          >
            <span>Income</span>
          </Ui.Form.Option>
          <Ui.Form.Option
            isActive={type === 'debit'}
            onClick={() => handleOnType('debit')}
          >
            <span>Expense</span>
          </Ui.Form.Option>
        </Ui.Form.Options>
        <Ui.Form.Currency
          id="transaction-amount"
          isNegative={type === 'debit'}
          onChange={handleOnChange}
          value={amount}
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('amount', type === 'debit' ? `-${amount}` : amount)}
        >
          Next
        </Ui.Form.Action>
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};

const styles = tw({
  options: `
    mb-4
  `,
});
