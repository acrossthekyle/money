'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  holdings: Holding[];
  isActive: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
  type: string;
};

export default function Section({
  children,
  header,
  holdings,
  isActive,
  onNext,
  value,
  type,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, transferee } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        {type === 'debit' && 'Should this be transfered as income to one of the following?'}
        {type === 'credit' && 'Should this be transfered as an expense from one of the following?'}
      </Ui.Form.Paragraph>
      <Ui.Form.Options>
        <Ui.Form.Legend>Choose one (optional)</Ui.Form.Legend>
        <Ui.Form.Option
          isActive={transferee === ''}
          label="None"
          name="transferee"
          onSelect={() => handleOnChange('')}
          value="none"
        />
        {holdings.map((holding) => (
          <Ui.Form.Option
            isActive={transferee === holding.id}
            label={holding.name}
            key={holding.id}
            name="transferee"
            onSelect={() => handleOnChange(holding.id)}
            value={holding.id}
          />
        ))}
      </Ui.Form.Options>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('transferee', transferee)}
        >
          {transferee ? 'Next' : 'Skip'}
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
