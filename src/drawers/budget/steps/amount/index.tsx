'use client';

import tw from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string, isIncome: boolean) => void;
  value: string;
  type: string;
};

export default function Section({
  children,
  header,
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

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>Amount</Ui.Form.Header>
      <Ui.Form.Paragraph>{header}</Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Options className={styles.options}>
          <Ui.Form.Option
            isActive={isIncome}
            onClick={() => handleOnType(true)}
          >
            <span>Income</span>
          </Ui.Form.Option>
          <Ui.Form.Option
            isActive={!isIncome}
            onClick={() => handleOnType(false)}
          >
            <span>Expense</span>
          </Ui.Form.Option>
        </Ui.Form.Options>
        <Ui.Form.Currency
          id="transaction-amount"
          isNegative={!isIncome}
          onChange={handleOnChange}
          value={amount}
        />
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

const styles = tw({
  options: `
    mb-4
  `,
});
