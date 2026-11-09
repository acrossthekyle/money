'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  onNext: (key: string, value: string, isIncome: boolean) => void;
  value: string;
  type: string;
};

export default function Section({
  children,
  header,
  isActive,
  onNext,
  value,
  type,
}: React.PropsWithChildren<Props>) {
  const {
    amount,
    handleOnChange,
    handleOnType,
    isBlocked,
    isIncome,
  } = useModel(value, type);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        Choose either Income or Expense as the type of transaction, and then enter the amount.
      </Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Options>
          <Ui.Form.Legend>Type</Ui.Form.Legend>
          <Ui.Form.Option
            isActive={isIncome}
            label="Income"
            name="type"
            onSelect={() => handleOnType(true)}
            value="income"
          />
          <Ui.Form.Option
            isActive={!isIncome}
            label="Expense"
            name="type"
            onSelect={() => handleOnType(false)}
            value="expense"
          />
        </Ui.Form.Options>
        <Ui.Form.Label htmlFor="transaction-amount">Amount</Ui.Form.Label>
        <Ui.Form.Currency
          id="transaction-amount"
          onChange={handleOnChange}
          value={amount}
        />
        <Ui.Form.Hint>Only enter numbers and decimal points</Ui.Form.Hint>
      </Ui.Form.Content>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('amount', amount, isIncome)}
        >
          Next
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
