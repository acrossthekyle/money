'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  holdings: Holding[];
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
  type: string;
};

export default function Section({
  children,
  holdings,
  isActive,
  isEditing,
  onNext,
  value,
  type,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, transferee } = useModel(value);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>Transfer</Ui.Form.Header>
        <Ui.Form.Paragraph>
          {type === 'debit' && 'Should this be transfered as income to one of the following?'}
          {type === 'credit' && 'Should this be transfered as an expense from one of the following?'}
        </Ui.Form.Paragraph>
        <Ui.Form.Container>
          <Ui.Form.Field>
            <Ui.Form.Options>
              <Ui.Form.Option
                isActive={transferee === ''}
                label="No"
                onSelect={() => handleOnChange('')}
              />
              {holdings.map((holding) => (
                <Ui.Form.Option
                  isActive={transferee === holding.id}
                  label={holding.name}
                  key={holding.id}
                  onSelect={() => handleOnChange(holding.id)}
                />
              ))}
            </Ui.Form.Options>
          </Ui.Form.Field>
        </Ui.Form.Container>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('transferee', transferee)}
        >
          {isEditing ? 'Save & Review' : (transferee ? 'Save & Continue' : 'Skip')}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
