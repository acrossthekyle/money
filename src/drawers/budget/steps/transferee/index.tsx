'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  holdings: Holding[];
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  value: string;
};

export default function Section({
  children,
  header,
  holdings,
  isActive,
  isEditing,
  onNext,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, transferee } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Options>
        {holdings.map((holding) => (
          <Ui.Form.Option
            isActive={transferee === holding.id}
            key={holding.id}
            onClick={() => handleOnChange(holding.id)}
          >
            <span>{holding.name}</span>
          </Ui.Form.Option>
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
