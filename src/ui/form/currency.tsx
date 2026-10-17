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
      // @ts-expect-error - is ok
      value={isNaN(value) ? '' : value}
      inputMode="text"
      {...rest}
    />
  );
};

const styles = tw({
  container: `
    py-2.25 px-4
    outline-none
    border-b border-current/22.5
    w-66
    text-center text-xl

    md:text-base
  `,
});
