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
  const { handleOnChange, rate } = useModel(value);

  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>{header}</Ui.Form.Header>
      <Ui.Form.Content>
        <Input
          allowNegativeValue={true}
          className={styles.input}
          id="percent"
          name="percent"
          placeholder="% 0.00"
          decimalsLimit={2}
          decimalScale={2}
          disableGroupSeparators
          fixedDecimalLength={2}
          maxLength={5}
          prefix="% "
          onChange={handleOnChange}
          value={rate}
        />
      </Ui.Form.Content>
      <Ui.Form.Actions>
        {children}
        <Ui.Form.Action
          isEditing={isEditing}
          onClick={() => onNext('interest', rate)}
        >
          {rate ? 'Next' : 'Skip'}
        </Ui.Form.Action>
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
