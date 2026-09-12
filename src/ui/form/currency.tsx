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
    peer
    border border-current/12.5 dark:border-current/27.5
    rounded-sm
    outline-none
    py-2.25 pt-2.75 pl-3
    text-base
    bg-(--background)

    focus:border-orange-400
    focus:dark:border-teal-600
  `,
});
