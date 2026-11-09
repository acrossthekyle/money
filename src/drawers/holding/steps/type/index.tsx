'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, isBlocked, type } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>What kind of portfolio item is this?</Ui.Form.Paragraph>
      <Ui.Form.Options>
        <Ui.Form.Legend>Choose one:</Ui.Form.Legend>
        <Ui.Form.Option
          isActive={type === 'credit_card'}
          label="Credit Card"
          name="type"
          onSelect={() => handleOnChange('credit_card')}
          value="credit_card"
        />
        <Ui.Form.Option
          isActive={type === 'savings'}
          label="Savings"
          name="type"
          onSelect={() => handleOnChange('savings')}
          value="savings"
        />
        <Ui.Form.Option
          isActive={type === 'checking'}
          label="Checking"
          name="type"
          onSelect={() => handleOnChange('checking')}
          value="checking"
        />
        <Ui.Form.Option
          isActive={type === 'retirement'}
          label="Retirement"
          name="type"
          onSelect={() => handleOnChange('retirement')}
          value="retirement"
        />
        <Ui.Form.Option
          isActive={type === 'property'}
          label="Property/Asset"
          name="type"
          onSelect={() => handleOnChange('property')}
          value="property"
        />
      </Ui.Form.Options>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('type', type)}
        >
          Next
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
