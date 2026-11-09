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
  const { end, handleOnChange } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        Does this transaction stop at some point?
      </Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Label htmlFor="end">End date (optional)</Ui.Form.Label>
        <Ui.Form.Input
          id="end"
          value={end}
          name="end"
          onChange={handleOnChange}
          type="date"
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('end', end)}
        >
          {end ? 'Next' : 'Skip'}
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
