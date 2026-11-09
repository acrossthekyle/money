'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  onNext: (key: string, value: string) => void;
  paragraph: string;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  onNext,
  paragraph,
  value,
}: React.PropsWithChildren<Props>) {
  const { balance, handleOnChange, isBlocked } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>{paragraph}</Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Label htmlFor="holding-amount">Amount</Ui.Form.Label>
        <Ui.Form.Currency
          id="holding-amount"
          onChange={handleOnChange}
          value={balance}
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('balance', balance)}
        >
          Next
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
