'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  isNegative?: boolean;
};

export default function Currency({ isNegative, value, ...rest }: Props) {
  return (
    <Input
      className={styles.container}
      name="currency"
      placeholder="$ 0.00"
      decimalsLimit={2}
      decimalScale={2}
      prefix={isNegative ? '- $ ' : '$ '}
      inputMode="decimal"
      // @ts-expect-error - is ok
      value={isNaN(value) ? '' : value}
      {...rest}
    />
  );
};

const styles = tw({
  container: `
    py-2.25 px-4
    outline-none
    border-none
    w-66
    text-center text-xl

    md:text-base
    md:w-40
  `,
});
