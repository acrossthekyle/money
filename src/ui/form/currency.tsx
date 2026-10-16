'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Currency(props: Props) {
  return (
    // @ts-expect-error - is ok
    <Input
      className={styles.container}
      name="currency"
      placeholder="$ 0.00"
      decimalsLimit={2}
      decimalScale={2}
      prefix="$ "
      {...props}
    />
  );
};

const styles = tw({
  container: `
    py-2.25 px-4
    outline-none
    w-40
    text-center
    text-2xl
  `,
});
