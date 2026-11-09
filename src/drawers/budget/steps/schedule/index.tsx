'use client';

import Ui from '@/ui';

import { SCHEDULES } from '../../constants';

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
  const { handleOnChange, isBlocked, schedule } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        How often does this transaction repeat?
      </Ui.Form.Paragraph>
      <Ui.Form.Options>
        <Ui.Form.Legend>Frequency</Ui.Form.Legend>
        {SCHEDULES.map((item) => (
          <Ui.Form.Option
            isActive={schedule === item.value}
            key={item.value}
            label={item.name}
            name="schedule"
            onSelect={() => handleOnChange(item.value)}
            value={item.value}
          />
        ))}
      </Ui.Form.Options>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('schedule', schedule)}
        >
          Next
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
