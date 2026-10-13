'use client';

import Input from 'react-currency-input-field';

import tw from '@/styles';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
};

export default function Currency({
  id,
  ...rest
}: Props) {
  return (
    <Input
      className={styles.container}
      id={id}
      name={id}
      placeholder="$ 0.00"
      decimalsLimit={2}
      decimalScale={2}
      prefix="$ "
      {...rest}
    />
  );
};

const styles = tw({
  container: `
    py-2.25 px-4
    border-b border-current/22.5
    outline-none
    w-40
    text-center
  `,
});
