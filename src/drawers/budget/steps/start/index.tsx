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
  const { handleOnChange, isBlocked, start } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        When does this transaction occur?
      </Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Label htmlFor="start">Start date</Ui.Form.Label>
        <Ui.Form.Input
          id="start"
          value={start}
          name="start"
          onChange={handleOnChange}
          type="date"
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('start', start)}
        >
          Next
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
