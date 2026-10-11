'use client';

import { useState } from 'react';

import tw from '@/styles';
import type { Dateable } from '@/types';
import Ui from '@/ui';

type Props = {
  date: Dateable;
  value?: string;
};

export default function End({ date, value }: Props) {
  const [selection, setSelection] = useState(value || '');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value.toLowerCase());
  };

  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        id="end"
        min={date.today.iso}
        name="end"
        onChange={handleOnChange}
        placeholder=" "
        type="date"
        value={selection}
      />
      <Ui.Form.Label htmlFor="end">End</Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    !col-span-6
  `,
});
