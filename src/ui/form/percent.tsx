'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = {
  id: string;
  isOptional?: boolean;
  value?: string;
};

export default function Percent({ id, isOptional, value }: Props) {
  return (
    <Input
      allowNegativeValue={false}
      className={styles.container}
      id={id}
      name={id}
      required={!isOptional}
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
    p-2 pl-3
    border border-current/20.5
    rounded-md
    text-sm
  `,
});
