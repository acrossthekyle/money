'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = {
  id: string;
  value?: string;
};

export default function Currency({ id, value }: Props) {
  return (
    <Input
      className={styles.container}
      id={id}
      name={id}
      required
      placeholder="0.00"
      defaultValue={value}
      decimalsLimit={2}
      decimalScale={2}
      prefix="$"
    />
  );
};

const styles = tw({
  container: `
    p-2 pl-3
    border border-current/20.5
    rounded-md
    text-sm
  `,
});
