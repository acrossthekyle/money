'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { DATE_ISO } from '@/constants';
import { useTimezone } from '@/hooks';
import tw from '@/styles';
import Ui from '@/ui';
import { date } from '@/utils';

type Props = {
  value?: string;
};

export default function End({ value }: Props) {
  const [selection, setSelection] = useState(value || '');

  const { zone } = useTimezone();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value.toLowerCase());
  };

  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        id="end"
        min={format(date(zone), DATE_ISO)}
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

    sm:col-span-6
  `,
});
