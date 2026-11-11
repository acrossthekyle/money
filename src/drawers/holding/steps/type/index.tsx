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

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>{header}</Ui.Form.Header>
        <Ui.Form.Paragraph>What kind of portfolio item is this?</Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Legend>Choose one</Ui.Form.Legend>
            <Ui.Form.Options>
              <Ui.Form.Option
                isActive={type === 'credit_card'}
                label="Credit Card"
                onSelect={() => handleOnChange('credit_card')}
              />
              <Ui.Form.Option
                isActive={type === 'savings'}
                label="Savings Account"
                onSelect={() => handleOnChange('savings')}
              />
              <Ui.Form.Option
                isActive={type === 'checking'}
                label="Checking Account"
                onSelect={() => handleOnChange('checking')}
              />
              <Ui.Form.Option
                isActive={type === 'retirement'}
                label="Retirement Account"
                onSelect={() => handleOnChange('retirement')}
              />
              <Ui.Form.Option
                isActive={type === 'property'}
                label="Property/Asset"
                onSelect={() => handleOnChange('property')}
              />
            </Ui.Form.Options>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('type', type)}
        >
          Save & Continue
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
