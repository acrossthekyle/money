'use client';

import { useState } from 'react';

import tw from '@/styles';
import type { Dateable } from '@/types';
import Ui from '@/ui';

type Props = {
  date: Dateable;
  value?: string;
};

export default function Start({ date, value }: Props) {
  const [selection, setSelection] = useState(value || date.iso);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value.toLowerCase());
  };

  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        id="start"
        name="start"
        onChange={handleOnChange}
        type="date"
        required
        value={selection}
      />
      <Ui.Form.Label htmlFor="start" isRequired>Start</Ui.Form.Label>
    </Ui.Form.Field>
  );
};

const styles = tw({
  container: `
    col-span-12

    sm:col-span-6
  `,
});
