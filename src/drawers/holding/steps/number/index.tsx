'use client';

import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  header: string;
  isActive: boolean;
  isEditing: boolean;
  onNext: (key: string, value: string) => void;
  paragraph: string;
  value: string;
};

export default function Section({
  children,
  header,
  isActive,
  isEditing,
  onNext,
  paragraph,
  value,
}: React.PropsWithChildren<Props>) {
  const { handleOnChange, number } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>{paragraph}</Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Label htmlFor="holding-number">Last Four</Ui.Form.Label>
        <Ui.Form.Input
          value={number}
          maxLength={4}
          name="number"
          onChange={handleOnChange}
          placeholder="1234"
          type="text"
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('number', number)}
        >
          {number ? 'Next' : 'Skip'}
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
