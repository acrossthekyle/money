'use client';

import { addDays, format, parseISO } from 'date-fns';
import { useState } from 'react';

import { DATE_FORMAT } from '@/constants';
import { useTimezone } from '@/hooks';
import tw from '@/styles';
import Ui from '@/ui';
import { date as zonedDate } from '@/utils';

type Props = {
  date: string;
  value?: string;
};

export default function Start({ date, value }: Props) {
  const [selection, setSelection] = useState(
    value || format(parseISO(date), DATE_FORMAT),
  );

  const { zone } = useTimezone();

  const today = format(addDays(zonedDate(zone), 1), DATE_FORMAT);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(event.target.value.toLowerCase());
  };

  return (
    <Ui.Form.Field className={styles.container}>
      <Ui.Form.Input
        id="start"
        min={today}
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

    xs:col-span-6
  `,
});
