'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  onNext: (key: string, value: string) => void;
  paragraph: string;
  placeholder: string;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  onNext,
  paragraph,
  placeholder,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, isBlocked, name } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>{paragraph}</Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Label htmlFor="holding-name">Name</Ui.Form.Label>
        <Ui.Form.Input
          id="holding-name"
          value={name}
          maxLength={48}
          name="name"
          onChange={handleOnChange}
          placeholder={placeholder}
          type="text"
        />
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
