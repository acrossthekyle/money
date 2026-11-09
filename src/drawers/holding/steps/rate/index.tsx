'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';
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
  const { handleOnChange, rate } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Paragraph>{paragraph}</Ui.Form.Paragraph>
      <Ui.Form.Content>
        <Ui.Form.Label htmlFor="holding-rate">Value</Ui.Form.Label>
        <Ui.Form.Percent
          id="holding-rate"
          onChange={handleOnChange}
          value={rate}
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isPrimary
          onClick={() => onNext('interest', rate)}
        >
          {rate ? 'Next' : 'Skip'}
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};

const styles = tw({
  input: `
    appearance-none
    relative
    w-full
    text-xl
    outline-none
  `,
});
