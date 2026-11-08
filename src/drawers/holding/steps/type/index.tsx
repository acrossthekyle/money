'use client';

import Ui from '@/ui';

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
  const { handleOnChange, isBlocked, type } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Options>
        <Ui.Form.Option
          isActive={type === 'credit_card'}
          onClick={() => handleOnChange('credit_card')}
        >
          Credit Card
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={type === 'savings'}
          onClick={() => handleOnChange('savings')}
        >
          Savings
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={type === 'checking'}
          onClick={() => handleOnChange('checking')}
        >
          Checking
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={type === 'retirement'}
          onClick={() => handleOnChange('retirement')}
        >
          Retirement Holding
        </Ui.Form.Option>
        <Ui.Form.Option
          isActive={type === 'property'}
          onClick={() => handleOnChange('property')}
        >
          Property/Asset
        </Ui.Form.Option>
      </Ui.Form.Options>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isBlocked={isBlocked}
          isEditing={isEditing}
          onClick={() => onNext('type', type)}
        >
          Next
        </Ui.Form.Action>
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
