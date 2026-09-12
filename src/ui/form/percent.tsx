'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = {
  id: string;
  value?: string;
};

export default function Percent({ id, value }: Props) {
  return (
    <Input
      allowNegativeValue={true}
      className={styles.container}
      id={id}
      name={id}
      placeholder="0.00"
      defaultValue={value}
      decimalsLimit={2}
      decimalScale={2}
      disableGroupSeparators
      fixedDecimalLength={2}
      maxLength={5}
      prefix="% "
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
