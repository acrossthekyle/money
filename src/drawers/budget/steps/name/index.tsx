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
  const { handleOnChange, isBlocked, name } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>
        What is this transaction for?
      </Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Label htmlFor="name">Name</Ui.Form.Label>
        <Ui.Form.Input
          id="name"
          value={name}
          maxLength={48}
          name="name"
          onChange={handleOnChange}
          placeholder="Eg. Paramount+"
          type="text"
        />
        <Ui.Form.Hint>Maximum length: 48 characters</Ui.Form.Hint>
      </Ui.Form.Content>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isDisabled={isBlocked}
          isPrimary
          onClick={() => onNext('name', name)}
        >
          Next
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
