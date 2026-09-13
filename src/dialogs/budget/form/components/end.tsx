'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { DATE_FORMAT } from '@/constants';
import tw from '@/styles';
import Ui from '@/ui';

type Props = {
  value?: string;
};

export default function End({ value }: Props) {
  const [selection, setSelection] = useState(value || '');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value.toLowerCase());
  };

  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        id="end"
        min={format(new Date(), DATE_FORMAT)}
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
    col-span-12
    ml-2

    xs:ml-0
    sm:col-span-7
  `,
});
