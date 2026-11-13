'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string, isIncome: boolean) => void;
  value: string;
  type: string;
};

export default function Section({
  children,
  isActive,
  isEditing,
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

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>
          Type and amount
        </Ui.Form.Header>
        <Ui.Form.Paragraph>
          Choose either Income or Expense as the type of transaction, and then enter the amount
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Options>
              <Ui.Form.Option
                isActive={isIncome === true}
                label="Income"
                onSelect={() => handleOnType(true)}
              />
              <Ui.Form.Option
                isActive={isIncome === false}
                label="Expense"
                onSelect={() => handleOnType(false)}
              />
            </Ui.Form.Options>
          </Ui.Form.Field>
          <Ui.Form.Field>
            <Ui.Form.Label htmlFor="transaction-amount">Amount</Ui.Form.Label>
            <Ui.Form.Currency
              id="transaction-amount"
              onChange={handleOnChange}
              value={amount}
            />
            <Ui.Form.Hint>Only enter numbers and decimal points</Ui.Form.Hint>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('amount', amount, isIncome)}
        >
          {isEditing ? 'Save & Review' : 'Save & Continue'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
